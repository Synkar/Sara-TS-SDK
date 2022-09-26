import axios, { AxiosResponse } from "axios";
import { Client, sdk } from "../";

export interface ISession {
  access_key: string;
  secret_key: string;
  access_token?: string;
  scope?: string;
  attemps?: number;
  expires_in?: number;
  token_type?: string;
}

export const agent = `Typescript-Sara-SDK`;

export const authenticate = async (session: ISession) => {
  const auth_url = `${sdk.AUTH_URL}?client_id=${session.access_key}`;
  const body = `grant_type=client_credentials&scope=${session.scope}`;

  const auth = `${session.access_key}:${session.secret_key}`;

  const request: Promise<AxiosResponse> = axios
    .post(auth_url, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": agent,
        "Accept-Language": "en-US",
        Authorization: `Basic ${btoa(auth)}`,
      },
      timeout: sdk.timeout,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // TODO: Handle error (not implemented)
      return error;
    });

  // TODO: use responseHandler (need to be implemented)
  const response = await request;

  // TODO: set session (not implemented)

  return new Session({ ...session, ...response.data });
};

export class Session implements ISession {
  access_key: string;
  secret_key: string;
  access_token?: string;
  scope?: string = "";
  attemps?: number = 0;
  expires_in?: number;
  token_type?: string;

  constructor(session: ISession) {
    this.access_key = session.access_key;
    this.secret_key = session.secret_key;
    this.access_token = session.access_token;
    this.scope = session.scope;
    this.attemps = session.attemps;
    this.expires_in = session.expires_in;
    this.token_type = session.token_type;
  }

  async refreshToken() {
    const response = await authenticate(this);
    this.access_token = response.access_token;
    this.expires_in = response.expires_in;
    return response;
  }
}
