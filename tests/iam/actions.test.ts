import { Actions } from "../../src/core/iam/Actions";
import { ActionRetrieve } from "../../src/core/iam/models/Actions.models";

describe("testing iam module for Actions", () => {
  test("Test Actions instanciate", () => {
    const actions = new Actions();
    expect(actions).toBeDefined();
  });
  test("Test Actions list", async () => {
    const actions = new Actions();
    jest.spyOn(actions, "list").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnActionsList();
      })
    );
    const actions_list_mock = await actions.list();
    expect(actions_list_mock).toBeDefined();
  });
  test("Test Actions retrieve", async () => {
    const actions = new Actions();
    jest.spyOn(actions, "retrieve").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnActionsMock();
      })
    );
    const actions_retrieve_mock = await actions.retrieve(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38"
    );
    expect(actions_retrieve_mock).toBeDefined();
  });
  test("Test Actions create", async () => {
    const actions = new Actions();
    jest.spyOn(actions, "create").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnActionsMock();
      })
    );
    const actions_create_mock = await actions.create({
      service: "250720c8-d001-4c98-b5c6-0476dc424a3b",
      name: "test",
      type: "T",
    });
    expect(actions_create_mock).toBeDefined();
  });
});

const dateNow = new Date();
const actionMock: ActionRetrieve = {
  uuid: "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
  service: "250720c8-d001-4c98-b5c6-0476dc424a3b",
  name: "AttachRobot",
  type: "A",
  datetime_created: dateNow,
  datetime_updated: dateNow,
};

const returnActionsList = (): ActionRetrieve[] => {
  return [actionMock];
};
const returnActionsMock = (): ActionRetrieve => {
  return actionMock;
};
