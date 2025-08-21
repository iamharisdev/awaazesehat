import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import translation JSON files
import enTranslation from "./locales/en.json";
import urTranslation from "./locales/ur.json";

const supportedLangs = ["en", "ur"];

// Async function to load saved language

const getInitialLanguage = async (): Promise<string> => {
  try {
    const saved = await AsyncStorage.getItem("language");
    if (saved && supportedLangs.includes(saved)) {
      return saved;
    }
  } catch (e) {
    console.error("Error reading saved language", e);
  }

  const sysLang = Localization.getLocales()[0].languageCode ?? "en"; // fallback if null
  return supportedLangs.includes(sysLang) ? sysLang : "en";
};
(async () => {
  const selectedLang = await getInitialLanguage();

  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: enTranslation },
      ur: { translation: urTranslation },
    },
    lng: selectedLang,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
})();

export default i18n;
