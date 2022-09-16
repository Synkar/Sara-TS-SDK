import { ISession, authSession, authToken, Session } from "./models/Session";

export const sdk = {
  API_URL: "https://sara.synkar.com",
  AUTH_URL: "https://auth.sara.synkar.com/oauth2/token",
  version: "1.0.0",
  timeout: 15000,
  DEFAULT_SESSION: {
    access_key: "",
    secret_key: "",
    access_token: "",
    scope: "",
    attemps: 0,
  },
};

export const auth = async (
  access_key: string,
  secret_key: string,
  scope: string = "",
  session: Session = null
) => {
  return await authToken(access_key, secret_key, scope, session);
};

export default sdk;
