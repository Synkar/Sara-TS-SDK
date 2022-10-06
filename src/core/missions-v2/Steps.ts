import { Client } from "../..";
import { ISession, Session } from "../../models/Session";
import { getAll, get, post, patch, remove } from "../../utils/rest";
import { StepsRetrieve, StepsCreate, StepsUpdate } from "./models/Steps.models";

export namespace Sara {
  export namespace Missions {
    export class Steps {
      private resource: string = "missions/steps";
      session: Session;

      constructor(session?: ISession) {
        if (session) {
          this.session = new Session(session!);
        } else {
          this.session = Client.session;
        }
      }

      list = async (filters?: any): Promise<any> => {
        return await getAll(this.resource, filters, this.session, "v2");
      };
      retrieve = async (id: string, filters?: any): Promise<StepsRetrieve> => {
        return await get(this.resource, id, filters, this.session, "v2");
      };
      update = async (
        id: string,
        payload: StepsUpdate
      ): Promise<StepsRetrieve> => {
        return await patch(this.resource, id, payload, this.session, "v2");
      };
      create = async (payload: StepsCreate): Promise<StepsRetrieve> => {
        return await post(this.resource, payload, this.session, "v2");
      };
      remove = async (id: string): Promise<any> => {
        return await remove(this.resource, id, this.session, "v2");
      };
    }
  }
}
