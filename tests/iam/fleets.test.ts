import { Client } from "../../src";
import { Fleets } from "../../src/core/iam/Fleets";
import { FleetRetrieve } from "../../src/core/iam/models/Fleet.models";
import PaginatedModel from "../../src/models/PaginatedModel";

describe("testing iam module for Fleets", () => {
  test("Test Fleets instanciate", () => {
    const fleets = new Fleets();
    expect(fleets).toBeDefined();
  });
  test("Test Fleets list", async () => {
    const fleets = new Fleets();
    jest.spyOn(fleets, "list").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnFleetsList();
      })
    );
    const fleets_list_mock = await fleets.list();
    expect(fleets_list_mock).toBeDefined();
  });
  test("Test Fleets retrieve", async () => {
    const fleets = new Fleets();
    jest.spyOn(fleets, "retrieve").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnFleetsMock();
      })
    );
    const fleets_retrieve_mock = await fleets.retrieve(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38"
    );
    expect(fleets_retrieve_mock).toBeDefined();
  });
  test("Test Fleets create", async () => {
    const fleets = new Fleets();
    jest.spyOn(fleets, "create").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnFleetsMock();
      })
    );
    const fleets_create_mock = await fleets.create({
      name: "Fleet name",
      description: "Fleet descrtiption",
    });
    expect(fleets_create_mock).toBeDefined();
  });
  test("Test Fleets update", async () => {
    const fleets = new Fleets();
    jest.spyOn(fleets, "update").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnFleetsMock();
      })
    );
    const fleets_update_mock = await fleets.update(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      {
        name: "Fleet name",
        description: "Fleet description",
      }
    );
    expect(fleets_update_mock).toBeDefined();
  });
  test("Test Fleets delete", async () => {
    const fleets = new Fleets();
    jest.spyOn(fleets, "delete").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return true;
      })
    );
    const fleets_delete_mock = await fleets.delete(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38"
    );
    expect(fleets_delete_mock).toBeDefined();
  });
  test("Test Fleets attachRobot", async () => {
    const fleets = new Fleets();
    jest.spyOn(fleets, "attachRobot").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnFleetsMock();
      })
    );
    const fleets_delete_mock = await fleets.attachRobot(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      "robot id"
    );
    expect(fleets_delete_mock).toBeDefined();
  });
  test("Test Fleets detachRobot", async () => {
    const fleets = new Fleets();
    jest.spyOn(fleets, "detachRobot").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnFleetsMock();
      })
    );
    const fleets_delete_mock = await fleets.detachRobot(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      "robot id"
    );
    expect(fleets_delete_mock).toBeDefined();
  });
});

const dateNow = new Date();
const fleetMock: FleetRetrieve = {
  uuid: "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
  name: "fleet name",
  description: "fleet description",
  client: {
    name: "client name",
    slug: "client slug",
    aws_cognito_client_id: "client id",
  },
  robots: [
    {
      uuid: "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      name: "robot name",
      description: "robot description",
      datetime_updated: dateNow,
      datetime_created: dateNow,
    },
  ],
  datetime_updated: dateNow,
  datetime_created: dateNow,
};
const returnFleetsList = (): PaginatedModel<FleetRetrieve> => {
  return {
    count: 1,
    next: null,
    previous: null,
    results: [fleetMock],
  };
};

const returnFleetsMock = (): FleetRetrieve => {
  return fleetMock;
};
