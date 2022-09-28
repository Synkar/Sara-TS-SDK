import * as dotenv from "dotenv";

dotenv.config();

import { ISession, authenticate, Session } from "./models/Session";

export * from "./core";

export const sdk = {
  API_URL: "https://sara.synkar.com",
  AUTH_URL: "https://auth.sara.synkar.com/oauth2/token",
  version: "1.0.0",
  timeout: 15000,
};

export class Client {
  static session: Session;

  static auth = async (
    access_key: string,
    secret_key: string,
    scope: string = ""
  ) => {
    const session = await authenticate({
      access_key,
      secret_key,
      scope,
      attemps: 0,
    });

    Client.session = session;

    return session;
  };
}
