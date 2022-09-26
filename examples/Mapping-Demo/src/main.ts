import "./style.css";

import { Sara, Client as SaraClient } from "sara-sdk-ts";

import { Type } from "sara-sdk-ts/src/core/mapping/";

await SaraClient.auth(
  "7d44jm8d8cc8m5fs5c7sjjcdrk",
  "102i4ad0g87ubju8vlbptskr0km20e94lj602rg7b2hbjdjpbjii"
);

const mapping = new Sara.Mapping("144cdc28-9126-4f59-b32b-307b2ae43fb3");

//TODO: set mapId
let mapId = "map_name";
let runningType: Type | undefined = undefined;

const log = (message: string) => {
  document.getElementById("logs")!.innerHTML = message;
};

const onStart = async () => {
  runningType = Type.START;
  console.log("Command: Start");
  log("Start command sent to Robot");
  return await mapping
    .start()
    .then((response) => {
      console.log("Finished start command", response);
      setTimeout(() => {
        document.getElementById("mapping-video")!.style.display = "block";
        log(
          "Robot finished start mapping. Now you can teleop robot and stop mapping when you want."
        );
      }, 5000);
    })
    .catch((error) => {
      console.error(error);
      log("Error on start mapping. Check console for more details.");
    })
    .finally(() => {
      runningType = undefined;
    });
};

const onStop = async () => {
  runningType = Type.STOP;
  return await mapping
    .stop(mapId)
    .then((response) => {
      console.log("Finished stop command", response);
      document.getElementById("mapping-video")!.style.display = "none";
      log(
        "Robot finished stop mapping. Now you can teleop robot and stop mapping when you want."
      );
    })
    .catch((error) => {
      console.error("Error on stop", error);
      log("Error on stop mapping. Check console for more details.");
    })
    .finally(() => {
      runningType = undefined;
    });
};

const onSwap = async () => {
  runningType = Type.SWAP;
  return await mapping
    .swap(mapId)
    .then((response) => {
      console.log("Finished swap command", response);
    })
    .catch((error) => {
      console.error(error);
      log("Error on swap mapping. Check console for more details.");
    })
    .finally(() => {
      runningType = undefined;
    });
};

const onCancel = async () => {
  console.log(runningType);
  if (runningType !== undefined)
    return await mapping
      .cancel(runningType)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  else {
    log("You can't cancel a command if there is no command running.");
    console.log("You can't cancel a command if there is no command running.");
  }
};

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <h1>Sara Mapping Demo</h1>
  <div>
    <div id="map-menu" style="display: none">
      <button id="start">Start</button>
      <button id="stop">Stop</button>
      <button id="cancel">Cancel</button>
      <button id="swap">Swap</button>
    </div>
    <div id="logs" style="margin: 2rem;">
      Connecting to Robot via SARA...
    </div>
    <video
      id="mapping-video"
      autoplay="true"
      muted="false"
      class="remote-video"
      style="display: none"
    ></video>
  </div>
`;

document.querySelector<HTMLButtonElement>("#start")!.onclick = onStart;
document.querySelector<HTMLButtonElement>("#stop")!.onclick = onStop;
document.querySelector<HTMLButtonElement>("#swap")!.onclick = onSwap;
document.querySelector<HTMLButtonElement>("#cancel")!.onclick = onCancel;

mapping.image(
  (resolve: RTCTrackEvent) => {
    log("Web Terminal connected to robot.");
    document.getElementById("map-menu")!.style.display = "block";
    document.getElementById("mapping-video")!.srcObject = resolve.streams[0];
  },
  (error: any) => {
    console.error("error: ", error);
  }
);
