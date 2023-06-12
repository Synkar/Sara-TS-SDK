export declare type LocalityType = {
  slug: string;
  robotCapacity: number;
  timestamps: number[][];
  landmarks: number[];
  depotLandmark: number;
};

export declare type LocalityRetrieve = LocalityType;

export declare type LocalityCreate = Partial<LocalityType> & {
  slug: string;
};

export declare type LocalityUpdate = Partial<LocalityType>;
