import { Activities } from "../../src/core/srs/Activities";
import { ActivitiesRetrieve } from "../../src/core/srs/models/Activities.models";
import { PaginatedModel } from "../../src/models/PaginatedModel";

describe("testing activities module", () => {
  test("Test Activities instanciate", () => {
    const instance = new Activities();
    expect(instance).toBeDefined();
  });
  test("Test Activities list", async () => {
    const activities = new Activities();
    jest.spyOn(activities, "list").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnActivitiesList();
      })
    );
    const activities_list_mock = await activities.list();
    expect(activities_list_mock).toBeDefined();
  });
  test("Test Activities retrieve", async () => {
    const activities = new Activities();
    jest.spyOn(activities, "retrieve").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnActivitiesMock();
      })
    );
    const bucket_uuid: string = "e6075d21-0b68-4ee1-8e83-cbe44721cc38";
    const activities_retrieve_mock = await activities.retrieve(bucket_uuid);
    expect(activities_retrieve_mock.uuid).toEqual(bucket_uuid);
    expect(activities_retrieve_mock).toBeDefined();
  });
  test("Test Activities create", async () => {
    const activities = new Activities();
    jest.spyOn(activities, "create").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnActivitiesMock();
      })
    );
    const activities_create_mock = await activities.create({
      robot: "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      operation: "DownloadFile",
      payload: "",
    });
    expect(activities_create_mock).toBeDefined();
  });
});

const dateNow = new Date();
const bucketMock: ActivitiesRetrieve = {
  uuid: "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
  relationship: "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
  type: "D",
  robots: ["e6075d21-0b68-4ee1-8e83-cbe44721cc38"],
  files: [],
  executions: {},
  datetime_created: dateNow,
  datetime_updated: dateNow,
};

const returnActivitiesList = (): PaginatedModel<ActivitiesRetrieve> => {
  return {
    count: 1,
    next: null,
    previous: null,
    results: [bucketMock],
  };
};

const returnActivitiesMock = (): ActivitiesRetrieve => {
  return bucketMock;
};
