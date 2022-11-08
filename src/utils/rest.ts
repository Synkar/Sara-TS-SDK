import { Session } from "../models/Session";
import { fetch } from "../service/requests";
import axios from "axios";
import { FiltersListTypeAll } from "../models/Filters";
import { ResponseModel } from "../models/ResponseModel";

export const get = async (
  resource: string,
  id: string,
  filters?: FiltersListTypeAll,
  session?: Session,
  version?: string
) => {
  const path = `${resource}/${id}`;
  let query = "";
  if (filters) {
    query = new URLSearchParams(filters).toString();
  }
  const json = await fetch(axios.get, path, null, query, session, version);
  return handleData(json);
};

export const getAll = async (
  resource: string,
  filters?: FiltersListTypeAll,
  session?: Session,
  version?: string
) => {
  const path = `${resource}`;
  let query = "";
  if (filters) {
    query = new URLSearchParams(filters).toString();
  }
  const json = await fetch(axios.get, path, null, query, session, version);
  return handleData(json);
};

export const post = async <T>(
  resource: string,
  payload: T,
  session?: Session,
  version?: string
) => {
  const path = `${resource}`;
  const json = await fetch(axios.post, path, payload, null, session, version);
  return handleData(json);
};

export const patch = async <T>(
  resource: string,
  id: string,
  payload: T,
  session?: Session,
  version?: string
) => {
  const path = `${resource}/${id}`;
  const json = await fetch(axios.patch, path, payload, null, session, version);
  return handleData(json);
};

export const remove = async <T>(
  resource: string,
  id?: string,
  payload?: T,
  session?: Session,
  version?: string
) => {
  const path = `${resource}/${id ? id : ""}`;
  const json = await fetch(axios.delete, path, payload, null, session, version);
  return handleData(json);
};

export const put = async <T>(
  resource: string,
  id: string,
  payload: T,
  session?: Session,
  version?: string
) => {
  const path = `${resource}/${id}`;
  const json = await fetch(axios.put, path, payload, null, session, version);
  return handleData(json);
};

const handleData = <T>(result: ResponseModel<T>): boolean | T => {
  console.log(result);
  if (result) {
    if (result.data) return result.data;
    else {
      if (result.status >= 200 && result.status < 300) {
        return true;
      } else return false;
    }
  } else {
    return false;
  }
};
