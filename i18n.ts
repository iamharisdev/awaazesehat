import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import enTranslation from "./locales/en.json";
import urTranslation from "./locales/ur.json";

const supportedLangs = ["en", "ur"];

const getInitialLanguage = async (): Promise<string> => {
  try {
    const saved = await AsyncStorage.getItem("language");
    if (saved && supportedLangs.includes(saved)) {
      return saved;
    }
  } catch (e) {
    console.error("Error reading saved language", e);
  }
  return "en";
};

(async () => {
  const selectedLanguage = await getInitialLanguage();

  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: enTranslation },
      ur: { translation: urTranslation },
    },
    lng: selectedLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
})();

export default i18n;
