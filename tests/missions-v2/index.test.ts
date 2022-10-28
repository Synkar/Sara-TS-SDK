import { Missions } from "../../src/core/missions-v2/index";
import {
  MissionsList,
  MissionsRetrieve,
} from "../../src/core/missions-v2/models/Missions.models";
import { PaginatedModel } from "../../src/models/PaginatedModel";

describe("testing missions-v2 module for Missions", () => {
  test("Test missions instanciate", () => {
    const missions = new Missions();
    expect(missions).toBeDefined();
  });
  test("Test missions list", async () => {
    const missions = new Missions();
    jest.spyOn(missions, "list").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnMissionList();
      })
    );
    const mission_list_mock = await missions.list(
      "68945b1c-ba9c-4855-a988-b395c014d37a"
    );
    expect(mission_list_mock).toBeDefined();
  });
  test("Test missions retrieve", async () => {
    const missions = new Missions();
    jest.spyOn(missions, "retrieve").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnMissionMock();
      })
    );
    const mission_retrieve_mock = await missions.retrieve(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38"
    );
    expect(mission_retrieve_mock).toBeDefined();
  });
  test("Test mission last", async () => {
    const missions = new Missions();
    jest.spyOn(missions, "last").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnMissionMock();
      })
    );
    const mission_last_mock = await missions.last(
      "68945b1c-ba9c-4855-a988-b395c014d37a"
    );
    expect(mission_last_mock).toBeDefined();
  });
  test("Test mission retry", async () => {
    const missions = new Missions();
    jest.spyOn(missions, "retry").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return true;
      })
    );
    const mission_retry_mock = await missions.retry(
      "2f75269d-ae0b-4bff-a93f-d51e8f713041"
    );
    expect(mission_retry_mock).toBeTruthy();
  });
  test("Test mission cancel", async () => {
    const missions = new Missions();
    jest.spyOn(missions, "cancel").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return true;
      })
    );
    const mission_cancel_mock = await missions.cancel(
      "2f75269d-ae0b-4bff-a93f-d51e8f713041"
    );
    expect(mission_cancel_mock).toBeTruthy();
  });
  test("Test mission pause", async () => {
    const missions = new Missions();
    jest.spyOn(missions, "pause").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return true;
      })
    );
    const mission_pause_mock = await missions.pause(
      "2f75269d-ae0b-4bff-a93f-d51e8f713041"
    );
    expect(mission_pause_mock).toBeTruthy();
  });
  test("Test mission resume", async () => {
    const missions = new Missions();
    jest.spyOn(missions, "resume").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return true;
      })
    );
    const mission_resume_mock = await missions.resume(
      "2f75269d-ae0b-4bff-a93f-d51e8f713041"
    );
    expect(mission_resume_mock).toBeTruthy();
  });
});

const dateNow = new Date();
const missionMock: MissionsRetrieve = {
  uuid: "34b8ce7a-9f10-4380-8de4-a54dcfd7d3a1",
  robot: "123",
  current_step: 0,
  status: 0,
  assisted: false,
  loop: false,
  outcome: 0,
  tags: ["3dc4a206-d025-4732-9538-ff082ba64b67"],
  stages: [
    {
      uuid: "95c00142-c7bc-4a94-8b47-1bee2bcfead7",
      name: "name",
      description: "desc",
      stage_position: 0,
      init_step: 0,
      end_step: 1,
      steps: [
        {
          uuid: "62c87bc2-0d95-477f-af8a-f08b672f3154",
          name: "name",
          description: "desc",
          robot_type: "SD-02",
          active: true,
          step_position: 0,
          datetime_created: dateNow,
          datetime_updated: dateNow,
          params: [
            {
              uuid: "c9b9b9f9-1b9f-4b9f-9b9f-9b9f9b9f9b9f",
              name: "name",
              description: "desc",
              property: "property",
              is_variable: false,
              is_metric: false,
              value: "value",
              value_type: "value_type",
              map_value: null,
              metadata: null,
            },
          ],
        },
      ],
      param_values: [
        {
          uuid: "a548812c-a552-4fab-a879-091f1027833b",
          param: "73cdaf10-9cce-485b-88bf-af1eff7138bc",
          step_value: "2",
          param_value: null,
        },
      ],
      datetime_created: dateNow,
      datetime_updated: dateNow,
    },
  ],
  datetime_created: dateNow,
  datetime_updated: dateNow,
};

const missionListMock: MissionsList = {
  uuid: "2f75269d-ae0b-4bff-a93f-d51e8f713041",
  robot: "68945b1c-ba9c-4855-a988-b395c014d37a",
  current_step: 0,
  status: 12,
  assisted: false,
  loop: false,
  outcome: 406,
  tags: ["53dc35e0-df90-44fb-abee-c3f3c62b3a77"],
  datetime_created: dateNow,
  datetime_updated: dateNow,
};

const returnMissionList = (): PaginatedModel<MissionsList> => {
  return {
    count: 1,
    next: null,
    previous: null,
    results: [missionListMock],
  };
};

const returnMissionMock = (): MissionsRetrieve => {
  return missionMock;
};
