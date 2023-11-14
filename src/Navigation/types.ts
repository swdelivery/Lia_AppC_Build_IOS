import { RouteProp } from "@react-navigation/native";
import ScreenKey from "./ScreenKey";
import { Service } from "@typings/serviceGroup";
import { Branch } from "@typings/branch";

type valueof<T> = T[keyof T];
type Screens = valueof<typeof ScreenKey>;

type ScreenParams = {
  [ScreenKey.ACTIVATION_IN_APP]: {
    phoneNumber: string;
    fullPhone: string;
    password: string;
    routeName: string;
  };
  [ScreenKey.DETAIL_BRAND]: { branch: Branch };
  [ScreenKey.DETAIL_DOCTOR]: { idDoctor: string };
  [ScreenKey.DETAIL_SERVICE]: { service: Service };
  [ScreenKey.DETAIL_PRACTITIONER]: { idPractitioner: string };
};

export type RootStackParamsList = {
  [key in Exclude<Screens, keyof ScreenParams>]: undefined;
} & ScreenParams;

export type ScreenRouteProp<K extends keyof RootStackParamsList> = RouteProp<
  RootStackParamsList,
  K
>;
