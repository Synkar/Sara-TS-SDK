export declare type LandmarkType = {
  uuid: string;
  name: string;
  description: string;
  tag: number;
  floor: number;
  mapId: string;
  extraFields: { [key: string]: string | number | boolean };
  pose: { [key: string]: string | number | boolean };
};

export declare type LandmarkRetrieve = LandmarkType;

export declare type LandmarkCreate = Partial<LandmarkType> & {
  name: string;
  tag: number;
  floor: number;
  mapId: string;
};

export declare type LandmarkUpdate = Partial<LandmarkType>;
