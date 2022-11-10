import { Stages } from "../../src/core/missions-v2/Stages";
import { StagesRetrieve } from "../../src/core/missions-v2/models/Stages.models";
import { PaginatedModel } from "../../src/models/PaginatedModel";

describe("testing missions-v2 module for Stages", () => {
  test("Test Stages instanciate", () => {
    const stages = new Stages();
    expect(stages).toBeDefined();
  });
  test("Test Stages list", async () => {
    const stages = new Stages();
    jest.spyOn(stages, "list").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnStagesList();
      })
    );
    const stages_list_mock = await stages.list();
    expect(stages_list_mock).toBeDefined();
  });
  test("Test Stages retrieve", async () => {
    const stages = new Stages();
    jest.spyOn(stages, "retrieve").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnStagesMock();
      })
    );
    const stages_retrieve_mock = await stages.retrieve(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38"
    );
    expect(stages_retrieve_mock).toBeDefined();
  });
  test("Test Stages create", async () => {
    const stages = new Stages();
    jest.spyOn(stages, "create").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnStagesMock();
      })
    );
    const stages_create_mock = await stages.create({
      name: "test",
      description: "test",
      steps: [
        {
          uuid: "add74b52-7de2-4309-92fd-f7f7c4f07d4c",
          params: [{ property: "[navigation][landmark]", is_variable: true }],
        },
      ],
    });
    expect(stages_create_mock).toBeDefined();
  });
  test("Test Stages update", async () => {
    const stages = new Stages();
    jest.spyOn(stages, "update").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnStagesMock();
      })
    );
    const stages_update_mock = await stages.update(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      {
        name: "test",
        description: "test",
        steps: [
          {
            uuid: "add74b52-7de2-4309-92fd-f7f7c4f07d4c",
            params: [{ property: "[navigation][landmark]", is_variable: true }],
          },
        ],
      }
    );
    expect(stages_update_mock).toBeDefined();
  });
  test("Test Stages delete", async () => {
    const stages = new Stages();
    jest.spyOn(stages, "delete").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return true;
      })
    );
    const stages_delete_mock = await stages.delete(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38"
    );
    expect(stages_delete_mock).toBeDefined();
  });
});

const dateNow = new Date();
const stageMock: StagesRetrieve = {
  uuid: "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
  name: "test",
  description: "test",
  steps: [
    {
      uuid: "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      name: "test",
      description: "test",
      robot_type: "SD-02",
      active: true,
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
      datetime_created: dateNow,
      datetime_updated: dateNow,
    },
  ],
  datetime_created: dateNow,
  datetime_updated: dateNow,
  active: true,
};

const returnStagesList = (): PaginatedModel<StagesRetrieve> => {
  return {
    count: 1,
    next: null,
    previous: null,
    results: [stageMock],
  };
};

const returnStagesMock = (): StagesRetrieve => {
  return stageMock;
};
