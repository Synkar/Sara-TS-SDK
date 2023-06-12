import { Requests } from "../../src/core/hivemind/Requests";
import {
  RequestsList,
  RequestsRetrieve,
} from "../../src/core/hivemind/models/Requests.models";
import { PaginatedModel } from "../../src/models/PaginatedModel";

describe("testing hivemind module for Requests", () => {
  test("Test Requests instanciate", () => {
    const requests = new Requests();
    expect(requests).toBeDefined();
  });
  test("Test Requests list", async () => {
    const requests = new Requests();
    jest.spyOn(requests, "list").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnRequestsList();
      })
    );
    const requests_list_mock = await requests.list();
    expect(requests_list_mock).toBeDefined();
  });
  test("Test Requests retrieve", async () => {
    const requests = new Requests();
    jest.spyOn(requests, "retrieve").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnRequestsMock();
      })
    );
    const requests_retrieve_mock = await requests.retrieve("test");
    expect(requests_retrieve_mock).toBeDefined();
  });
  test("Test Requests create", async () => {
    const requests = new Requests();
    jest.spyOn(requests, "create").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnRequestsMock();
      })
    );
    const requests_create_mock = await requests.create({
      operation: "test",
      delivery: {
        params: {
          test: "test",
        },
        windowTime: [0, 0],
      },
      pickup: {
        params: {
          test: "test",
        },
        windowTime: [0, 0],
      },
    });
    expect(requests_create_mock).toBeDefined();
  });
});

const createdAt = new Date().toString();

const requestsMockList: RequestsList = {
  uuid: "test",
  status: "Unknown",
  operation: {
    uuid: "test",
    name: "test",
  },
  createdAt: createdAt,
};

function returnRequestsList(): Promise<PaginatedModel<RequestsList>> {
  return new Promise((resolve: any) => {
    resolve();
  }).then(() => {
    return {
      count: 1,
      next: null,
      previous: null,
      results: [requestsMockList],
    };
  });
}

const requestsMock: RequestsRetrieve = {
  uuid: "test",
  status: "Unknown",
  locality: "test",
  operation: {
    name: "test",
    uuid: "test",
  },
  nodes: {
    delivery: {
      lowerTimeWindow: 0,
      upperTimeWindow: 0,
      params: {
        test: "test",
      },
    },
    pickup: {
      lowerTimeWindow: 0,
      upperTimeWindow: 0,
      params: {
        test: "test",
      },
    },
  },
  createdAt: createdAt,
};

function returnRequestsMock(): Promise<RequestsRetrieve> {
  return new Promise((resolve: any) => {
    resolve();
  }).then(() => {
    return requestsMock;
  });
}
