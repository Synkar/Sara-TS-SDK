import { AxiosError } from "axios";
import { Client, sdk } from "..";
import { ResponseModel } from "../models/ResponseModel";
import { agent, Session } from "../models/Session";
import { handleExceptions, UnknownErrorException } from "../models/Exceptions";

/**
 * This is a helper function to make requests to the API.
 *
 * @param method - The Axios function to use on the request.
 * @param path - The path to make the request to.
 * @param payload - The data to send on the request.
 * @param query - The query to send on the request.
 * @param session - The session to use on the request.
 * @param version - The version of the API to use.
 *
 * @returns A ResponseModel with the response from the API or an exception.
 *
 * @throws UnknownErrorException
 *
 * @example
 *
 * import axios from "axios";
 *
 * const response = await request(
 *  axios.get,
 *  "iam/users"
 * );
 */
export const fetch = async (
  method: any,
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

  if (session) {
    session = new Session(session!);
    if (!session.access_token) await session.refreshToken();
  } else {
    session = Client.session;
  }

  const access_time = new Date().getTime();

  if (access_time >= session.expires_in) session.refreshToken();

  const bearer_token = `Bearer ${session.access_token}`;

  console.log(url);
  try {
    let request;
    if (payload) {
      request = method(url, payload, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": agent,
          "Accept-Language": "en-US",
          Authorization: bearer_token,
        },
        timeout: sdk.timeout,
      });
    } else {
      request = method(url, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": agent,
          "Accept-Language": "en-US",
          Authorization: bearer_token,
        },
        timeout: sdk.timeout,
      });
    }

    const result = await request;
    if (result) {
      return new ResponseModel(result.status, result.data);
    }
  } catch (e) {
    const error: AxiosError = e;
    const errorHandled = handleExceptions(error);
    return errorHandled;
  }
};
