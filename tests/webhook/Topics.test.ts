import {
  TopicsCreate,
  TopicsList,
  TopicsType,
} from "../../src/core/webhook/models/Topics.models";
import { WebhookPaginatedModel } from "../../src/core/webhook/models/webhookPaginatedModel";
import { Topics } from "../../src/core/webhook/Topics";

describe("testing topics module", () => {
  test("Test Topics instanciate", () => {
    const instance = new Topics();
    expect(instance).toBeDefined();
  });
  test("Test Topics list", async () => {
    const topics = new Topics();
    jest.spyOn(topics, "list").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnTopicsList();
      })
    );
    const topics_list_mock = await topics.list("IAM");
    expect(topics_list_mock).toBeDefined();
  });
  test("Test Topics create", async () => {
    const topics = new Topics();
    jest.spyOn(topics, "create").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnTopicsRetrieve();
      })
    );
    const data: TopicsCreate = {
      name: "test",
      action: "test",
      createdAt: "2020-03-03T15:00:00.000Z",
      service: "IAM",
    };
    const topics_list_mock = await topics.create(data);
    expect(topics_list_mock).toBeDefined();
  });
  test("Test Topics delete", async () => {
    const topics = new Topics();
    jest.spyOn(topics, "delete").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return true;
      })
    );
    const topics_list_mock = await topics.delete("IAM", "test");
    expect(topics_list_mock).toBeDefined();
  });
});

function returnTopicsList(): WebhookPaginatedModel<TopicsList> {
  return {
    count: 1,
    limit: 10,
    results: [
      {
        service: "IAM",
        name: "userCreate",
        action: "createUser",
        createdAt: "2020-03-03T15:00:00.000Z",
      },
    ],
  };
}

function returnTopicsRetrieve(): TopicsType {
  return {
    service: "IAM",
    name: "userCreate",
    action: "createUser",
    createdAt: "2020-03-03T15:00:00.000Z",
  };
}
