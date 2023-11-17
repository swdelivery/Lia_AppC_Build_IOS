import { RouteProp } from "@react-navigation/native";
import ScreenKey from "./ScreenKey";
import { Service } from "@typings/serviceGroup";
import { Branch } from "@typings/branch";
import { Doctor } from "@typings/doctor";
import { Practitioner } from "@typings/practitioner";
import { Booking } from "@typings/booking";
import { Insurance } from "@typings/insurance";

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
  [ScreenKey.DETAIL_BRAND]: { branch: Branch };
  [ScreenKey.DETAIL_DOCTOR]: { doctor: Doctor };
  [ScreenKey.DETAIL_SERVICE]: { service: Service };
  [ScreenKey.DETAIL_PRACTITIONER]: { practitioner: Practitioner };
  [ScreenKey.DETAIL_BOOKING]: { booking: Booking };
  [ScreenKey.DETAIL_BEAUTY_INSURANCE]: { insurance: Insurance };
  [ScreenKey.GET_OTP_NEW_PASS]: {
    phoneNumber: string;
    fullPhone: string;
    routeName: string;
    nationCode: string;
  };
};

export type RootStackParamsList = {
  [key in Exclude<Screens, keyof ScreenParams>]: undefined;
} & ScreenParams;

export type ScreenRouteProp<K extends keyof RootStackParamsList> = RouteProp<
  RootStackParamsList,
  K
>;
