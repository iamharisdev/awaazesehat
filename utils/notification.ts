import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform, Linking } from "react-native";


export async function enableNotifications() {
  if (!Device.isDevice) {
    alert("Must use physical device for push notifications");
    return;
  }

  // check existing permissions
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Permission not granted. You can enable notifications from settings.");
    // Optionally open app settings if denied
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:"); // iOS deep link
    } else {
      // Android → open app settings
      Linking.openSettings();
    }
    return;
  }

  // Get Expo push token (optional, only if you’ll send push notifications)
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log("✅ Notification token:", token);

  return token;
}


