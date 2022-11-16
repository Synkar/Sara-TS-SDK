import { Policies } from "../../src/core/iam/Policies";
import { PoliciesRetrieve } from "../../src/core/iam/models/Policies.models";

describe("testing iam module for Policies", () => {
  test("Test Policies instanciate", () => {
    const policies = new Policies();
    expect(policies).toBeDefined();
  });
  test("Test Policies list", async () => {
    const policies = new Policies();
    jest.spyOn(policies, "list").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnPoliciesList();
      })
    );
    const policies_list_mock = await policies.list();
    expect(policies_list_mock).toBeDefined();
  });
  test("Test Policies retrieve", async () => {
    const policies = new Policies();
    jest.spyOn(policies, "retrieve").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnPoliciesMock();
      })
    );
    const policies_retrieve_mock = await policies.retrieve(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38"
    );
    expect(policies_retrieve_mock).toBeDefined();
  });
  test("Test Policies create", async () => {
    const policies = new Policies();
    jest.spyOn(policies, "create").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnPoliciesMock();
      })
    );
    const policies_create_mock = await policies.create({
      name: "policy name",
      scope: 1,
      resource: "resource",
      client: "client",
      super_policy: true,
    });
    expect(policies_create_mock).toBeDefined();
  });
  test("Test Policies update", async () => {
    const policies = new Policies();
    jest.spyOn(policies, "update").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnPoliciesMock();
      })
    );
    const policies_update_mock = await policies.update(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      {
        name: "policy name",
        scope: 1,
        resource: "resource",
        client: "client",
        super_policy: true,
      }
    );
    expect(policies_update_mock).toBeDefined();
  });
  test("Test Policies delete", async () => {
    const policies = new Policies();
    jest.spyOn(policies, "delete").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return true;
      })
    );
    const policies_delete_mock = await policies.delete(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38"
    );
    expect(policies_delete_mock).toBeDefined();
  });
  test("Test Policies attachPermissions", async () => {
    const policies = new Policies();
    jest.spyOn(policies, "attachPermissions").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnPoliciesMock();
      })
    );
    const policies_delete_mock = await policies.attachPermissions(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      ["permissions"]
    );
    expect(policies_delete_mock).toBeDefined();
  });
  test("Test Policies detachPermissions", async () => {
    const policies = new Policies();
    jest.spyOn(policies, "detachPermissions").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnPoliciesMock();
      })
    );
    const policies_delete_mock = await policies.detachPermissions(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      ["permissions"]
    );
    expect(policies_delete_mock).toBeDefined();
  });
});

const dateNow = new Date();
const policyMock: PoliciesRetrieve = {
  uuid: "Policy uuid",
  name: "policy name",
  scope: 1,
  resource: "resoure",
  client: "client",
  super_policy: true,
  editable: true,
  deletable: false,
  permissions: [
    {
      uuid: "action uuid",
      name: "action name",
      type: "action type",
      is_super_user: true,
      service: {
        uuid: "service uuid",
        id: 1,
        name: "service name",
        slug: "service slug",
        datetime_updated: dateNow,
        datetime_created: dateNow,
      },
    },
  ],
  datetime_updated: dateNow,
  datetime_created: dateNow,
};
const returnPoliciesList = (): PoliciesRetrieve[] => {
  return [policyMock];
};

const returnPoliciesMock = (): PoliciesRetrieve => {
  return policyMock;
};
