import "./style.css";

import { Sara, Client as SaraClient } from "sara-sdk-ts";

import { Type } from "sara-sdk-ts/src/core/mapping/";

await SaraClient.auth(
  "7d44jm8d8cc8m5fs5c7sjjcdrk",
  "102i4ad0g87ubju8vlbptskr0km20e94lj602rg7b2hbjdjpbjii"
);

const mapping = new Sara.Mapping("eebed4ca-fa3f-41a6-b826-3285c62762da");

/**

mapping.image(function() {
  // TODO: when map image received from robot
}, function() {
  // TODO: when map image finished/closed from robot
})
*/

//TODO: set mapId
let mapId = "";
let runningType: Type | null = Type.START;

const onStart = async () => {
  runningType = Type.START;
  return await mapping
    .start()
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      runningType = null;
    });
};

const onStop = async () => {
  runningType = Type.STOP;
  return await mapping
    .stop(mapId)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      runningType = null;
    });
};

const onSwap = async () => {
  runningType = Type.SWAP;
  return await mapping
    .swap(mapId)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      runningType = null;
    });
};

const onCancel = async () => {
  if (runningType != null) {
    return await mapping
      .cancel(runningType)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

/*
mapping.finish().then((response) => {
 // resolve
});

const iam = Sara.iam({ session: session });

iam.robots.list().then((response: PaginatedModel<Robot>) => {
});*/

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <h1>Sara Mapping Demo</h1>
  <div>
    <button id="start">Start</button>
    <button id="stop">Stop</button>
    <button id="swap">Swap</button>
    <button id="cancel">Cancel</button>
    <video
      id="mapping-video"
      autoplay="true"
      muted="false"
      class="remote-video"
    ></video>
  </div>
`;

document.querySelector<HTMLButtonElement>("#start")!.onclick = onStart;
document.querySelector<HTMLButtonElement>("#stop")!.onclick = onStop;
document.querySelector<HTMLButtonElement>("#swap")!.onclick = onSwap;
document.querySelector<HTMLButtonElement>("#cancel")!.onclick = onCancel;

mapping.image(
  (resolve: RTCTrackEvent) => {
    console.log(resolve);
    document.getElementById("mapping-video")!.srcObject = resolve.streams[0];
  },
  (error: any) => {
    console.error(error);
  }
);
