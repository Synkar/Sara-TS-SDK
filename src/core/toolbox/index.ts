import { Client } from "../..";
import { ISession, Session } from "../../models/Session";

import { Tools as _Tools } from "./Tools";
import { Groups as _Groups } from "./Groups";
import { InstanceTools as _InstanceTools } from "./InstanceTools";
import { ParamType as _ParamType } from "./models/Tools.models";
import { Status as _Status } from "./models/Executions.models";

export class Toolbox {
  private resource = "toolbox";
  session: Session;

  constructor(session?: ISession) {
    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  Tools = function (lookup?: string, session?: ISession) {
    return new _Tools(lookup, session);
  } as any as { new (lookup?: string, session?: ISession): _Tools };

  Groups = function (lookup?: string, session?: ISession) {
    return new _Groups(lookup, session);
  } as any as { new (lookup?: string, session?: ISession): _Groups };

  InstanceTools = function (lookup?: string, session?: ISession) {
    return new _InstanceTools(lookup, session, this.parent?.lookup);
  } as any as { new (looup?: string, session?: ISession): _InstanceTools };

  static Tools = _Tools;
  static Groups = _Groups;
  static InstanceTools = _InstanceTools;
  static ParamType = _ParamType;
  static Status = _Status;
}
