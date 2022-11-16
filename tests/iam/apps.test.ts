import { Apps } from "../../src/core/iam/Apps";
import { AppsRetrieve } from "../../src/core/iam/models/Apps.models";

describe("testing iam module for Apps", () => {
  test("Test Apps instanciate", () => {
    const apps = new Apps();
    expect(apps).toBeDefined();
  });
  test("Test Apps list", async () => {
    const apps = new Apps();
    jest.spyOn(apps, "list").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnAppsList();
      })
    );
    const apps_list_mock = await apps.list();
    expect(apps_list_mock).toBeDefined();
  });
  test("Test App retrieve", async () => {
    const apps = new Apps();
    jest.spyOn(apps, "retrieve").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnAppsMock();
      })
    );
    const apps_retrieve_mock = await apps.retrieve(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38"
    );
    expect(apps_retrieve_mock).toBeDefined();
  });
  test("Test Apps create", async () => {
    const apps = new Apps();
    jest.spyOn(apps, "create").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnAppsMock();
      })
    );
    const apps_create_mock = await apps.create({
      name: "app name",
      description: "app description",
    });
    expect(apps_create_mock).toBeDefined();
  });
  test("Test Apps update", async () => {
    const apps = new Apps();
    jest.spyOn(apps, "update").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnAppsMock();
      })
    );
    const apps_update_mock = await apps.update(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      {
        name: "new app name",
        description: "new app description",
      }
    );
    expect(apps_update_mock).toBeDefined();
  });
  test("Test Apps delete", async () => {
    const apps = new Apps();
    jest.spyOn(apps, "delete").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return true;
      })
    );
    const apps_delete_mock = await apps.delete(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38"
    );
    expect(apps_delete_mock).toBeDefined();
  });
});

const dateNow = new Date();
const appsMock: AppsRetrieve = {
  name: "app name",
  description: "app description",
  uuid: "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
  id: 1,
  user: {
    uuid: "250720c8-d001-4c98-b5c6-0476dc424a3b",
    username: "user name",
    email: "email",
    first_name: "name",
    last_name: "last name",
    last_login: "date",
    datetime_joined: "date",
    datetime_updated: "date",
  },
  user_client_id: "250720c8-d001-4c98-b5c6-0476dc424a3b",
  datetime_created: dateNow,
  datetime_updated: dateNow,
};

const returnAppsList = (): AppsRetrieve[] => {
  return [appsMock];
};
const returnAppsMock = (): AppsRetrieve => {
  return appsMock;
};
