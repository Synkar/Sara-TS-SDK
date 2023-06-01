import { Operations } from "../../src/core/hivemind/Operations";
import {
  OperationList,
  OperationsRetrieve,
} from "../../src/core/hivemind/models/Operations.models";
import { PaginatedModel } from "../../src/models/PaginatedModel";

describe("testing hivemind module for Operations", () => {
  test("Test Operations instanciate", () => {
    const operations = new Operations();
    expect(operations).toBeDefined();
  });
  test("Test Operations list", async () => {
    const operations = new Operations();
    jest.spyOn(operations, "list").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnOperationsList();
      })
    );
    const operations_list_mock = await operations.list();
    expect(operations_list_mock).toBeDefined();
  });
  test("Test Operations retrieve", async () => {
    const operations = new Operations();
    jest.spyOn(operations, "retrieve").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnOperationsMock();
      })
    );
    const operations_retrieve_mock = await operations.retrieve("test");
    expect(operations_retrieve_mock).toBeDefined();
  });
  test("Test Operations create", async () => {
    const operations = new Operations();
    jest.spyOn(operations, "create").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnOperationsMock();
      })
    );
    const operations_create_mock = await operations.create({
      name: "test",
      description: "test",
      locality: "test",
    });
    expect(operations_create_mock).toBeDefined();
  });
  test("Test Operations update", async () => {
    const operations = new Operations();
    jest.spyOn(operations, "update").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnOperationsMock();
      })
    );
    const operations_update_mock = await operations.update("test", {
      name: "test",
      description: "test",
      locality: "test",
    });
    expect(operations_update_mock).toBeDefined();
  });
  test("Test Operations delete", async () => {
    const operations = new Operations();
    jest.spyOn(operations, "delete").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return;
      })
    );
    const operations_delete_mock = await operations.delete("test");
    expect(operations_delete_mock).toBeUndefined();
  });
});

const dateNow = new Date().toString();

const operationsMockList: OperationList = {
  uuid: "test",
  name: "test",
  description: "test",
  localitySlug: "test",
  createdAt: dateNow,
  updatedAt: dateNow,
};

const operationsMockRetrieve: OperationsRetrieve = {
  uuid: "test",
  name: "test",
  description: "test",
  locality: {
    slug: "test",
    robotCapacity: 1,
    timestamps: [[]],
    landmarks: [],
    depotLandmark: 0,
  },
  localitySlug: "test",
  deliveryMissionStage: "test",
  pickupMissionStage: "test",
  deliveryMissionStageLandmarkKey: "test",
  pickupMissionStageLandmarkKey: "test",
  createdAt: dateNow,
  updatedAt: dateNow,
  requestBody: {
    operation: "test",
    pickup: {
      params: {
        test: "test",
      },
      windowTime: [0, 0],
    },
    delivery: {
      params: {
        test: "test",
      },
      windowTime: [0, 0],
    },
  },
};

function returnOperationsList(): Promise<PaginatedModel<OperationList>> {
  return new Promise((resolve) => {
    resolve({
      count: 1,
      next: null,
      previous: null,
      results: [operationsMockList],
    });
  });
}

function returnOperationsMock(): Promise<OperationsRetrieve> {
  return new Promise((resolve) => {
    resolve(operationsMockRetrieve);
  });
}
