import { Buckets } from "../../src/core/srs/Buckets";
import { BucketsRetrieve } from "../../src/core/srs/models/Buckets.models";
import { PaginatedModel } from "../../src/models/PaginatedModel";

describe("testing buckets module", () => {
  test("Test Buckets instanciate", () => {
    const instance = new Buckets();
    expect(instance).toBeDefined();
  });
  test("Test Buckets list", async () => {
    const buckets = new Buckets();
    jest.spyOn(buckets, "list").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnBucketsList();
      })
    );
    const buckets_list_mock = await buckets.list();
    expect(buckets_list_mock).toBeDefined();
  });
  test("Test Buckets retrieve", async () => {
    const buckets = new Buckets();
    jest.spyOn(buckets, "retrieve").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnBucketsMock();
      })
    );
    const bucket_uuid: string = "e6075d21-0b68-4ee1-8e83-cbe44721cc38";
    const buckets_retrieve_mock = await buckets.retrieve(bucket_uuid);
    expect(buckets_retrieve_mock.uuid).toEqual(bucket_uuid);
    expect(buckets_retrieve_mock).toBeDefined();
  });
  test("Test Buckets create", async () => {
    const buckets = new Buckets();
    jest.spyOn(buckets, "create").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnBucketsMock();
      })
    );
    const buckets_create_mock = await buckets.create({
      name: "test",
      description: "test",
      type: "PUBLIC",
      all_clients_permitted: true,
    });
    expect(buckets_create_mock).toBeDefined();
  });

  test("Test Buckets update", async () => {
    const buckets = new Buckets();
    jest.spyOn(buckets, "update").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnBucketsMock();
      })
    );
    const buckets_update_mock = await buckets.update(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      {
        name: "test",
        description: "test2",
      }
    );
    expect(buckets_update_mock).toBeDefined();
  });

  test("Test Buckets remove", async () => {
    const buckets = new Buckets();
    jest.spyOn(buckets, "remove").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return true;
      })
    );
    const buckets_delete_mock = await buckets.remove(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38"
    );
    expect(buckets_delete_mock).toBeDefined();
  });

  test("Test Buckets download link", async () => {
    const buckets = new Buckets();
    jest.spyOn(buckets, "downloadLink").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return "https://test.com";
      })
    );

    const buckets_download_link_mock = await buckets.downloadLink(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      "test"
    );
    expect(buckets_download_link_mock).toEqual("https://test.com");
  });
});

const dateNow = new Date();
const bucketMock: BucketsRetrieve = {
  uuid: "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
  name: "test",
  description: "test",
  type: "PUBLIC",
  locality: "sp_ribeirao_sy",
  s3_bucket_name: "test",
  owner_client: true,
  all_clients_permitted: true,
  objects: [],
  datetime_created: dateNow,
  datetime_updated: dateNow,
};

const returnBucketsList = (): PaginatedModel<BucketsRetrieve> => {
  return {
    count: 1,
    next: null,
    previous: null,
    results: [bucketMock],
  };
};

const returnBucketsMock = (): BucketsRetrieve => {
  return bucketMock;
};
