import { AxiosError, AxiosInstance } from "axios";
import { Client, sdk } from "..";
import { ResponseModel } from "../models/ResponseModel";
import { agent, authenticate, Session } from "../models/Session";
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
  UnknownErrorException,
} from "../utils/Exceptions";

/*
 * This is a helper function to make requests to the API.
 */
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

  if (session) {
    session = new Session(session!);
    if (!session.access_token) await session.refreshToken();
  } else {
    session = Client.session;
  }

  const access_time = new Date().getTime();

  if (access_time >= session.expires_in) session.refreshToken();

  const bearer_token = `Bearer ${session.access_token}`;

  try {
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

    const result = await request;
    if (result) {
      return new ResponseModel(result.status, result.data);
    }
    return new UnknownErrorException("Unknown error");
  } catch (e) {
    const error: AxiosError = e;
    if (error.response.status === 404) {
      return new NotFoundException(error.message);
    } else if (error.response.status === 401) {
      return new UnauthorizedException(error.message);
    } else if (error.response.status === 403) {
      return new ForbiddenException(error.message);
    } else if (error.response.status === 400) {
      return new BadRequestException(error.message);
    } else if (error.response.status === 500) {
      return new UnknownErrorException(error.message);
    } else {
      return new UnknownErrorException(error.message);
    }
  }
};
