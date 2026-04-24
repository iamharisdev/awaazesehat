import { logoutReset } from "@/features/authSlice";
import { useLogoutUserMutation } from "@/services/modules/auth";
import { persistor, store, useAppDispatch } from "@/store";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import AppLoader from "@/components/AppLoader";
import { api } from "@/services/api";

export default function Logout() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [logoutUser] = useLogoutUserMutation();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logoutUser({}).unwrap();
      } catch (_e) {
        // proceed with local logout even if API fails
      }

      // reset RTK Query cache
      dispatch(api.util.resetApiState());
      // reset auth state
      dispatch(logoutReset());
      // clear all persisted data
      await persistor.purge();

      router.replace("/(auth)");
    };

    handleLogout();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <AppLoader fullScreen />
    </View>
  );
}
