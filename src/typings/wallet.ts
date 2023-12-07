import { Timestamp } from "./common";



export type Wallet = {
  commissionAmount: number;
  bonusAmount: number;
  depositAmount: number;
  liaTicketAmount: number;
  isDelete: boolean;
  _id: string;
  walletHistoryIdArr: any;
  partnerId: string;
  created: string;
  updated: string;
  __v: number;
  walletHistoryArr: any;
  id: string;

} & Timestamp;


