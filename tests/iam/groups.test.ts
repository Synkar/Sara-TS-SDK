import { Groups } from "../../src/core/iam/Groups";
import { GroupsRetrieve } from "../../src/core/iam/models/Groups.models";
import PaginatedModel from "../../src/models/PaginatedModel";

describe("testing iam module for Groups", () => {
  test("Test Groups instanciate", () => {
    const groups = new Groups();
    expect(groups).toBeDefined();
  });
  test("Test Groups list", async () => {
    const groups = new Groups();
    jest.spyOn(groups, "list").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnGroupsList();
      })
    );
    const groups_list_mock = await groups.list();
    expect(groups_list_mock).toBeDefined();
  });
  test("Test Groups retrieve", async () => {
    const groups = new Groups();
    jest.spyOn(groups, "retrieve").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnGroupsMock();
      })
    );
    const groups_retrieve_mock = await groups.retrieve(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38"
    );
    expect(groups_retrieve_mock).toBeDefined();
  });
  test("Test Groups create", async () => {
    const groups = new Groups();
    jest.spyOn(groups, "create").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnGroupsMock();
      })
    );
    const groups_create_mock = await groups.create({
      name: "group name",
      description: "group description",
      deletable: false,
      super_group: false,
    });
    expect(groups_create_mock).toBeDefined();
  });
  test("Test Groups update", async () => {
    const groups = new Groups();
    jest.spyOn(groups, "update").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnGroupsMock();
      })
    );
    const groups_update_mock = await groups.update(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      {
        name: "group name",
        description: "group description",
        deletable: false,
        super_group: false,
      }
    );
    expect(groups_update_mock).toBeDefined();
  });
  test("Test Groups delete", async () => {
    const groups = new Groups();
    jest.spyOn(groups, "delete").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return true;
      })
    );
    const groups_delete_mock = await groups.delete(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38"
    );
    expect(groups_delete_mock).toBeDefined();
  });
  test("Test Groups attachPolicy", async () => {
    const groups = new Groups();
    jest.spyOn(groups, "attachPolicy").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnGroupsMock();
      })
    );
    const groups_delete_mock = await groups.attachPolicy(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      "policy"
    );
    expect(groups_delete_mock).toBeDefined();
  });
  test("Test Groups detachPolicy", async () => {
    const groups = new Groups();
    jest.spyOn(groups, "detachPolicy").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnGroupsMock();
      })
    );
    const groups_delete_mock = await groups.detachPolicy(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      "policy"
    );
    expect(groups_delete_mock).toBeDefined();
  });
  test("Test Groups attachUser", async () => {
    const groups = new Groups();
    jest.spyOn(groups, "attachUser").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnGroupsMock();
      })
    );
    const groups_delete_mock = await groups.attachUser(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      "user id"
    );
    expect(groups_delete_mock).toBeDefined();
  });
  test("Test Groups detachUser", async () => {
    const groups = new Groups();
    jest.spyOn(groups, "detachUser").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnGroupsMock();
      })
    );
    const groups_delete_mock = await groups.detachUser(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      "user id"
    );
    expect(groups_delete_mock).toBeDefined();
  });
});

const dateNow = new Date();
const groupMock: GroupsRetrieve = {
  uuid: "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
  name: "group name",
  description: "group description",
  deletable: false,
  super_group: false,
  client: {
    uuid: "client uuid",
    name: "client name",
  },
  policies: [
    {
      uuid: "policy uuid",
      name: "policy name",
      scope: 1,
      resource: "resource",
      client: "client",
      super_policy: true,
      datetime_updated: dateNow,
      datetime_created: dateNow,
    },
  ],
  datetime_updated: dateNow,
  datetime_created: dateNow,
};

const returnGroupsList = (): PaginatedModel<GroupsRetrieve> => {
  return {
    count: 1,
    next: null,
    previous: null,
    results: [groupMock],
  };
};
const returnGroupsMock = (): GroupsRetrieve => {
  return groupMock;
};
