import { Tags } from "../../src/core/missions-v2/Tags";
import { TagsRetrieve } from "../../src/core/missions-v2/models/Tags.models";
import { PaginatedModel } from "../../src/models/PaginatedModel";

describe("testing missions-v2 module for Tags", () => {
  test("Test Tags instanciate", () => {
    const tags = new Tags();
    expect(tags).toBeDefined();
  });
  test("Test Tags list", async () => {
    const tags = new Tags();
    jest.spyOn(tags, "list").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnTagsList();
      })
    );
    const tags_list_mock = await tags.list();
    expect(tags_list_mock).toBeDefined();
  });
  test("Test Tags retrieve", async () => {
    const tags = new Tags();
    jest.spyOn(tags, "retrieve").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnTagsMock();
      })
    );
    const tags_retrieve_mock = await tags.retrieve(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38"
    );
    expect(tags_retrieve_mock).toBeDefined();
  });
  test("Test Tags create", async () => {
    const tags = new Tags();
    jest.spyOn(tags, "create").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnTagsMock();
      })
    );
    const tags_create_mock = await tags.create(returnTagsMock());
    expect(tags_create_mock).toBeDefined();
  });
  test("Test Tags update", async () => {
    const tags = new Tags();
    jest.spyOn(tags, "update").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnTagsMock();
      })
    );
    const tags_update_mock = await tags.update(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      returnTagsMock()
    );
    expect(tags_update_mock).toBeDefined();
  });
});

const dateNow = new Date();
const tagsMock: TagsRetrieve = {
  uuid: "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
  name: "test",
  group: "",
  datetime_created: dateNow,
  datetime_used: dateNow,
};

const tagsListMock: PaginatedModel<TagsRetrieve> = {
  count: 1,
  next: null,
  previous: null,
  results: [tagsMock],
};

function returnTagsList(): PaginatedModel<TagsRetrieve> {
  return tagsListMock;
}

function returnTagsMock(): TagsRetrieve {
  return tagsMock;
}
