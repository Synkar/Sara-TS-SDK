/**
 * @jest-environment jsdom
 */

import { Mapping } from "../../src/core/mapping/index";

jest.mock("../../src/index");

describe("testing mapping module", () => {
  test("Connect a Mapping Process to a robot", async () => {
    const mapping = new Mapping("144cdc28-9126-4f59-b32b-307b2ae43fb3");
    expect(mapping).toBeDefined();
  });
});
