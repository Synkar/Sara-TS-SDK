import axios, { AxiosError, AxiosInstance } from "axios";
import { Client, sdk } from "..";
import { ResponseModel } from "../models/ResponseModel";
import { agent, Session } from "../models/Session";
import { handleExceptions } from "../models/Exceptions";
import { JSONValue } from "../models/JSON";

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

declare type configType = {
  [key: string]: JSONValue;
};

export declare type payloadUpload = {
  uuid: string;
  file: File;
  fileName: string;
  progressCallback: (progress: number) => void;
};

export declare type payloadDownload = {
  uuid: string;
  key: string;
};

export const fileUpload = async (
  path: string,
  config: configType,
  payload: payloadUpload,
  session: Session = null,
  version = "v1"
) => {
  let url = `${sdk.API_URL}/${version}/${path}/${payload.uuid}/upload/?key=${payload.fileName}`;

  if (session) {
    session = new Session(session);
    if (!session.access_token) await session.refreshToken();
  } else {
    session = Client.session;
  }

  const accessTime = new Date().getTime();

  if (accessTime >= session.expires_in) session.refreshToken();

  const bearerToken = `Bearer ${session.access_token}`;

  config = {
    ...config,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": agent,
      "Accept-Language": "en-US",
      Authorization: bearerToken,
    },
    timeout: sdk.timeout,
  };

  try {
    const request = axios.post(url, payload.file, config);
    const result = await request;
    if (result) {
      let formData = new FormData();

      Object.keys(result.data.fields).forEach((key) => {
        formData.append(key, result.data.fields[key]);
      });

      formData.set("file", payload.file);

      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          this.status === 204 ? resolve(true) : reject(this.responseText);
        };
        if (payload.progressCallback) {
          xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
              payload.progressCallback((e.loaded / e.total) * 100);
            }
          };
        }
        xhr.open("POST", result.data.url, true);
        xhr.send(formData);
      });
    }
  } catch (e) {
    const error: AxiosError = e;
    const errorHandled = handleExceptions(error);
    return errorHandled;
  }
};

export const fileDownload = async (
  path: string,
  config: configType,
  payload: payloadDownload,
  download: boolean = false,
  session: Session = null,
  version = "v1"
) => {
  let url = `${sdk.API_URL}/${version}/${path}/${payload.uuid}/download/?key=${payload.key}`;

  if (session) {
    session = new Session(session);
    if (!session.access_token) await session.refreshToken();
  } else {
    session = Client.session;
  }

  const accessTime = new Date().getTime();

  if (accessTime >= session.expires_in) session.refreshToken();

  const bearerToken = `Bearer ${session.access_token}`;

  config = {
    ...config,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": agent,
      "Accept-Language": "en-US",
      Authorization: bearerToken,
    },
    timeout: sdk.timeout,
  };

  try {
    const request = axios.get(url, config);
    const result = await request;
    if (result) {
      if (download) {
        const url = window.URL.createObjectURL(new Blob([result.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", payload.key);
        document.body.appendChild(link);
        link.click();
        return new ResponseModel(result.status, result.data);
      } else {
        return new ResponseModel(result.status, result.data);
      }
    }
  } catch (e) {
    const error: AxiosError = e;
    const errorHandled = handleExceptions(error);
    return errorHandled;
  }
};
