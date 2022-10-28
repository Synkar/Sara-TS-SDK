# SARA Typescript SDK
> SDK developed by Synkar to use SARA APIs.

## Table of Contents
- [SARA Typescript SDK](#sara-typescript-sdk)
	- [Table of Contents](#table-of-contents)
	- [General Information](#general-information)
	- [Features](#features)
	- [Setup](#setup)
	- [Usage](#usage)
	- [Project Status](#project-status)
	- [Next Improvement](#next-improvement)
	- [Contact](#contact)
<!-- * [License](#license) -->


## General Information
- Access SARA APIs in typescript/javascript project.
- Allow users and clients create its own project that communicate with SARA APIs in a easily way.
- Better understanding of SARA resources
- Uxception handling
<!-- You don't have to answer all the questions - just the ones relevant to your project. -->


## Features
List the ready features here:
- Mapping
- Demo


## Setup
SARA Typescript SDK can be installed via npm.

> `npm install sara-ts-sdk`

Or you can install in your package by adding:
> `npm install https://github.com/Synkar/SARA-TS-SDK`


## Usage
For usage is simple. You will need to import sara-ts-sdk in you JS/TS project.

> `import { Sara, Client as SaraClient } from "sara-sdk-ts";`

Second you authenticate with you ACCESS_KEY and SECRET_KEY:

> `await SaraClient.auth(access_key, secret_key);`

After authentication process complete you can use modules and resources like:

> `Sara.Iam.Users.Create({name: "John", email: "john@email.com"})`


## Project Status
Project is _in progress_.


## Next Improvement

New modules:
- SRS
- IAM
- Telemetry
- Teleop

To do:
- Unit testing
- E2E testing
- Syntatic exceptions


## Contact
Created by [@synkar](https://www.synkar.com/) - feel free to contact us!


<!-- Optional -->
<!-- ## License -->
<!-- This project is open source and available under the [... License](). -->

<!-- You don't have to include all sections - just the one's relevant to your project -->
