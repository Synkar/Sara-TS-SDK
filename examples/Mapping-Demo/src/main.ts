import "./style.css";

// Importing the SDK and the clientSDK
import { Sara } from "sara-sdk-ts";

import { Type } from "sara-sdk-ts/src/core/mapping/";
const access_key = import.meta.env.VITE_SARA_ACCESS_KEY;
const secret_key = import.meta.env.VITE_SARA_SECRET_KEY;
const robot_id = import.meta.env.VITE_SARA_ROBOT_ID;

/*
  Calling the SaraClient auth function to authenticate the user and get the token.
*/
await Sara.auth(access_key, secret_key);

// Creating a new Sara Mapping instance and passing a robotId
const mapping = new Sara.Mapping(robot_id);

// Defining the mapId variable and runningType variable
const mapId = "map_name";
let runningType: Type | undefined = undefined;

// Defining the log function to log the messages on the screen
const log = (message: string) => {
  const logs = document.getElementById("logs");
  if (logs) logs.innerHTML = message;
};

// Defining the start button function to start the mapping process.
const onStart = async () => {
  runningType = Type.START;
  console.log("Command: Start");
  log("Start command sent to Robot");
  return await mapping
    .start()
    .then((response) => {
      console.log("Finished start command", response);
      setTimeout(() => {
        const mapping_video = document.getElementById("mapping-video");
        if (mapping_video) mapping_video.style.display = "block";
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

// Defining the stop button function to stop the mapping process.
const onStop = async () => {
  runningType = Type.STOP;
  return await mapping
    .stop(mapId)
    .then((response) => {
      console.log("Finished stop command", response);
      const mapping_video = document.getElementById("mapping-video");
      if (mapping_video) mapping_video.style.display = "none";
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

// Defining the swap button function to swap to other map.
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

// Defining the cancel button function to cancel the current mapping process.
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

// Add the elements to the DOM
const app = document.querySelector<HTMLDivElement>("#app");
if (app) {
  app.innerHTML = `
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
}

// Setting the event listeners for the buttons
const start = <HTMLButtonElement>document.getElementById("start");
if (start) start.addEventListener("click", onStart);
const stop = <HTMLButtonElement>document.getElementById("stop");
if (stop) stop.addEventListener("click", onStop);
const cancel = <HTMLButtonElement>document.getElementById("cancel");
if (cancel) cancel.addEventListener("click", onCancel);
const swap = <HTMLButtonElement>document.getElementById("swap");
if (swap) swap.addEventListener("click", onSwap);

/*
  Connecting to the robot and getting the video stream from the robot
  and setting on the video element.
*/
mapping.image(
  (resolve: RTCTrackEvent) => {
    log("Web Terminal connected to robot.");
    const map_menu = document.getElementById("map-menu");
    if (map_menu) map_menu.style.display = "block";
    const video = <HTMLVideoElement>document.getElementById("mapping-video");
    if (video) video.srcObject = resolve.streams[0];
  },
  (error: Error) => {
    console.error("error: ", error);
  }
);
