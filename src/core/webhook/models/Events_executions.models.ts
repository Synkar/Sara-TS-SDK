export declare type EventsExecutionType = {
  eventId: EventUuid;
  topic: string;
  statusCode: number;
  robot: RobotUuid;
  response: string;
  createdAt: Date | string;
  id: string;
  endpoint: EndpointUuid;
};

export declare type EventUuid = string;
export declare type EndpointUuid = string;
export declare type RobotUuid = string;

export declare type EventsExecutionsList = EventsExecutionType[];
