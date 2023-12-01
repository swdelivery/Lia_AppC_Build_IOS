import { Timestamp } from "./common";



export type AIMessage = {
  role: string;
  userCreate: string;
  userUpdate: string;
  isDelete: boolean;
  _id: string;
  id: string;
  partnerId: string;
  content: string;
  sendDate: string;
  created: string;
  updated: string
  partner: any
} & Timestamp;

export type Meta = {
  page: number
  perPage: number
  totalDocuments: number
  totalPage: number
} 
