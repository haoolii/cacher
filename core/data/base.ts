import {
  workStorage,
  reviewConfigStorage,
  fulfillRecordStorage,
} from "./storage";
import { v4 as uuid } from "uuid";
import {
  CreateFulFillPayload,
  CreateReviewConfigPayload,
  CreateWorkPayload,
  FulFillRecord,
  ReviewConfig,
  UpdateFulFillPayload,
  UpdateReviewConfigPayload,
  UpdateWorkPayload,
  Work,
} from "./types";

// Work
export const getWorks = () => {
  return workStorage.getAllItems();
};

export const getWork = (id: string) => {
  return workStorage.getItemById(id);
};

export const createWork = (work: CreateWorkPayload) => {
  const timestamp = new Date().toISOString();
  const newWork = {
    id: uuid(),
    ...work,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  return workStorage.addItem(newWork);
};

export const updateWork = (work: UpdateWorkPayload) => {
  const existingWork = workStorage.getItemById(work.id);
  if (!existingWork) return;

  const updatedWork: Work = {
    ...existingWork,
    ...work,
    updatedAt: new Date().toISOString(),
  };
  return workStorage.updateItem(updatedWork);
};

export const deleteWork = (id: string) => {
  return workStorage.deleteItemById(id);
};

// FulfillRecord
export const getFulFillRecords = () => {
  return fulfillRecordStorage.getAllItems();
};

export const getFulFillRecord = (id: string) => {
  return fulfillRecordStorage.getItemById(id);
};

export const createFulFillRecord = (fulFillRecord: CreateFulFillPayload) => {
  const timestamp = new Date().toISOString();
  const newFulFillRecord = {
    id: uuid(),
    ...fulFillRecord,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  return fulfillRecordStorage.addItem(newFulFillRecord);
};

export const updateFulFill = (fulFillRecord: UpdateFulFillPayload) => {
  const existingFulFillRecord = fulfillRecordStorage.getItemById(
    fulFillRecord.id
  );
  if (!existingFulFillRecord) return;

  const updatedWork: FulFillRecord = {
    ...existingFulFillRecord,
    ...fulFillRecord,
    updatedAt: new Date().toISOString(),
  };
  return fulfillRecordStorage.updateItem(updatedWork);
};

export const deleteFulFill = (id: string) => {
  return fulfillRecordStorage.deleteItemById(id);
};

// Review Setting
export const getReviewConfigs = () => {
  return reviewConfigStorage.getAllItems();
};

export const getReviewSetting = (id: string) => {
  return reviewConfigStorage.getItemById(id);
};

export const createReviewSetting = (
  reviewConfig: CreateReviewConfigPayload
) => {
  const timestamp = new Date().toISOString();
  const newReviewConfig = {
    id: uuid(),
    ...reviewConfig,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  return reviewConfigStorage.addItem(newReviewConfig);
};

export const updateReviewSetting = (
  reviewConfig: UpdateReviewConfigPayload
) => {
  const existingReviewConfig = reviewConfigStorage.getItemById(reviewConfig.id);
  if (!existingReviewConfig) return;

  const updatedReviewConfig: ReviewConfig = {
    ...existingReviewConfig,
    ...reviewConfig,
    updatedAt: new Date().toISOString(),
  };
  return reviewConfigStorage.updateItem(updatedReviewConfig);
};

export const deleteReviewSetting = (id: string) => {
  return reviewConfigStorage.deleteItemById(id);
};
