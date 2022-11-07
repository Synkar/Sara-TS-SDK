import { Client } from "../..";
import { PaginatedModel } from "../../models/PaginatedModel";
import { ISession, Session } from "../../models/Session";
import { getAll, get, post, patch, remove } from "../../utils/rest";
import {
  BucketsRetrieve,
  BucketsList,
  BucketsCreate,
  BucketsUpdate,
  BucketsListFilters,
} from "./models/Buckets.models";

export class Buckets {
  static resource = "srs/buckets";
  private lookup?: string;
  session: Session;

  constructor(lookup?: string, session?: ISession) {
    this.lookup = lookup;
    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  list = async (
    filters?: BucketsListFilters
  ): Promise<PaginatedModel<BucketsList>> => {
    return await Buckets.list(filters, this.session);
  };
  retrieve = async (id: string): Promise<BucketsRetrieve> => {
    return await get(Buckets.resource, id, null, this.session, "v1");
  };
  update = async (
    id: string,
    payload: BucketsUpdate
  ): Promise<BucketsRetrieve> => {
    return await patch(Buckets.resource, id, payload, this.session, "v1");
  };
  create = async (payload: BucketsCreate): Promise<BucketsRetrieve> => {
    return await post(Buckets.resource, payload, this.session, "v1");
  };
  remove = async (id: string): Promise<boolean> => {
    return await remove(Buckets.resource, id, this.session, "v1");
  };

  static list = async (
    filters?: BucketsListFilters,
    session?: Session
  ): Promise<PaginatedModel<BucketsList>> => {
    if (!session) {
      session = Client.session;
    }
    return await getAll(Buckets.resource, filters, session, "v1");
  };
}
