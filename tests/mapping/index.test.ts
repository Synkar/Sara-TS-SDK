/**
 * @jest-environment jsdom
 */

import { Sara } from "../../src/core/mapping/index";

import { Client } from "../../src/index";

jest.mock("../../src/index");

describe("testing mapping module", () => {
  test("Test Authentication", async () => {
    await Client.auth("access_key", "secret_key");
    expect(Client.session.access_token).toBeDefined();
  });
  /*
  test("Connect a Mapping Process to a robot", async () => {
    await connect();
    const mapping = new Sara.Mapping("144cdc28-9126-4f59-b32b-307b2ae43fb3");
    expect(mapping).toBeDefined();
  });*/
});
