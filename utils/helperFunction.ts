import Toast from "react-native-toast-message";

export const successMessage = (message: string) => {
  return Toast.show({ type: "success", text1: "Success", text2: message });
};

export const errorMessage = (message: string) => {
  return Toast.show({ type: "error", text1: "Error", text2: message });
};
export const infoMessage = (message: string) => {
  return Toast.show({ type: "info", text1: "Information", text2: message });
};
