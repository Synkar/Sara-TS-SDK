import { authenticate, Session } from "./models/Session";

import { Missions as _Missions, Mapping as _Mapping } from "./core";

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
 * _Client Class to manage the session.
 */
class _Client {
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

    _Client.session = session;

    return session;
  };
}

export namespace Sara {
  export const Missions = _Missions;
  export const Mapping = _Mapping;
  export const auth = _Client.auth;
}
export const Client = _Client;
