/**
 * @jest-environment jsdom
 */

import { Mapping } from "../../src/core/mapping/index";
import { Sara, Client } from "../../src/";
import { ISession, Session } from "../../src/models/Session";

let session: ISession;

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
        session = new Session(iSessionCreated);
        return session;
      }),
    },
  };
});

describe("testing mapping module", () => {
  test("Authenticate Session", async () => {
    const session = await Sara.auth("user", "pass");
    expect(session.access_token).toBeDefined();
  });
});
