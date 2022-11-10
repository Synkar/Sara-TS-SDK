import { Relationships } from "../../src/core/srs/Relationships";
import { RelationshipsRetrieve } from "../../src/core/srs/models/Relationships.models";
import { PaginatedModel } from "../../src/models/PaginatedModel";
import { BucketsType } from "../../src/core/srs/models/Buckets.models";

describe("testing relationships module", () => {
  test("Test Relationships instanciate", () => {
    const instance = new Relationships();
    expect(instance).toBeDefined();
  });
  test("Test Relationships list", async () => {
    const relationships = new Relationships();
    jest.spyOn(relationships, "list").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnRelationshipsList();
      })
    );
    const relationships_list_mock = await relationships.list();
    expect(relationships_list_mock).toBeDefined();
  });
  test("Test Relationships retrieve", async () => {
    const relationships = new Relationships();
    jest.spyOn(relationships, "retrieve").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnRelationshipsMock();
      })
    );
    const relationship_uuid: string = "e6075d21-0b68-4ee1-8e83-cbe44721cc38";
    const relationships_retrieve_mock = await relationships.retrieve(
      relationship_uuid
    );
    expect(relationships_retrieve_mock.uuid).toEqual(relationship_uuid);
    expect(relationships_retrieve_mock).toBeDefined();
  });
  test("Test Relationships create", async () => {
    const relationships = new Relationships();
    jest.spyOn(relationships, "create").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnRelationshipsMock();
      })
    );
    const relationships_create_mock = await relationships.create({
      local_root: "/",
      match_regex: "^.*$",
      locality: "sp_ribeirao_sy",
      bucket: bucketMock,
    });
    expect(relationships_create_mock).toBeDefined();
  });

  test("Test Relationships update", async () => {
    const relationships = new Relationships();
    jest.spyOn(relationships, "update").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnRelationshipsMock();
      })
    );
    const relationships_update_mock = await relationships.update(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      {}
    );
    expect(relationships_update_mock).toBeDefined();
  });

  test("Test Relationships remove", async () => {
    const relationships = new Relationships();
    jest.spyOn(relationships, "remove").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return true;
      })
    );
    const relationships_delete_mock = await relationships.remove(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38"
    );
    expect(relationships_delete_mock).toBeDefined();
  });
});

const dateNow = new Date();
const bucketMock: BucketsType = {
  name: "test",
  description: "test",
  type: "PUBLIC",
  locality: "sp_ribeirao_sy",
};
const relationshipMock: RelationshipsRetrieve = {
  uuid: "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
  local_root: "/",
  match_regex: "^.*$",
  locality: "sp_ribeirao_sy",
  bucket: bucketMock,
  files: [],
  datetime_created: dateNow,
  datetime_updated: dateNow,
};

const returnRelationshipsList = (): PaginatedModel<RelationshipsRetrieve> => {
  return {
    count: 1,
    next: null,
    previous: null,
    results: [relationshipMock],
  };
};

const returnRelationshipsMock = (): RelationshipsRetrieve => {
  return relationshipMock;
};
