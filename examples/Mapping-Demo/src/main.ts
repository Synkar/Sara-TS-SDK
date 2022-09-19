import "./style.css";

import { Sara, Client as SaraClient } from "sara-sdk-ts";

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
mapping
  .start()
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });

/*
mapping.finish().then((response) => {
 // resolve
});

const iam = Sara.iam({ session: session });

iam.robots.list().then((response: PaginatedModel<Robot>) => {
});*/

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <video
      id="mapping-video"
      autoplay="true"
      muted="false"
      class="remote-video"
    ></video>
  </div>
`;

mapping.image(
  (resolve: RTCTrackEvent) => {
    console.log(resolve);
    document.getElementById("mapping-video")!.srcObject = resolve.streams[0];
  },
  (error: any) => {
    console.error(error);
  }
);
