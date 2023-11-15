import ScreenKey from "@Navigation/ScreenKey";
import { useCallback } from "react";
import { useNavigate } from "../useNavigation";
import { Branch } from "@typings/branch";
import { Doctor } from "@typings/doctor";

export default function useDoctorDetailsNavigation() {
  const { navigation } = useNavigate();

  return useCallback((item: Doctor) => {
    // @ts-ignore
    navigation.navigate({
      name: ScreenKey.DETAIL_DOCTOR,
      params: {
        doctor: item,
      },
      key: Date.now() + "",
    });
  }, []);
}
