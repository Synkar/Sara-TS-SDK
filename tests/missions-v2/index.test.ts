import { Missions } from "../../src/core/missions-v2/index";

jest.mock("../../src/service/requests");

describe("testing missions-v2 module", () => {
  test("Test missions instanciate", () => {
    const missions = new Missions();
    expect(missions).toBeDefined();
  });
  test("Test missions list", async () => {
    const missions = new Missions();
    const missions_list = await missions.list(
      "68945b1c-ba9c-4855-a988-b395c014d37a"
    );
    expect(missions_list).toBeDefined();
  });
});
