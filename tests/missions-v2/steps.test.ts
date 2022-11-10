import { Steps } from "../../src/core/missions-v2/Steps";
import {
  StepsList,
  StepsRetrieve,
} from "../../src/core/missions-v2/models/Steps.models";
import { PaginatedModel } from "../../src/models/PaginatedModel";

describe("testing missions-v2 module for Steps", () => {
  test("Test Steps instanciate", () => {
    const steps = new Steps();
    expect(steps).toBeDefined();
  });
  test("Test Steps list", async () => {
    const steps = new Steps();
    jest.spyOn(steps, "list").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnStepsList();
      })
    );
    const steps_list_mock = await steps.list();
    expect(steps_list_mock).toBeDefined();
  });
  test("Test Steps retrieve", async () => {
    const steps = new Steps();
    jest.spyOn(steps, "retrieve").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnStepsMock();
      })
    );
    const steps_retrieve_mock = await steps.retrieve(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38"
    );
    expect(steps_retrieve_mock).toBeDefined();
  });
  test("Test Steps create", async () => {
    const steps = new Steps();
    jest.spyOn(steps, "create").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnStepsMock();
      })
    );
    const steps_create_mock = await steps.create(returnStepsMock());
    expect(steps_create_mock).toBeDefined();
  });
  test("Test Steps update", async () => {
    const steps = new Steps();
    jest.spyOn(steps, "update").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnStepsMock();
      })
    );
    const steps_update_mock = await steps.update(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      returnStepsMock()
    );
    expect(steps_update_mock).toBeDefined();
  });
  test("Test Steps delete", async () => {
    const steps = new Steps();
    jest.spyOn(steps, "delete").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return true;
      })
    );
    const steps_delete_mock = await steps.delete(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38"
    );
    expect(steps_delete_mock).toBeDefined();
  });
});

const dateNow = new Date();
const stepsMock: StepsRetrieve = {
  uuid: "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
  name: "test",
  robot_type: "test",
  properties: [
    {
      key: "waitClose",
      type: "boolean",
      group: "jobs",
      title: "Wait container close",
      default: true,
      property: "[jobs][0][args][waitClose]",
      description: "If true, the job waits until the container is closed.",
      group_index: 0,
    },
  ],
  json_schema: {
    type: "object",
    properties: {
      jobs: [
        {
          type: "object",
          title: "Access container job",
          required: ["name"],
          properties: {
            args: {
              title: "Access container arguments",
              default: {
                type: "object",
                properties: {
                  waitClose: {
                    key: "waitClose",
                    type: "boolean",
                    group: "jobs",
                    title: "Wait container close",
                    default: true,
                    property: "[jobs][0][args][waitClose]",
                    description:
                      "If true, the job waits until the container is closed.",
                    group_index: 0,
                  },
                },
              },
            },
            name: {
              type: "string",
              const: "access_container",
            },
            critical: {
              type: "boolean",
              title: "Access container is critical?",
              default: true,
              description:
                "Indicates if the mission should fail in case this job fail.",
            },
            interminable: {
              type: "boolean",
              title: "Access container is interminable?",
              default: false,
              description:
                "Indicates if this job is expected to run indefinitely and should, therefore, be preempted when the mission step is considered complete.",
            },
          },
          description: "Job that should be executed during a mission step.",
          additionalProperties: false,
        },
      ],
    },
  },
  description: "",
  datetime_created: dateNow,
  datetime_updated: dateNow,
  metadata: null,
  active: true,
};

const stepMockForList: PaginatedModel<StepsList> = {
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      uuid: "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      name: "test",
      robot_type: "test",
      description: "",
      datetime_created: dateNow,
      datetime_updated: dateNow,
      active: true,
    },
  ],
};

const returnStepsList = (): PaginatedModel<StepsList> => {
  return stepMockForList;
};

const returnStepsMock = (): StepsRetrieve => {
  return stepsMock;
};
