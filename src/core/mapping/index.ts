import { Session, ISession } from "../../models/Session";
import { Client } from "../..";

/**
 * TODO: identificar o melhor lugar para por esse tipo
 */

enum Type {
  START = 0, // 0
  STOP = 1, // 1
  SWAP = 2, // 2
}

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

type ResponseMapping = {
  type: Type;
  status: Status;
  response: any | undefined;
  error: Error | undefined;
  done: boolean;
  running: boolean;
};

type RequestMapping = {
  type: Type;
  args_json: Object;
};
export namespace Sara {
  export class Mapping {
    robot: string;
    session: Session;
    signalingChannel: WebSocket;
    keepAlive: NodeJS.Timer;
    peerConnection: RTCPeerConnection;
    track: RTCTrackEvent;
    dataChannel: RTCDataChannel;
    dataChannelOpened: boolean = false;

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
        type: Type.START,
        status: Status.PENDING,
        response: {},
        error: undefined,
        done: false,
        running: false,
      },
      swap: {
        type: Type.START,
        status: Status.PENDING,
        response: {},
        error: undefined,
        done: false,
        running: false,
      },
    };

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

      this.peerConnection.onicecandidate = (event: any) => {
        if (event.candidate) {
          var candidate = {
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
        console.log("Received track");
        this.track = track;
        // @TODO responde image callback.
      };
    };

    private connectSignaling = async () => {
      const url = `wss://s83w778yf3.execute-api.us-east-1.amazonaws.com/v1?token=${this.session.access_token}&robotId=${this.robot}`;
      this.signalingChannel = new WebSocket(url);
      this.signalingChannel.onopen = () => {
        console.log("Signaling channel opened");
        this.track = null;
        this.keepAlive = setInterval(() => {
          this.signalingChannel.send(JSON.stringify({ action: "default" }));
        }, 60000);
      };

      this.signalingChannel.onclose = () => {
        console.log("Signaling channel closed");
        this.track = null;
        if (this.keepAlive) {
          clearInterval(this.keepAlive);
          this.keepAlive = null;
        }
      };
      this.signalingChannel.onerror = (error) => {
        console.log(error);
        this.track = null;
        if (this.keepAlive) {
          clearInterval(this.keepAlive);
          this.keepAlive = null;
        }
      };
      this.signalingChannel.onmessage = (msg: any) => {
        console.log(msg);
        if (!this.peerConnection) {
          return;
        }
        var dataJson = JSON.parse(msg.data);
        if (dataJson.type === "offer") {
          console.log("Received WebRTC offer via WebRTC signaling channel");
          const _peerConnection = this.peerConnection;
          const _signalingChannel = this.signalingChannel;
          this.peerConnection.setRemoteDescription(
            new RTCSessionDescription(dataJson),
            function () {
              _peerConnection.createAnswer(
                function (sessionDescription: any) {
                  _peerConnection.setLocalDescription(sessionDescription);
                  _signalingChannel.send(
                    JSON.stringify({
                      action: "webrtcSignal",
                      data: sessionDescription,
                    })
                  );
                },
                function (error: any) {
                  console.warn("Create answer error:", error);
                }
              );
            },
            function (event: any) {
              console.error("onRemoteSdpError", event);
            }
          );
        } else if (dataJson.type === "ice_candidate") {
          var candidate = new RTCIceCandidate({
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

    private initDataChannel = () => {
      this.dataChannel =
        this.peerConnection.createDataChannel("bridge-ros-webrtc");
      this.dataChannel.onerror = (error) => {
        console.log("Data Channel Error:", error);
        this.peerConnection.restartIce();
        this.dataChannelOpened = false;
      };

      this.dataChannel.onmessage = (event) => {
        console.log("Got Data Channel Message:", event);
        const { topic, data } = event.data;
        if (topic === "/mapping/response") {
          // from https://github.com/Synkar/synkar_middlewares_msgs/blob/main/msg/MappingResponse.msg

          const { type, status, response_json } = data;
          const response = JSON.parse(response_json);
          // TODO: convert type into key of enum
          const action_name: string = Type[type].toLowerCase();
          this.responses[action_name].done = true;
          this.responses[action_name].status = status;
          this.responses[action_name].response = response;
          if (status > 1 && status != 3) {
            this.responses[action_name].error = new Error(
              `Action ${action_name} finish not successfully.`
            );
          }
        }
      };

      this.dataChannel.onopen = () => {
        console.log("data channel open");
        this.dataChannelOpened = true;
      };

      this.dataChannel.onclose = () => {
        console.log("data channel close");
        this.dataChannelOpened = false;
      };
    };

    /**
     *
     * @param receiveCallback Function to be called when a message is received
     * @param closeCallback Function to be called when the connection or image is closed
     */
    image = async function (
      receiveCallback: Function,
      errorCallback: Function
    ): Promise<void> {
      Promise.race([
        new Promise((_, reject) => {
          setTimeout(reject, 5000, "Connection timeout");
        }),
        new Promise((resolve: Function) => {
          const keep = setInterval(() => {
            if (this.peerConnection && this.keepAlive) {
              clearInterval(keep);
              resolve();
            }
          }, 100);
        }),
      ])
        .then(() => {
          console.log("iniciou camera");
          Promise.resolve([])
            .then(function (actions) {
              const topic = "/sensors/cameras/front_depth/color/image_rect";
              actions.push({
                type: "add_video_track",
                stream_id: "88f6e326-18e1-43c9-bc09-1261a9832f32",
                id: topic,
                src: `ros_image:${topic}:1}`,
              });
              return actions;
            })
            .then((actions, type = "configure") => {
              var configMessage = { type, actions: actions };
              //console.log({ action: "webrtcSignal", data: configMessage });
              this.signalingChannel.send(
                JSON.stringify({ action: "webrtcSignal", data: configMessage })
              );

              Promise.race([
                new Promise((_, reject) => {
                  setTimeout(reject, 4000, "Track Timeout");
                }),
                new Promise((resolve: Function) => {
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
                .catch((error) => {
                  errorCallback(error);
                });
            });
        })
        .catch((error) => {
          errorCallback(error);
        });
    };

    private checkDataChannelOpened = async () =>
      Promise.race([
        new Promise((_, reject) => {
          setTimeout(reject, 60 * 1000, "Data Channel Timeout");
        }),
        new Promise((resolve: Function) => {
          const keep = setInterval(() => {
            if (this.dataChannelOpened) {
              clearInterval(keep);
              resolve("Data Channel Opened");
            }
          }, 100);
        }),
      ]);

    private serializeRequestMapping = (requestMapping: RequestMapping) => {
      return {
        type: requestMapping.type,
        args_json: JSON.stringify(requestMapping.args_json),
      };
    };

    private sendRequestTopicMessage = (requestMapping: RequestMapping) => {
      this.dataChannel.send(
        JSON.stringify({
          topic: "/mapping/request",
          data: this.serializeRequestMapping(requestMapping),
        })
      );
    };

    private sendAction = async (type: Type, args_json: Object) => {
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
        new Promise((resolve: Function, reject: Function) => {
          const keep = setInterval(() => {
            if (this.responses[action].done) {
              clearInterval(keep);
              this.responses[action].done = false;
              resolve(this.responses[action]);
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

    start = async () => {
      console.log(Type[0]);

      return this.sendAction(Type.START, {});
    };

    stop = async (mapId: string) => {
      return this.sendAction(Type.STOP, { id: mapId });
    };

    swap = async (mapId: string) => {
      return this.sendAction(Type.SWAP, {
        id: mapId,
      });
    };

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
            args_json: {},
          }),
        })
      );
    };
  }
}
