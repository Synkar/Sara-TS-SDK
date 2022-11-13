import { Client } from "../../src";
import { Services } from "../../src/core/iam/Services";
import { ServicesRetrieve } from "../../src/core/iam/models/Services.models";
import PaginatedModel from "../../src/models/PaginatedModel";

describe("testing iam module for Services", () => {
  test("Test Services instanciate", () => {
    const services = new Services();
    expect(services).toBeDefined();
  });
  test("Test Services list", async () => {
    const services = new Services();
    jest.spyOn(services, "list").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnServicesList();
      })
    );
    const services_list_mock = await services.list();
    expect(services_list_mock).toBeDefined();
  });
  test("Test Services retrieve", async () => {
    const services = new Services();
    jest.spyOn(services, "retrieve").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnServicesMock();
      })
    );
    const services_retrieve_mock = await services.retrieve(
      "e6075d21-0b68-4ee1-8e83-cbe44721cc38"
    );
    expect(services_retrieve_mock).toBeDefined();
  });
  test("Test Services create", async () => {
    const services = new Services();
    jest.spyOn(services, "create").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnServicesMock();
      })
    );
    const services_create_mock = await services.create({
      name: "Service name",
      slug: "Service slug",
    });
    expect(services_create_mock).toBeDefined();
  });
});

const dateNow = new Date();
const serviceMock: ServicesRetrieve = {
  uuid: "e6075d21-0b68-4ee1-8e83-cbe44721cc38",
  name: "service name",
  slug: "service slug",
  datetime_updated: dateNow,
  datetime_created: dateNow,
};
const returnServicesList = (): ServicesRetrieve[] => {
  return [serviceMock];
};

const returnServicesMock = (): ServicesRetrieve => {
  return serviceMock;
};
