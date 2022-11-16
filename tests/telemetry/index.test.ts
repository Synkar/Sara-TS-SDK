import { Telemetry } from "../../src/core/telemetry/index";
import { SrsFeedbackType } from "../../src/core/telemetry/models/SrsFeedback.models";
import { DiagnosticsType } from "../../src/core/telemetry/models/Diagnostics.models";
import { DiagnosticPaginatedModel } from "../../src/core/telemetry/models/DiagnosticPaginatedModel";
import { DiagnosticsFiltersType } from "../../src/core/telemetry/models/Filters.models";

describe("testing Telemetry module", () => {
  test("Test telemetry instanciate", () => {
    const telemetry = new Telemetry();
    expect(telemetry).toBeDefined();
  });
  test("Test diagnostics", async () => {
    const telemetry = new Telemetry();
    jest.spyOn(telemetry, "diagnostics").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnDiagnosticList();
      })
    );
    const diagnostic_mock = await telemetry.diagnostics(
      "68945b1c-ba9c-4855-a988-b395c014d37a",
      filtersMock
    );
    expect(diagnostic_mock).toBeDefined();
  });
  test("Test srs feedback", async () => {
    const telemetry = new Telemetry();
    jest.spyOn(telemetry, "srsFeedback").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnSrsFeedbackMock();
      })
    );
    const srs_feedback_mock = await telemetry.srsFeedback(
      "U_a21685f7-aca5-4ac7-b93f-5ec711478858"
    );
    expect(srs_feedback_mock).toBeDefined();
  });
});

const srsFeedbackMock: SrsFeedbackType = {
  payload: {
    "/resources/bucket/synkar3.bag": 8.490816452638901,
    rate: 2430137.8727313015,
  },
  jobId: "U_a21685f7-aca5-4ac7-b93f-5ec711478858",
  timestamp: "2020-10-01T00:00:00.000Z",
};

const diagnosticMock: DiagnosticsType = {
  createdAt: "2022-11-10T20:05:10.222Z",
  robot: "robot",
  data: {
    joystick: {
      level: 3,
      message: "Stale",
      Joystick_Driver_Status: {
        level: 3,
        message: "OK",
      },
    },
  },
};
const filtersMock: DiagnosticsFiltersType = {
  limit: "5",
  lastKey: "2021-02-25T23:02:52.794Z",
  gt: "2021-02-25T23:03:15.796Z",
  gte: "2021-02-25T21:37:33.000Z",
};

const returnDiagnosticList = (): DiagnosticPaginatedModel<DiagnosticsType> => {
  return {
    count: 1,
    lastKey: "lastKey",
    results: [diagnosticMock],
  };
};

const returnSrsFeedbackMock = (): SrsFeedbackType => {
  return srsFeedbackMock;
};
