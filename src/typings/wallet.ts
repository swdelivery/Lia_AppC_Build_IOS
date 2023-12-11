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

export type PaymentWallet = {
  money: number;
  isDelete: boolean;
  _id: string;
  walletId: string;
  paymentFor: string;
  status: string;
  userCreate: string;
  detail: any;
  created: string;
  updated: string;
  __v: number;
  receivedFrom: any;
  id: string;
}


