import { Session } from "../models/Session";
import { fetch } from "../service/requests";
import axios from "axios";
import { FiltersListTypeAll } from "../models/Filters";
import { JSONValue } from "../models/JSON";

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
  return json.data;
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
  return json.data;
};

export const post = async (
  resource: string,
  payload: JSONValue,
  session?: Session,
  version?: string
) => {
  const path = `${resource}`;
  const json = await fetch(axios.post, path, payload, null, session, version);
  return json.data;
};

export const patch = async (
  resource: string,
  id: string,
  payload: JSONValue,
  session?: Session,
  version?: string
) => {
  const path = `${resource}/${id}`;
  const json = await fetch(axios.patch, path, payload, null, session, version);
  return json.data;
};

export const remove = async (
  resource: string,
  id: string,
  session?: Session,
  version?: string
) => {
  const path = `${resource}/${id}`;
  const json = await fetch(axios.delete, path, null, null, session, version);
  return json.data;
};

export const put = async (
  resource: string,
  id: string,
  payload: JSONValue,
  session?: Session,
  version?: string
) => {
  const path = `${resource}/${id}`;
  const json = await fetch(axios.put, path, payload, null, session, version);
  return json.data;
};
