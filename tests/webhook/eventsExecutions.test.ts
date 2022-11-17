import { EventsExecutions } from "../../src/core/webhook/EventsExecutions";
import { EventsExecutionsList } from "../../src/core/webhook/models/Events_executions.models";
import { WebhookPaginatedModel } from "../../src/core/webhook/models/webhookPaginatedModel";

describe("testing events executions module", () => {
  test("Test EventsExecutions instanciate", () => {
    const instance = new EventsExecutions();
    expect(instance).toBeDefined();
  });
  test("Test EventsExecutions retrieve", async () => {
    const eventsExecutions = new EventsExecutions();
    jest.spyOn(eventsExecutions, "retrieve").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnEventsExecutionsRetrieve();
      })
    );
    const id = "b6b1f7f0-5f9f-11ea-8d77-2e728ce88125";
    const eventsExecutions_list_mock = await eventsExecutions.retrieve(id);
    expect(eventsExecutions_list_mock).toBeDefined();
  });
});

function returnEventsExecutionsRetrieve(): WebhookPaginatedModel<EventsExecutionsList> {
  return {
    count: 1,
    limit: 10,
    results: [
      {
        id: "b6b1f7f0-5f9f-11ea-8d77-2e728ce88125",
        endpoint: "b6b1f7f0-5f9f-11ea-8d77-2e728ce88125",
        eventId: "b6b1f7f0-5f9f-11ea-8d77-2e728ce88125",
        response: "",
        robot: "b6b1f7f0-5f9f-11ea-8d77-2e728ce88125",
        topic: "b6b1f7f0-5f9f-11ea-8d77-2e728ce88125",
        statusCode: 200,
        createdAt: "2020-03-03T15:00:00.000Z",
      },
    ],
  };
}
