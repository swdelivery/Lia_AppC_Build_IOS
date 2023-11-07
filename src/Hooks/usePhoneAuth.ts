import { useCallback, useEffect, useRef } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import useSavedCallback from "./useSavedCallback";

export default function usePhoneAuth(
  phone: string,
  callback: (
    user: FirebaseAuthTypes.User,
    token: FirebaseAuthTypes.IdTokenResult
  ) => void
) {
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
    confirmation.current = await auth().signInWithPhoneNumber(
      phoneNumber,
      true
    );
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
