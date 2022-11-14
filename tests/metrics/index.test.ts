import { Metrics } from "../../src/core/metrics/index";
import { MetricsType } from "../../src/core/metrics/models/metrics.models";

describe("testing Metrics module", () => {
  test("Test telemetry instanciate", () => {
    const metrics = new Metrics();
    expect(metrics).toBeDefined();
  });
  test("Test metrics retrieve", async () => {
    const metrics = new Metrics();
    jest.spyOn(metrics, "retrieve").mockReturnValue(
      new Promise((resolve: any) => {
        resolve();
      }).then(() => {
        return returnMetrics();
      })
    );
    const metrics_retrieve_mock = await metrics.retrieve({
      measurement: "srs_feedback",
      range: "1h",
      filters: {
        robot_id: "beb4b570-3d3f-4a9a-9d0e-235d18d4b2be",
        assisted: true,
      },
      options: {
        window: "1m",
        function: "mean",
        empty: true,
      },
      groups: ["robot_id"],
    });
    expect(metrics_retrieve_mock).toBeDefined();
  });
});

const metricsMock: MetricsType = {
  measurement: "srs_feedback",
  range: "1h",
  filters: {
    robot_id: "beb4b570-3d3f-4a9a-9d0e-235d18d4b2be",
    assisted: true,
  },
  options: {
    window: "1m",
    function: "mean",
    empty: true,
  },
  groups: ["robot_id"],
};

const returnMetrics = (): MetricsType => {
  return metricsMock;
};
