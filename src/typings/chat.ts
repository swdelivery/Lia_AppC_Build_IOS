import { FileAvatar, Timestamp } from "./common";
import { Partner } from "./partner";
import { UserProfile } from "./user";

export type AssignedUser = {
  employeeCode: string;
  isMain: boolean;
  name: string;
  profile: UserProfile;
  userId: string;
};

export type TemplateData = {
  type:
    | "SERVICE_REVIEW"
    | "REVIEW_DETAIL"
    | "TREATMENT_DETAIL"
    | "SERVICE"
    | "NEWS"
    | "BOOKING"
    | "COLLABORATOR"
    | "SPIN_WHEEL"
    | "WAS_CONSULTED"
    | "CREATE_BOOKING"
    | "REMIND_BOOKING"
    | "COMPLETE_PROGRESS"
    | "THANK_YOU_LETTER"
    | "COMPLETE_PROGRESS";
  data: {
    partnerName: string;
    created: string;
    services: string[];
    totalAmount: number;
    status: string;
    bookingId: string;

    // for consulted
    branchName: string;
    bookingStatus: string;

    // thank you
    volunteerName: string;
    volunteerBanner: FileAvatar[];
    amount: number;
    volunteerId: string;

    serviceName: string[];
    completedAt: string;
    date: string;
    time: string;
  };
};

export type Message = {
  type: string;
  content: string;
  images: FileAvatar[];
  documents: FileAvatar[];
  videos: FileAvatar[];
  isPartnerSeen: boolean;
  isActive: boolean;
  isDelete: boolean;
  _id: string;
  conversationId: string;
  partnerId: string;
  senderId: string;
  senderModel: string;
  timeNow: string;
  __v: string;
  id: string;
  receiverUserIdArr: string[];
  viewerUserIdArr: string[];

  isSystemNotification: boolean;
  template: TemplateData;
} & Timestamp;

export type Conversation = {
  __v: 0;
  _id: string;
  assignedUsers: AssignedUser[];
  created: string;
  isActive: boolean;
  isDelete: boolean;
  isUserReply: boolean;
  latestMessage: Message;
  latestMessageId: string;
  latestMessageTime: string;
  latestSenderType: any;
  name: string;
  partner: Partner;
  partnerId: string;
  partnerName: string;
  partnerName_fuzzy: any[];
  type: "treatment" | "videoCallRequest" | "consultation" | "assistant";
  uniqueKey: string;
  updated: string;
  unreadCount: number;
};
