import { Events } from "../../src/core/webhook/Events";
import { EventsRetrieve } from "../../src/core/webhook/models/Events.models";

describe("testing events module", () => {
  test("Test Events instanciate", () => {
    const instance = new Events();
    expect(instance).toBeDefined();
  });
  test("Test Events retrieve", async () => {
    const events = new Events();
    jest.spyOn(events, "retrieve").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnEventsRetrieve();
      })
    );
    const id = "b6b1f7f0-5f9f-11ea-8d77-2e728ce88125";
    const events_list_mock = await events.retrieve(id);
    expect(events_list_mock).toBeDefined();
  });
});

function returnEventsRetrieve(): EventsRetrieve {
  return {
    id: "b6b1f7f0-5f9f-11ea-8d77-2e728ce88125",
    topic: "user",
    createdAt: "2020-03-03T15:00:00.000Z",
    data: "",
    robot: "b6b1f7f0-5f9f-11ea-8d77-2e728ce88125",
  };
}
