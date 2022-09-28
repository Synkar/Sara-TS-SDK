import * as dotenv from "dotenv";

dotenv.config();

import { ISession, authenticate, Session } from "./models/Session";

export * from "./core";

/**
 * Define some constants to the sdk.
 */
export const sdk = {
  API_URL: "https://sara.synkar.com",
  AUTH_URL: "https://auth.sara.synkar.com/oauth2/token",
  version: "1.0.0",
  timeout: 15000,
};

/**
 * Client Class to manage the session.
 */
export class Client {
  static session: Session;

  /**
   * Authenticate the client.
   *
   * @param access_key - The access key to authenticate.
   * @param secret_key - The secret key to authenticate.
   * @param scope - The scope to authenticate.
   * @returns A Session authenticated.
   */
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
