import { Session, ISession } from "../../models/Session";
import { Client } from "../..";

/**
 * Type of the mapping process
 */
export enum Type {
  START = 0, // 0
  STOP = 1, // 1
  SWAP = 2, // 2
}

/**
 * Status of the robot mission (mapping)
 */
enum Status {
  PENDING = 0,
  ACTIVE = 1,
  PREEMPTED = 2,
  SUCCEEDED = 3,
  ABORTED = 4,
  REJECTED = 5,
  PREEMPTING = 6,
  RECALLING = 7,
  RECALLED = 8,
  LOST = 9,
}

/**
 * Response of the mapping process
 */
type ResponseMapping = {
  type: Type;
  status: Status;
  response: string | object | undefined;
  error: Error | undefined;
  done: boolean;
  running: boolean;
};

/**
 * Request of the mapping process
 */
type RequestMapping = {
  type: Type;
  args_json?: any;
};

/**
 * Mapping class
 */
export class Mapping {
  robot: string;
  session: Session;
  signalingChannel: WebSocket;
  keepAlive: NodeJS.Timer;
  peerConnection: RTCPeerConnection;
  track: RTCTrackEvent;
  dataChannel: RTCDataChannel;
  dataChannelOpened = false;
  imageErrorCallback: (error: Error | string | Event) => void | undefined;

  responses: Record<string, ResponseMapping> = {
    start: {
      type: Type.START,
      status: Status.PENDING,
      response: {},
      error: undefined,
      done: false,
      running: false,
    },
    stop: {
      type: Type.STOP,
      status: Status.PENDING,
      response: {},
      error: undefined,
      done: false,
      running: false,
    },
    swap: {
      type: Type.SWAP,
      status: Status.PENDING,
      response: {},
      error: undefined,
      done: false,
      running: false,
    },
  };

  /**
   * Constructor of the Mapping class
   * @param robot - Id of the robot
   * @param session - User session to connect to the robot
   *
   * @returns Mapping class
   *
   * @example
   * const mapping = new Mapping("144cdc28-9126-4f59-b32b-307b2ae43fb3");
   */
  constructor(robot: string, session?: ISession) {
    this.robot = robot;
    if (session) {
      this.session = new Session(session!);
    } else {
      this.session = Client.session;
    }
    this.connectSignaling();
    this.initPeerConnection();
    this.initDataChannel();
  }

  /**
   * Create the PeerConnection and set the event listeners
   * @returns void
   */
  private initPeerConnection = () => {
    this.peerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun1.l.google.com:19302",
        },
        {
          urls: "turn:turn.sara.synkar.com:3478",
          username: "synkar",
          credential: "Synkar123#",
        },
      ],
    });

    this.peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      if (event.candidate) {
        const candidate = {
          sdp_mline_index: event.candidate.sdpMLineIndex,
          sdp_mid: event.candidate.sdpMid,
          candidate: event.candidate.candidate,
          type: "ice_candidate",
        };
        if (event.candidate.candidate !== "") {
          this.signalingChannel.send(
            JSON.stringify({ action: "webrtcSignal", data: candidate })
          );
        }
      }
    };

    this.peerConnection.ontrack = (track) => {
      this.track = track;
      // @TODO responde image callback.
    };
  };

  /**
   * Connect to the WebSocket signaling channel
   * @returns void
   */
  private connectSignaling = async () => {
    const url = `wss://s83w778yf3.execute-api.us-east-1.amazonaws.com/v1?token=${this.session.access_token}&robotId=${this.robot}`;
    this.signalingChannel = new WebSocket(url);
    this.signalingChannel.onopen = () => {
      this.track = null;
      this.keepAlive = setInterval(() => {
        this.signalingChannel.send(JSON.stringify({ action: "default" }));
      }, 60000);
    };

    this.signalingChannel.onclose = () => {
      this.track = null;
      if (this.keepAlive) {
        clearInterval(this.keepAlive);
        this.keepAlive = null;
      }
      if (this.imageErrorCallback) {
        this.imageErrorCallback("Signaling channel closed");
      }
    };
    this.signalingChannel.onerror = (error) => {
      this.track = null;
      if (this.keepAlive) {
        clearInterval(this.keepAlive);
        this.keepAlive = null;
      }
      if (this.imageErrorCallback) {
        this.imageErrorCallback(error);
      }
    };
    this.signalingChannel.onmessage = (msg: MessageEvent) => {
      if (!this.peerConnection) {
        return;
      }
      const dataJson = JSON.parse(msg.data);
      if (dataJson.type === "offer") {
        const _peerConnection = this.peerConnection;
        const _signalingChannel = this.signalingChannel;
        this.peerConnection.setRemoteDescription(
          new RTCSessionDescription(dataJson),
          function () {
            _peerConnection.createAnswer(
              function (sessionDescription: RTCSessionDescription) {
                _peerConnection.setLocalDescription(sessionDescription);
                _signalingChannel.send(
                  JSON.stringify({
                    action: "webrtcSignal",
                    data: sessionDescription,
                  })
                );
              },
              function (error: Error) {
                console.warn("Create answer error:", error);
              }
            );
          },
          function (error: Error) {
            console.error("onRemoteSdpError", error);
          }
        );
      } else if (dataJson.type === "ice_candidate") {
        const candidate = new RTCIceCandidate({
          sdpMLineIndex: dataJson.sdp_mline_index,
          candidate: dataJson.candidate,
        });

        this.peerConnection.addIceCandidate(candidate);
      } else if (dataJson.type === "close") {
        if (this.keepAlive) {
          clearInterval(this.keepAlive);
          this.keepAlive = null;
        }
        this.peerConnection.close();
      } else {
        console.warn(
          "Received unknown message type '" +
            dataJson.type +
            "' via WebRTC signaling channel"
        );
      }
    };
  };

  /**
   * Create the DataChannel and set the event listeners
   * @returns void
   */
  private initDataChannel = () => {
    this.dataChannel =
      this.peerConnection.createDataChannel("bridge-ros-webrtc");
    this.dataChannel.onerror = (error) => {
      this.peerConnection.restartIce();
      this.dataChannelOpened = false;
      console.log(error);
    };

    this.dataChannel.onmessage = (event) => {
      const { data, topic } = JSON.parse(event.data);
      if (topic === "/mapping/response") {
        // from https://github.com/Synkar/synkar_middlewares_msgs/blob/main/msg/MappingResponse.msg

        const { type, status, response_json } = data;

        let response = {};
        if (response_json) response = JSON.parse(response_json);
        // TODO: convert type into key of enum
        const action_name: string = Type[type].toLowerCase();
        this.responses[action_name].status = status;
        if (status > 1) {
          this.responses[action_name].done = true;
          this.responses[action_name].response = response;
        }
        if (status > 1 && status != 3) {
          this.responses[action_name].error = new Error(
            `Action ${action_name} finish not successfully.`
          );
        }
      }
    };

    this.dataChannel.onopen = () => {
      this.dataChannelOpened = true;
    };

    this.dataChannel.onclose = () => {
      this.dataChannelOpened = false;
    };
  };

  /**
   *
   * Connect to a image topic on robot to get image stream.
   *
   * @param receiveCallback - Function to be called when a message is received
   * @param errorCallback - Function to be called when the connection or image is closed
   * @param topic - Topic to subscribe to
   *
   * @returns A Promise that resolves when the connection is established
   *
   * @example mapping.image((image: RTCTrackEvent) => {}, (error: Error) => {})
   */
  image = async function (
    receiveCallback: (track: RTCTrackEvent) => void,
    errorCallback: (error: Error) => void,
    topic = "/slam/map_image"
  ): Promise<void> {
    this.imageErrorCallback = errorCallback;
    Promise.race([
      new Promise((_, reject) => {
        setTimeout(reject, 5000, "Connection timeout");
      }),
      new Promise((resolve: (value: void) => void) => {
        const keep = setInterval(() => {
          if (this.peerConnection && this.keepAlive) {
            clearInterval(keep);
            resolve();
          }
        }, 100);
      }),
    ])
      .then(() => {
        Promise.resolve([])
          .then(function (actions) {
            actions.push({
              type: "add_video_track",
              stream_id: "88f6e326-18e1-43c9-bc09-1261a9832f32",
              id: topic,
              src: `ros_image:${topic}:1}`,
            });
            return actions;
          })
          .then((actions, type = "configure") => {
            const configMessage = { type, actions: actions };
            this.signalingChannel.send(
              JSON.stringify({ action: "webrtcSignal", data: configMessage })
            );

            Promise.race([
              new Promise((_, reject) => {
                setTimeout(reject, 15 * 1000, "Track Timeout");
              }),
              new Promise((resolve: (track: RTCTrackEvent) => void) => {
                const keep = setInterval(() => {
                  if (this.track) {
                    clearInterval(keep);
                    resolve(this.track);
                  }
                }, 100);
              }),
            ])
              .then((track: RTCTrackEvent) => {
                receiveCallback(track);
              })
              .catch((error: Error) => {
                errorCallback(error);
              });
          });
      })
      .catch((error: Error) => {
        errorCallback(error);
      });
  };

  /**
   * Check if DataChannel is opened
   * @returns A Promise that resolves when the connection is established or rejects if the connection is closed
   */
  private checkDataChannelOpened = async () =>
    Promise.race([
      new Promise((_, reject) => {
        setTimeout(reject, 60 * 1000, "Data Channel Timeout");
      }),
      new Promise((resolve: (msg: string) => void) => {
        const keep = setInterval(() => {
          if (this.dataChannelOpened) {
            clearInterval(keep);
            resolve("Data Channel Opened");
          }
        }, 100);
      }),
    ]);

  /**
   * Serialize the args_json
   * @param requestMapping - The requestMapping object
   *
   * @returns An object with the serialized args_json and type
   *
   */
  private serializeRequestMapping = (requestMapping: RequestMapping) => {
    return {
      type: requestMapping.type,
      args_json: JSON.stringify(requestMapping.args_json),
    };
  };

  /**
   * Send a request to the robot
   * @param requestMapping - The requestMapping object
   *
   * @returns void
   */
  private sendRequestTopicMessage = (requestMapping: RequestMapping) => {
    this.dataChannel.send(
      JSON.stringify({
        topic: "/mapping/request",
        data: this.serializeRequestMapping(requestMapping),
      })
    );
  };

  /**
   * Send a action of mapping to the robot
   * @param type - The type of action
   * @param args_json - The args_json of action
   *
   * @returns A Promise that returns the response of the action or the error
   */
  private sendAction = async (type: Type, args_json: any) => {
    const action: string = Type[type].toLowerCase();
    if (this.responses[action].done || this.responses[action].running) {
      throw new Error("Action is already running");
    }
    await this.checkDataChannelOpened();

    this.sendRequestTopicMessage({
      type,
      args_json: args_json,
    });
    this.responses[action].running = true;

    return Promise.race([
      new Promise((_, reject) => {
        setTimeout(reject, 10 * 60 * 1000, `${action} action timeout`);
      }),
      new Promise((resolve: (response: string | object) => void) => {
        const keep = setInterval(() => {
          if (this.responses[action].done) {
            clearInterval(keep);
            this.responses[action].done = false;
            resolve(this.responses[action].response);
          }
        }, 1000);
      }),
    ]).then((response: ResponseMapping) => {
      this.responses[action].running = false;
      if (response.error) {
        throw new Error("Action not succeeded");
      } else {
        return response;
      }
    });
  };

  /**
   * Start mapping process
   *
   * @returns A Promise that resolves when the mapping process is started
   *
   * @example mapping.start().then((response) => { console.log(response) }).catch((error) => { console.log(error) })
   */
  start = async () => {
    return this.sendAction(Type.START, {});
  };

  /**
   * Stop mapping process
   *
   * @param mapId - Id of the map to be stopped
   *
   * @returns A Promise that resolves when the mapping process is stopped
   *
   * @example mapping.stop(mapId).then((response) => { console.log(response) }).catch((error) => { console.log(error) })
   */
  stop = async (mapId: string) => {
    return this.sendAction(Type.STOP, { mapID: mapId });
  };

  /**
   * Change the map by id
   *
   * @param mapId - Id of the map to be changed
   *
   * @returns A Promise that resolves when the map is changed
   *
   * @example mapping.changeMap(mapId).then((response) => { console.log(response) }).catch((error) => { console.log(error) })
   */
  swap = async (mapId: string) => {
    return this.sendAction(Type.SWAP, {
      mapID: mapId,
    });
  };

  /**
   * Cancel the current mapping process
   *
   * @param type - Type of the mapping process to be canceled
   *
   * @returns A Promise that resolves when the current mapping process is canceled
   *
   * @example mapping.cancel(type).then((response) => { console.log(response) }).catch((error) => { console.log(error) })
   */
  cancel = async (type: Type) => {
    const action: string = Type[type].toLowerCase();
    if (this.responses[action].done) {
      throw new Error("Action already started");
    }
    if (!this.responses[action].running) {
      throw new Error("Action not executed yet");
    }
    await this.checkDataChannelOpened();
    this.dataChannel.send(
      JSON.stringify({
        topic: "/mapping/cancel",
        data: this.serializeRequestMapping({
          type,
        }),
      })
    );
  };
}
