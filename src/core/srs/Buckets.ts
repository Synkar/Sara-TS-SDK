import { Client } from "../..";
import { PaginatedModel } from "../../models/PaginatedModel";
import { ISession, Session } from "../../models/Session";
import {
  getAll,
  get,
  post,
  patch,
  remove,
  download,
  upload,
  downloadLink,
} from "../../utils/rest";
import {
  BucketsRetrieve,
  BucketsList,
  BucketsCreate,
  BucketsUpdate,
  BucketsListFilters,
  BucketDownload,
} from "./models/Buckets.models";

import { Activities as _Activities } from "./Activities";
import { Relationships as _Relationships } from "./Relationships";

export * from "./models/Buckets.models";
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
    return await get(Buckets.resource, id, null, this.session);
  };
  update = async (
    id: string,
    payload: BucketsUpdate
  ): Promise<BucketsRetrieve> => {
    return await patch(Buckets.resource, id, payload, this.session);
  };
  create = async (payload: BucketsCreate): Promise<BucketsRetrieve> => {
    return await post(Buckets.resource, payload, this.session);
  };
  remove = async (id: string): Promise<boolean> => {
    return await remove(Buckets.resource, id, {}, this.session);
  };

  download = async (uuid: string, key: string): Promise<BucketDownload> => {
    return await download(Buckets.resource, { uuid, key }, this.session);
  };

  downloadLink = async (uuid: string, key: string): Promise<BucketDownload> => {
    return await downloadLink(Buckets.resource, { uuid, key }, this.session);
  };

  upload = async (
    uuid: string,
    file: File,
    fileName: string,
    progressCallback?: (progress: number) => void
  ): Promise<any> => {
    return await upload(
      Buckets.resource,
      { uuid, file, fileName, progressCallback },
      this.session
    );
  };

  static list = async (
    filters?: BucketsListFilters,
    session?: Session
  ): Promise<PaginatedModel<BucketsList>> => {
    if (!session) {
      session = Client.session;
    }
    return await getAll(Buckets.resource, filters, session);
  };

  Activities = function (lookup?: string, session?: ISession) {
    return new _Activities(lookup, session);
  } as any as { new (lookup?: string, session?: ISession): any };

  Relationships = function (lookup?: string, session?: ISession) {
    return new _Relationships(lookup, session);
  } as any as { new (lookup?: string, session?: ISession): any };

  static Activities = _Activities;
  static Relationships = _Relationships;
}
