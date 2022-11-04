import { Client } from "../..";
import { FiltersListType } from "../../models/Filters";
import { Session, ISession } from "../../models/Session";
import { getAll, post, get, patch, remove } from "../../utils/rest";
import { AppsRetrieve, AppsCreate, AppsUpdate } from "./models/Apps.models";

export class Apps {
  private resource = "iam/apps";
  session: Session;

  constructor(session?: ISession) {
    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  list = async (filters?: FiltersListType): Promise<AppsRetrieve[]> => {
    if (!filters) filters = {};
    return await getAll(this.resource, filters, this.session);
  };

  create = async (data: AppsCreate): Promise<AppsRetrieve> => {
    return await post(this.resource, data, this.session);
  };

  retrieve = async (id: string): Promise<AppsRetrieve> => {
    return await get(this.resource, id, null, this.session);
  };

  update = async (id: string, data: AppsUpdate): Promise<AppsRetrieve> => {
    return await patch(this.resource, id, data, this.session);
  };

  delete = async (id: string): Promise<void> => {
    return await remove(this.resource, id, null, this.session);
  };
}
