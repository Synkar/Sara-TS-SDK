/**
 * @jest-environment jsdom
 */

import { Mapping, Type } from "../../src/core/mapping/index";
import { Sara } from "../../src/";
import { ISession, Session } from "../../src/models/Session";

let sessionGlobal: Session;

jest.mock("../../src/", () => {
  return {
    Sara: {
      auth: jest.fn(() => {
        const iSessionCreated: ISession = {
          access_token: "access_token",
          access_key: "access_key",
          secret_key: "secret_key",
          expires_in: 100000,
          scope: "",
        };
        sessionGlobal = new Session(iSessionCreated);
        return sessionGlobal;
      }),
    },
  };
});

jest.mock("../../src/core/mapping/index", () => ({
  get Mapping() {
    return jest.fn().mockImplementation(() => {
      return {
        robot: "robot",
        session: "session",
        constructor() {
          return {
            robot: "robot",
            session: "session",
          };
        },
        image: (resolve: any, reject: any) => {
          return resolve({
            streams: [
              {
                id: "stream-id",
              },
            ],
          });
        },
        start: (): ResponseMapping => {
          return {
            type: 0,
            status: 1,
            response: {
              message: "Mapping started",
            },
            error: undefined,
            done: true,
            running: false,
          };
        },
        stop: (mapId: string): ResponseMapping => {
          return {
            type: 0,
            status: 1,
            response: {
              message: "Mapping stopped",
            },
            error: undefined,
            done: true,
            running: false,
          };
        },
        swap: (mapId: string): ResponseMapping => {
          return {
            type: 0,
            status: 1,
            response: {
              message: "Mapping swapped",
            },
            error: undefined,
            done: true,
            running: false,
          };
        },
      };
    });
  },
}));

describe("testing mapping module", () => {
  test("Authenticate Session", async () => {
    const session = await Sara.auth("access_key", "secret_key");
    expect(session.access_token).toBeDefined();
  });
  test("Test mapping initialization", () => {
    const mapping = new Mapping("robot");
    expect(mapping.robot).toBe("robot");
  });
  test("Test mapping image", () => {
    const mapping = new Mapping("robot");
    let stream: any;
    mapping.image(
      (resolve: any) => {
        stream = resolve.streams[0];
      },
      (error: Error) => {
        console.log(error);
      }
    );
    expect(stream.id).toBe("stream-id");
  });
  test("Test mapping start", async () => {
    const mapping = new Mapping("robot");
    let res: ResponseMapping = await mapping.start();
    expect(res).toBeDefined();
  });
  test("Test mapping stop", async () => {
    const mapping = new Mapping("robot");
    let res: ResponseMapping = await mapping.stop("map_name");
    expect(res).toBeDefined();
  });
  test("test mapping swap", async () => {
    const mapping = new Mapping("robot");
    let res: ResponseMapping = await mapping.swap("map_name");
    expect(res).toBeDefined();
  });
});

type ResponseMapping = {
  type: Type;
  status: Status;
  response: string | object | undefined;
  error: Error | undefined;
  done: boolean;
  running: boolean;
};

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
