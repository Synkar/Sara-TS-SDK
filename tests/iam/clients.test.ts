import { Client } from "../../src";
import { Clients } from "../../src/core/iam/Clients";
import { ClientsRetrieve } from "../../src/core/iam/models/Client.models";

describe("testing iam module for Clients", () => {
  test("Test Clients instanciate", () => {
    const clients = new Clients();
    expect(clients).toBeDefined();
  });
  test("Test Clients list", async () => {
    const clients = new Clients();
    jest.spyOn(clients, "list").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnClientsList();
      })
    );
    const clients_list_mock = await clients.list();
    expect(clients_list_mock).toBeDefined();
  });
  test("Test Clients retrieve", async () => {
    const clients = new Clients();
    jest.spyOn(clients, "retrieve").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnClientsMock();
      })
    );
    const clients_retrieve_mock = await clients.retrieve(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38"
    );
    expect(clients_retrieve_mock).toBeDefined();
  });
  test("Test Clients create", async () => {
    const clients = new Clients();
    jest.spyOn(clients, "create").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnClientsMock();
      })
    );
    const clients_create_mock = await clients.create({
      name: "client name",
      slug: "client slug",
      aws_cognito_client_id: "client id",
    });
    expect(clients_create_mock).toBeDefined();
  });
  test("Test Clients update", async () => {
    const clients = new Clients();
    jest.spyOn(clients, "update").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnClientsMock();
      })
    );
    const clients_update_mock = await clients.update(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      {
        name: "new client name",
        slug: "new client slug",
        aws_cognito_client_id: "new client id",
      }
    );
    expect(clients_update_mock).toBeDefined();
  });
  test("Test Clients delete", async () => {
    const clients = new Clients();
    jest.spyOn(clients, "delete").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return true;
      })
    );
    const clients_delete_mock = await clients.delete(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38"
    );
    expect(clients_delete_mock).toBeDefined();
  });
  test("Test Clients attachUser", async () => {
    const clients = new Clients();
    jest.spyOn(clients, "attachUser").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnClientsMock();
      })
    );
    const clients_delete_mock = await clients.attachUser(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      "user id"
    );
    expect(clients_delete_mock).toBeDefined();
  });
  test("Test Clients detachUser", async () => {
    const clients = new Clients();
    jest.spyOn(clients, "detachUser").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnClientsMock();
      })
    );
    const clients_delete_mock = await clients.detachUser(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      "user id"
    );
    expect(clients_delete_mock).toBeDefined();
  });
  test("Test Clients attachRobot", async () => {
    const clients = new Clients();
    jest.spyOn(clients, "attachRobot").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnClientsMock();
      })
    );
    const clients_delete_mock = await clients.attachRobot(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      "robot id"
    );
    expect(clients_delete_mock).toBeDefined();
  });
  test("Test Clients detachRobot", async () => {
    const clients = new Clients();
    jest.spyOn(clients, "detachRobot").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnClientsMock();
      })
    );
    const clients_delete_mock = await clients.detachRobot(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
      "robot id"
    );
    expect(clients_delete_mock).toBeDefined();
  });
});

const dateNow = new Date();
const clientMock: ClientsRetrieve = {
  uuid: "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
  name: "client name",
  slug: "client slug",
  aws_cognito_client_id: "client id",
  datetime_updated: dateNow,
  datetime_created: dateNow,
  owner: {
    uuid: "250720c8-d001-4c98-b5c6-0476dc424a3b",
    username: "user name",
    email: "email",
    first_name: "name",
    last_name: "last name",
    last_login: "date",
    datetime_joined: "date",
    datetime_updated: "date",
  },
};

const returnClientsList = (): ClientsRetrieve[] => {
  return [clientMock];
};
const returnClientsMock = (): ClientsRetrieve => {
  return clientMock;
};
