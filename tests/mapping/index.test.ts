/**
 * @jest-environment jsdom
 */

import { Sara } from "../../src/core/mapping/index";

import { Client } from "../../src/index";

const connect = async () => {
  const access_key = process.env.ACCESS_KEY || "";
  const secret_key = process.env.SECRET_KEY || "";

  await Client.auth(access_key, secret_key);
};

describe("testing mapping module", () => {
  test("Test Authentication", async () => {
    await connect();
    expect(Client.session.access_token).toBeDefined();
  });
  test("Connect a Mapping Process to a robot", async () => {
    await connect();
    const mapping = new Sara.Mapping("144cdc28-9126-4f59-b32b-307b2ae43fb3");
    expect(mapping).toBeDefined();
  });
});
