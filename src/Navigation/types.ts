import { RouteProp } from "@react-navigation/native";
import ScreenKey from "./ScreenKey";
import { Service } from "@typings/serviceGroup";
import { Branch } from "@typings/branch";
import { Doctor } from "@typings/doctor";
import { Practitioner } from "@typings/practitioner";
import { Booking } from "@typings/booking";
import { Insurance } from "@typings/insurance";
import { Conversation } from "@typings/chat";
import { Campain, CompanionRequest } from "@typings/charity";
import { Voucher } from "@typings/voucher";

type valueof<T> = T[keyof T];
type Screens = valueof<typeof ScreenKey>;

type ScreenParams = {
  [ScreenKey.ACTIVATION_IN_APP]: {
    phoneNumber: string;
    fullPhone: string;
    password: string;
    routeName: string;
    nationCode: string;
  };
  [ScreenKey.GET_OTP_NEW_PASS]: {
    phoneNumber: string;
    fullPhone: string;
    routeName: string;
    nationCode: string;
  };
  [ScreenKey.DETAIL_BRAND]: { branch: Branch };
  [ScreenKey.DETAIL_DOCTOR]: { doctor: Doctor };
  [ScreenKey.DETAIL_SERVICE]: { service: Service };
  [ScreenKey.DETAIL_PRACTITIONER]: { practitioner: Practitioner };
  [ScreenKey.DETAIL_BOOKING]: { booking: Booking };
  [ScreenKey.DETAIL_BEAUTY_INSURANCE]: { insurance: Insurance };

  [ScreenKey.CREATE_BOOKING]: {
    branch?: Branch;
    doctor?: Doctor;
    service?: Service;
    practitioner?: Practitioner;
    coupon?: Voucher;
    type?: string;
    dataBookingEdit?: Booking;
  };
  // Chat
  [ScreenKey.CHATTING]: {
    conversation: Conversation;
  };
  [ScreenKey.CHARITY_FUND_DETAILS]: {
    campain: Campain;
  };
  [ScreenKey.CHARITY_DONATION]: {
    volunteerCompanion: CompanionRequest;
  };
};

export type RootStackParamsList = {
  [key in Exclude<Screens, keyof ScreenParams>]: undefined;
} & ScreenParams;

export type ScreenRouteProp<K extends keyof RootStackParamsList> = RouteProp<
  RootStackParamsList,
  K
>;
