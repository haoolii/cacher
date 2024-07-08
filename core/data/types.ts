export const Prefix = "CACHER";

export interface Storable {
  id: string;
}

export enum StorageEnum {
  WORK = `${Prefix}_WORK`,
  REVIEW_RECORD = `${Prefix}_REVIEW_RECORD`,
  REVIEW_CONFIG = `${Prefix}_REVIEW_CONFIG`,
}

export interface Work extends Storable {
  id: string; // uuid
  work: string; // work
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewRecord extends Storable {
  id: string; // uuid
  workId: string; // reference to work
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface FulFillRecord extends Storable {
  id: string; // uuid
  workId: string; // reference to work
  date: string;
  createdAt: string;
  updatedAt: string;
}
export interface ReviewConfig extends Storable {
  id: string; // uuid
  duration: number;
  createdAt: string;
  updatedAt: string;
}

// Feature Level
export interface CreateWorkPayload {
  work: string;
  date: string;
}

export interface UpdateWorkPayload {
  id: string;
  work: string;
  date: string;
}

// FulfillRecord
export interface CreateFulFillPayload {
  workId: string;
  date: string;
}

export interface UpdateFulFillPayload {
  id: string;
  workId: string;
  date: string;
}

// reviewConfig
export interface CreateReviewConfigPayload {
  duration: number;
}

export interface UpdateReviewConfigPayload {
  id: string;
  duration: number;
}
