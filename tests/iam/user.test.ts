import { Users } from "../../src/core/iam/Users";
import { UsersRetrieve } from "../../src/core/iam/models/Users.models";
import PaginatedModel from "../../src/models/PaginatedModel";

describe("testing iam module for Users", () => {
  test("Test Users instanciate", () => {
    const users = new Users();
    expect(users).toBeDefined();
  });
  test("Test Users list", async () => {
    const users = new Users();
    jest.spyOn(users, "list").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnUsersList();
      })
    );
    const users_list_mock = await users.list();
    expect(users_list_mock).toBeDefined();
  });
  test("Test Users retrieve", async () => {
    const users = new Users();
    jest.spyOn(users, "retrieve").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnUsersMock();
      })
    );
    const users_retrieve_mock = await users.retrieve(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38"
    );
    expect(users_retrieve_mock).toBeDefined();
  });
  test("Test Users create", async () => {
    const users = new Users();
    jest.spyOn(users, "create").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnUsersMock();
      })
    );
    const users_create_mock = await users.create({
      username: "user name",
      email: "email",
      first_name: "name",
      last_name: "last name",
      is_staff: true,
    });
    expect(users_create_mock).toBeDefined();
  });
  test("Test Users update", async () => {
    const users = new Users();
    jest.spyOn(users, "update").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnUsersMock();
      })
    );
    const users_update_mock = await users.update(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      {
        username: "user name",
        email: "email",
        first_name: "name",
        last_name: "last name",
        is_staff: true,
      }
    );
    expect(users_update_mock).toBeDefined();
  });
  test("Test Users delete", async () => {
    const users = new Users();
    jest.spyOn(users, "delete").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return true;
      })
    );
    const users_delete_mock = await users.delete(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38"
    );
    expect(users_delete_mock).toBeDefined();
  });
  test("Test Users me", async () => {
    const users = new Users();
    jest.spyOn(users, "me").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnUsersMock();
      })
    );
    const users_retrieve_mock = await users.me();
    expect(users_retrieve_mock).toBeDefined();
  });
  test("Test Users verifyUserByEmail", async () => {
    const users = new Users();
    jest.spyOn(users, "verifyUserByEmail").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnUsersMock();
      })
    );
    const users_retrieve_mock = await users.verifyUserByEmail("user email");
    expect(users_retrieve_mock).toBeDefined();
  });
});

const dateNow = new Date();
const userMock: UsersRetrieve = {
  uuid: "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
  username: "user name",
  email: "email",
  first_name: "name",
  last_name: "last name",
  is_staff: true,
  groups: [
    {
      uuid: "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      name: "group name",
      datetime_updated: dateNow,
      datetime_created: dateNow,
    },
  ],
  clients: [
    {
      uuid: "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      name: "client name",
      slug: "client slug",
    },
  ],
  last_login: "last login date",
  datetime_joined: "join date",
  datetime_updated: "update date",
};
const returnUsersList = (): PaginatedModel<UsersRetrieve> => {
  return {
    count: 1,
    next: null,
    previous: null,
    results: [userMock],
  };
};

const returnUsersMock = (): UsersRetrieve => {
  return userMock;
};
