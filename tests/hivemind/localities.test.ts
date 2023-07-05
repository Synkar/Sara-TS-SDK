import { Localities } from "../../src/core/hivemind/Localities";
import { LocalityRetrieve } from "../../src/core/hivemind/models/Localities.models";
import { PaginatedModel } from "../../src/models/PaginatedModel";

describe("testing hivemind module for Localities", () => {
  test("Test Localities instanciate", () => {
    const localities = new Localities();
    expect(localities).toBeDefined();
  });
  test("Test Localities list", async () => {
    const localities = new Localities();
    jest.spyOn(localities, "list").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnLocalitiesList();
      })
    );
    const localities_list_mock = await localities.list();
    expect(localities_list_mock).toBeDefined();
  });
  test("Test Localities retrieve", async () => {
    const localities = new Localities();
    jest.spyOn(localities, "retrieve").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnLocalitiesMock();
      })
    );
    const localities_retrieve_mock = await localities.retrieve("test");
    expect(localities_retrieve_mock).toBeDefined();
  });
  test("Test Localities create", async () => {
    const localities = new Localities();
    jest.spyOn(localities, "create").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnLocalitiesMock();
      })
    );
    const localities_create_mock = await localities.create({
      slug: "test",
      depotLandmark: 8,
      robotCapacity: 1,
      landmarks: [1, 2, 3, 4, 5, 6, 7, 8],
      timestamps: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 2, 3, 4, 5, 6, 7, 8],
      ],
    });
    expect(localities_create_mock).toBeDefined();
  });
  test("Test Localities update", async () => {
    const localities = new Localities();
    jest.spyOn(localities, "update").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnLocalitiesMock();
      })
    );
    const localities_update_mock = await localities.update("test", {
      depotLandmark: 8,
      robotCapacity: 1,
      landmarks: [1, 2, 3, 4, 5, 6, 7, 8],
      timestamps: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 2, 3, 4, 5, 6, 7, 8],
      ],
    });
    expect(localities_update_mock).toBeDefined();
  });
  test("Test Localities delete", async () => {
    const localities = new Localities();
    jest.spyOn(localities, "delete").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return true;
      })
    );
    const localities_delete_mock = await localities.delete("test");
    expect(localities_delete_mock).toBeDefined();
  });
});

const localityMock: LocalityRetrieve = {
  slug: "test",
  depotLandmark: 8,
  robotCapacity: 1,
  landmarks: [1, 2, 3, 4, 5, 6, 7, 8],
  timestamps: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 2, 3, 4, 5, 6, 7, 8],
  ],
};

const localitiesListMock: PaginatedModel<LocalityRetrieve> = {
  count: 1,
  next: null,
  previous: null,
  results: [localityMock],
};

function returnLocalitiesMock(): Promise<LocalityRetrieve> {
  return new Promise((resolve: any) => {
    resolve(localityMock);
  });
}

function returnLocalitiesList(): Promise<PaginatedModel<LocalityRetrieve>> {
  return new Promise((resolve: any) => {
    resolve(localitiesListMock);
  });
}
