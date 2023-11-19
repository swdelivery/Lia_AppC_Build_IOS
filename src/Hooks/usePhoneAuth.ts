import { useCallback, useEffect, useRef } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import useSavedCallback from "./useSavedCallback";
import { alertCustomNotAction } from "@Constant/Utils";
import { useNavigate } from "./useNavigation";

export default function usePhoneAuth(
  phone: string,
  callback: (
    user: FirebaseAuthTypes.User,
    token: FirebaseAuthTypes.IdTokenResult
  ) => void
) {
  const { navigation } = useNavigate();
  const confirmation = useRef<FirebaseAuthTypes.ConfirmationResult>();
  const savedCallback = useSavedCallback(callback);

  useEffect(() => {
    const subcriber = auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log("onAuthStateChanged", user);

        const token = await user.getIdTokenResult();
        savedCallback.current(user, token);
      }
    });

    return () => {
      auth().signOut();
      subcriber();
    };
  }, []);

  useEffect(() => {
    if (phone) {
      signInWithPhoneNumber(phone);
    }
  }, [phone]);

  const signInWithPhoneNumber = useCallback(async (phoneNumber: string) => {
    try {
      confirmation.current = await auth().signInWithPhoneNumber(
        phoneNumber,
        true
      );
    } catch (error) {
      alertCustomNotAction(
        `Thông báo`,
        `lỗi hệ thồng, vui lòng liên hệ để được hỗ trợ`
      );
      navigation.goBack();
    }
  }, []);

  const confirmCode = useCallback(async (code: string) => {
    if (confirmation.current) {
      await confirmation.current.confirm(code);
    }
  }, []);

  const verifyPhoneNumber = useCallback(() => {
    auth().verifyPhoneNumber(phone, true);
  }, [phone]);

  return {
    confirmCode,
    verifyPhoneNumber,
  };
}
