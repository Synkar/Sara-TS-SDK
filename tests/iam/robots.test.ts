import { Client } from "../../src";
import { Robots } from "../../src/core/iam/Robots";
import { RobotRetrieve } from "../../src/core/iam/models/Robot.models";
import PaginatedModel from "../../src/models/PaginatedModel";

describe("testing iam module for Robots", () => {
  test("Test Robots instanciate", () => {
    const robots = new Robots();
    expect(robots).toBeDefined();
  });
  test("Test Robots list", async () => {
    const robots = new Robots();
    jest.spyOn(robots, "list").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnRobotsList();
      })
    );
    const robots_list_mock = await robots.list();
    expect(robots_list_mock).toBeDefined();
  });
  test("Test Robots retrieve", async () => {
    const robots = new Robots();
    jest.spyOn(robots, "retrieve").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnRobotsMock();
      })
    );
    const robots_retrieve_mock = await robots.retrieve(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38"
    );
    expect(robots_retrieve_mock).toBeDefined();
  });
  test("Test Robots create", async () => {
    const robots = new Robots();
    jest.spyOn(robots, "create").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnRobotsMock();
      })
    );
    const robots_create_mock = await robots.create({
      name: "Robot name",
      description: "Robot descrtiption",
    });
    expect(robots_create_mock).toBeDefined();
  });
  test("Test Robots update", async () => {
    const robots = new Robots();
    jest.spyOn(robots, "update").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnRobotsMock();
      })
    );
    const robots_update_mock = await robots.update(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      {
        name: "Robot name",
        description: "Robot description",
      }
    );
    expect(robots_update_mock).toBeDefined();
  });
  test("Test Robots delete", async () => {
    const robots = new Robots();
    jest.spyOn(robots, "delete").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return true;
      })
    );
    const robots_delete_mock = await robots.delete(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38"
    );
    expect(robots_delete_mock).toBeDefined();
  });
  test("Test Robots attachLocality", async () => {
    const robots = new Robots();
    jest.spyOn(robots, "attachLocality").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnRobotsMock();
      })
    );
    const robots_delete_mock = await robots.attachLocality(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      "locality id"
    );
    expect(robots_delete_mock).toBeDefined();
  });
  test("Test Robots detachLocality", async () => {
    const robots = new Robots();
    jest.spyOn(robots, "detachLocality").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnRobotsMock();
      })
    );
    const robots_delete_mock = await robots.detachLocality(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      "locality id"
    );
    expect(robots_delete_mock).toBeDefined();
  });
});

const dateNow = new Date();
const robotMock: RobotRetrieve = {
  uuid: "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
  name: "robot name",
  description: "robot description",
  fleets: [
    {
      uuid: "fleet uuid",
      name: "fleet name",
      description: "fleet description",
    },
  ],
  location: {
    latitude: 1,
    longitude: 1,
    zoom: 0,
  },
  datetime_updated: dateNow,
  datetime_created: dateNow,
};
const returnRobotsList = (): PaginatedModel<RobotRetrieve> => {
  return {
    count: 1,
    next: null,
    previous: null,
    results: [robotMock],
  };
};

const returnRobotsMock = (): RobotRetrieve => {
  return robotMock;
};
