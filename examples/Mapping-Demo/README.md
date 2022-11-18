# How to use

First clone SARA Typescript SDK

> `git clone https://github.com/Synkar/Sara-TS-SDK.git`

After install and build typescript

> `cd Sara-TS-SDK`

> `npm install`

> `npm run build`

In Mapping-Demo over examples directory install dependencies

> `cd examples/Mapping-Demo`

> `npm install`

Change VITE envs in .env file.

 - _VITE_SARA_ACCESS_KEY_: represents ACCESS KEY from apps collected in your profile account at IAM console.
 - _VITE_SARA_SECRET_KEY_: represents SECRET KEY from apps collected in you profile account at IAM console.
 - _VITE_SARA_ROBOT_ID_: Id (uuid) of robot that you want to connect

> Obs: use .env.example as example of .env file

Then you can run project with:

> `npm run dev`
