import { Timestamp } from "./common";
export type ExaminationResult = {
  _id: string;
  id: string;
  name: string;
  address: string;
} & Timestamp;
