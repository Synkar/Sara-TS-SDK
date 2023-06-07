import { config } from "dotenv";
import { Sara } from "sara-sdk-ts";

config();

await Sara.auth(
  process.env.SARA_ACCESS_KEY as string,
  process.env.SARA_SECRET_KEY as string
);

const hivemind = new Sara.Hivemind();

// Listing and retrieving resources

const localities = await new hivemind.Localities().list();

const locality = await new hivemind.Localities().retrieve(
  localities.results[0].slug
);

const operations = await new hivemind.Operations().list();

const operation = await new hivemind.Operations().retrieve(
  operations.results[0].uuid
);

const requests = await new hivemind.Requests().list();

const request = await new hivemind.Requests().retrieve(
  requests.results[0].uuid
);

console.log(localities);
console.log(locality);
console.log(operations);
console.log(operation);
console.log(requests);
console.log(request);

// Creating resources

const newLocality = await new hivemind.Localities().create({
  slug: "test-locality",
  robotCapacity: 1,
  timestamps: [
    [60, 73, 106],
    [73, 60, 106],
  ],
  landmarks: [6, 7, 8],
  depotLandmark: 6,
});

const newOperation = await new hivemind.Operations().create({
  locality: newLocality.slug,
  name: "test-operation",
  deliveryMissionStage: "uuid",
  pickupMissionStage: "uuid",
  pickupMissionStageLandmarkKey: "uuid",
  deliveryMissionStageLandmarkKey: "uuid",
  description: "uuid",
});

const newRequest = await new hivemind.Requests().create({
  operation: newOperation.uuid,
  delivery: {
    params: {
      uuid: "test-request",
    },
    windowTime: [0, 9999],
  },
  pickup: {
    params: {
      uuid: "test-request",
    },
    windowTime: [0, 9999],
  },
});

console.log(newLocality);
console.log(newOperation);
console.log(newRequest);
