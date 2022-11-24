import { Endpoints } from "../../src/core/webhook/Endpoints";
import {
  EndpointsList,
  EndpointsRetrieve,
  RelationsCreate,
  RelationsList,
  RelationsType,
} from "../../src/core/webhook/models/Endpoints.models";
import { WebhookPaginatedModel } from "../../src/core/webhook/models/webhookPaginatedModel";

describe("testing endpoints module", () => {
  test("Test Endpoints instanciate", () => {
    const instance = new Endpoints();
    expect(instance).toBeDefined();
  });
  test("Test Endpoints list", async () => {
    const endpoints = new Endpoints();
    jest.spyOn(endpoints, "list").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnEndpointsList();
      })
    );
    const endpoints_list_mock = await endpoints.list();
    expect(endpoints_list_mock).toBeDefined();
  });
  test("Test Endpoints retrieve", async () => {
    const endpoints = new Endpoints();
    jest.spyOn(endpoints, "retrieve").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnEndpointsRetrieve();
      })
    );
    const id = "b6b1f7f0-5f9f-11ea-8d77-2e728ce88125";
    const endpoints_list_mock = await endpoints.retrieve(id);
    expect(endpoints_list_mock).toBeDefined();
  });
  test("Test Endpoints create", async () => {
    const endpoints = new Endpoints();
    jest.spyOn(endpoints, "create").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnEndpointsRetrieve();
      })
    );
    const data = {
      name: "test",
      url: "http://test.com",
      secret: "test",
      events: ["user"],
    };
    const endpoints_list_mock = await endpoints.create(data);
    expect(endpoints_list_mock).toBeDefined();
  });
  test("Test Endpoints update", async () => {
    const endpoints = new Endpoints();
    jest.spyOn(endpoints, "update").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnEndpointsRetrieve();
      })
    );
    const id = "b6b1f7f0-5f9f-11ea-8d77-2e728ce88125";
    const data = {
      name: "test",
      url: "http://test.com",
      secret: "test",
      events: ["user"],
    };
    const endpoints_list_mock = await endpoints.update(id, data);
    expect(endpoints_list_mock).toBeDefined();
  });
  test("Test Endpoints delete", async () => {
    const endpoints = new Endpoints();
    jest.spyOn(endpoints, "delete").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return true;
      })
    );
    const id = "b6b1f7f0-5f9f-11ea-8d77-2e728ce88125";
    const endpoints_list_mock = await endpoints.delete(id);
    expect(endpoints_list_mock).toBeDefined();
  });
  test("Test Endpoints list relations", async () => {
    const endpoints = new Endpoints();
    jest.spyOn(endpoints, "list_relations").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnEndpointsListRelations();
      })
    );
    const id = "b6b1f7f0-5f9f-11ea-8d77-2e728ce88125";
    const endpoints_list_mock = await endpoints.list_relations(id);
    expect(endpoints_list_mock).toBeDefined();
  });
  test("Test Endpoints create relation", async () => {
    const endpoints = new Endpoints();
    jest.spyOn(endpoints, "create_relations").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnEndpointsRelation();
      })
    );
    const id = "b6b1f7f0-5f9f-11ea-8d77-2e728ce88125";
    const data: RelationsCreate = {
      robots: ["b6b1f7f0-5f9f-11ea-8d77-2e728ce88125"],
      topics: ["b6b1f7f0-5f9f-11ea-8d77-2e728ce88125"],
    };
    const endpoints_list_mock = await endpoints.create_relations(id, data);
    expect(endpoints_list_mock).toBeDefined();
  });
  test("Test Endpoints delete relation", async () => {
    const endpoints = new Endpoints();
    jest.spyOn(endpoints, "delete_relations").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return true;
      })
    );
    const id = "b6b1f7f0-5f9f-11ea-8d77-2e728ce88125";
    const endpointId = "b6b1f7f0-5f9f-11ea-8d77-2e728ce88125";
    const endpoints_list_mock = await endpoints.delete_relations(
      endpointId,
      id
    );
    expect(endpoints_list_mock).toBeDefined();
  });
});

function returnEndpointsList(): WebhookPaginatedModel<EndpointsList> {
  return {
    results: [
      {
        id: "b6b1f7f0-5f9f-11ea-8d77-2e728ce88125",
        client: "b6b1f7f0-5f9f-11ea-8d77-2e728ce88125",
        url: "http://test.com",
        createdAt: "2020-03-03T15:00:00.000Z",
        updatedAt: "2020-03-03T15:00:00.000Z",
      },
    ],
    count: 1,
    limit: 10,
  };
}

function returnEndpointsRetrieve(): EndpointsRetrieve {
  return {
    id: "b6b1f7f0-5f9f-11ea-8d77-2e728ce88125",
    client: "b6b1f7f0-5f9f-11ea-8d77-2e728ce88125",
    url: "http://test.com",
    secretKey: "test",
    createdAt: "2020-03-03T15:00:00.000Z",
    updatedAt: "2020-03-03T15:00:00.000Z",
  };
}

function returnEndpointsListRelations(): WebhookPaginatedModel<RelationsList> {
  return {
    results: [
      {
        id: "b6b1f7f0-5f9f-11ea-8d77-2e728ce88125",
        robot: "b6b1f7f0-5f9f-11ea-8d77-2e728ce88125",
        topic: "user",
        endpoint: "b6b1f7f0-5f9f-11ea-8d77-2e728ce88125",
        createdAt: "2020-03-03T15:00:00.000Z",
      },
    ],
    count: 1,
    limit: 10,
  };
}

function returnEndpointsRelation(): RelationsType {
  return {
    id: "b6b1f7f0-5f9f-11ea-8d77-2e728ce88125",
    robot: "b6b1f7f0-5f9f-11ea-8d77-2e728ce88125",
    topic: "user",
    endpoint: "b6b1f7f0-5f9f-11ea-8d77-2e728ce88125",
    createdAt: "2020-03-03T15:00:00.000Z",
  };
}
