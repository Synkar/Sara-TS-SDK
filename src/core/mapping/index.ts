import { Session, ISession } from "../../models/Session";
import { Client } from "../..";

/**
 * TODO: identificar o melhor lugar para por esse tipo
 */

enum Type {
  START, // 0
  STOP, // 1
  SWAP, // 2
}

enum Status {
  PENDING,
  ACTIVE,
  PREEMPTED,
  SUCCEEDED,
  ABORTED,
  REJECTED,
  PREEMPTING,
  RECALLING,
  RECALLED,
  LOST,
}

type ResponseMapping = {
  type: Type;
  status: Status;
  response: any | undefined;
  error: Error | undefined;
  done: boolean;
};

type RequestMapping = {
  type: Type;
  args: Object;
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
      },
      stop: {
        type: Type.START,
        status: Status.PENDING,
        response: {},
        error: undefined,
        done: false,
      },
      swap: {
        type: Type.START,
        status: Status.PENDING,
        response: {},
        error: undefined,
        done: false,
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
        console.log("Got Data Channel Message:", event.data);
        const { topic, data } = event.data;
        if (topic === "/sara/mapping_jobs_bridge/response") {
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
          setTimeout(reject, 2000, "Connection timeout");
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
              const topic = "/sensors/cameras/front_depth/color/image_raw";
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
          setTimeout(reject, 15000, "Data Channel Timeout");
        }),
        new Promise((resolve: Function) => {
          const keep = setInterval(() => {
            if (this.dataChannelOpened) {
              clearInterval(keep);
              resolve("Deu certo");
            }
          }, 100);
        }),
      ]);

    private serializeRequestMapping = (requestMapping: RequestMapping) => {
      return JSON.stringify(requestMapping);
    };

    private sendRequestTopicMessage = (requestMapping: RequestMapping) => {
      this.dataChannel.send(
        JSON.stringify({
          topic: "/sara/mapping_jobs_bridge/request",
          data: this.serializeRequestMapping(requestMapping),
        })
      );
    };

    start = async () => {
      if (this.responses["start"].done) {
        throw new Error("Action already started");
      }
      await this.checkDataChannelOpened();

      this.sendRequestTopicMessage({
        type: Type.START,
        args: {},
      });

      return Promise.race([
        new Promise((_, reject) => {
          setTimeout(reject, 4 * 60, "Start action timeout to occurs");
        }),
        new Promise((resolve: Function, reject: Function) => {
          const keep = setInterval(() => {
            if (this.responses["start"].done) {
              clearInterval(keep);
              resolve(this.responses["start"]);
            }
          }, 1000);
        }),
      ]).then((response: ResponseMapping) => {
        if (response.error) {
          throw new Error("Action not succeeded");
        } else {
          return response;
        }
      });
    };
  }
}
