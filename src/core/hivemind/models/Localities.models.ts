export declare type HLocalityType = {
  slug: string;
  robotCapacity: number;
  timestamps: number[][];
  landmarks: number[];
  depotLandmark: number;
};

export declare type HLocalityRetrieve = HLocalityType;

export declare type HLocalityCreate = Partial<HLocalityType> & {
  slug: string;
};

export declare type HLocalityUpdate = Partial<HLocalityType>;
