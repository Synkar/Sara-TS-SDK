import axios, { AxiosResponse } from "axios";
import { sdk } from "..";

export interface ISession {
  access_key: string;
  secret_key: string;
  access_token: string;
  scope: string;
  attemps: number;
  expires_in?: number;
}

export const agent = `Typescript-Sara-SDK-${sdk.version}`;

export const authToken = async (
  access_key: string,
  secret_key: string,
  scope: string = "",
  session: Session = null
) => {
  const auth_url = `${sdk.AUTH_URL}?client_id=${access_key}`;
  let body = {};
  if (scope !== undefined && scope !== "") {
    body = {
      grant_type: "client_credentials",
      scope: scope,
    };
  } else {
    body = {
      grant_type: "client_credentials",
    };
  }

  const auth = `${access_key}:${secret_key}`;

  const request: Promise<AxiosResponse> = axios
    .post(auth_url, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": agent,
        "Accept-Language": "en-US",
        Authorization: `Basic ${Buffer.from(auth).toString("base64")}`,
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

  return response.data;
};

export const authSession = async (session: Session) => {
  const auth_url = `${sdk.AUTH_URL}?client_id=${session.access_key}`;
  let body = {};
  if (session.scope !== undefined && session.scope !== "") {
    body = {
      grant_type: "client_credentials",
      scope: session.scope,
    };
  } else {
    body = {
      grant_type: "client_credentials",
    };
  }

  const auth = `${session.access_key}:${session.secret_key}`;

  const request: Promise<AxiosResponse> = axios
    .post(auth_url, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": agent,
        "Accept-Language": "en-US",
        Authorization: `Basic ${Buffer.from(auth).toString("base64")}`,
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

  return response.data;
};

export class Session implements ISession {
  access_key: string;
  secret_key: string;
  access_token: string;
  scope: string;
  attemps: number;
  expires_in?: number;

  constructor(session: ISession) {
    this.access_key = session.access_key;
    this.secret_key = session.secret_key;
    this.access_token = session.access_token;
    this.scope = session.scope;
    this.attemps = session.attemps;
    this.expires_in = session.expires_in;
  }

  async auth() {
    const response = await authSession(this);
    this.access_token = response.access_token;
    this.expires_in = response.expires_in;
    return response;
  }
}
