import { RouteProp } from "@react-navigation/native";
import ScreenKey from "./ScreenKey";

type valueof<T> = T[keyof T];
type Screens = valueof<typeof ScreenKey>;

type ScreenParams = {
  [ScreenKey.ACTIVATION_IN_APP]: {
    phoneNumber: string;
    fullPhone: string;
    password: string;
    routeName: string;
  };
};

type RootStackParamsList = {
  [key in Exclude<Screens, keyof ScreenParams>]: undefined;
} & ScreenParams;

export type ScreenRouteProp<K extends keyof RootStackParamsList> = RouteProp<
  RootStackParamsList,
  K
>;
