import { AxiosError, AxiosInstance } from "axios";
import { Client, sdk } from "..";
import { ResponseModel } from "../models/ResponseModel";
import { agent, Session } from "../models/Session";
import { handleExceptions } from "../models/Exceptions";

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
 * @throws handleExceptions
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
export const fetch = async <T>(
  method:
    | AxiosInstance["post"]
    | AxiosInstance["get"]
    | AxiosInstance["patch"]
    | AxiosInstance["put"]
    | AxiosInstance["delete"],
  path: string,
  payload: T = null,
  query: string | null = null,
  session: Session = null,
  version = "v1"
) => {
  let url = `${sdk.API_URL}/${version}/`;
  if (query !== "" && query !== null) {
    url += `${path}/?${query}`;
  } else {
    url += `${path}/`;
  }

  if (session) {
    session = new Session(session);
    if (!session.access_token) await session.refreshToken();
  } else {
    session = Client.session;
  }

  const accessTime = new Date().getTime();

  if (accessTime >= session.expires_in) session.refreshToken();

  const bearerToken = `Bearer ${session.access_token}`;

  console.log(payload);

  try {
    let request;
    if (payload) {
      let data = new FormData();

      for (let key in payload) {
        if (typeof payload[key] === "object") {
          data.append(key, JSON.stringify(payload[key]));
        } else {
          data.append(key, String(payload[key]));
        }
      }

      request = method(url, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": agent,
          "Accept-Language": "en-US",
          Authorization: bearerToken,
        },
        timeout: sdk.timeout,
      });
    } else {
      request = method(url, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": agent,
          "Accept-Language": "en-US",
          Authorization: bearerToken,
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
