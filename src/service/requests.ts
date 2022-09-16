import { AxiosInstance } from "axios";
import sdk from "..";
import { agent, Session } from "../models/Session";

export const fetch = async (
  method: AxiosInstance,
  path: String,
  payload: any = null,
  query: string = "",
  session: Session = null,
  version: String = "v1"
) => {
  let url = `${sdk.API_URL}/${version}/`;
  if (query !== "") {
    url += `${path}/?${query}`;
  } else {
    url += `${path}/`;
  }

  if (session !== null) {
    session = new Session(sdk.DEFAULT_SESSION);
  }

  const access_time = new Date().getTime();

  if (access_time >= session.expires_in) session.auth();

  const bearer_token = `Bearer ${session.access_token}`;

  const request = method({
    url,
    data: payload,
    headers: {
      "Access-Time": access_time,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": agent,
      "Accept-Language": "en-US",
      Authorization: bearer_token,
    },
    timeout: sdk.timeout,
  });

  // TODO: handle errors (not implemented)

  // TODO: use responseHandler (need to be implemented)

  return await request;
};
