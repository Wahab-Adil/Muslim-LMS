import PropTypes from "prop-types";
import { useEffect, createContext } from "react";
// hooks
import useLocalStorage from "../hook/useLocaslStorage";
// config
import { defaultSettings } from "../config";

// ----------------------------------------------------------------------

const initialState = {
  ...defaultSettings,
  // Direction
  onToggleDirection: () => {},
  onChangeDirection: () => {},
  onChangeDirectionByLang: () => {},

  // Layout
  onToggleLayout: () => {},
  onChangeLayout: () => {},
};

const SettingsContext = createContext(initialState);

// ----------------------------------------------------------------------

SettingsProvider.propTypes = {
  children: PropTypes.node,
};

function SettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorage("settings", {
    themeDirection: initialState.themeDirection,
  });

  const isDari = localStorage.getItem("i18nextLng") === "fa";
  const isPashto = localStorage.getItem("i18nextLng") === "ps";
  const isArabic = localStorage.getItem("i18nextLng") === "ar";
  const isEnglish = localStorage.getItem("i18nextLng") === "en";

  useEffect(() => {
    if (isDari) {
      onChangeDirectionByLang("fa");
    } else if (isPashto) {
      onChangeDirectionByLang("ps");
    } else if (isArabic) {
      onChangeDirectionByLang("ar");
    } else {
      onChangeDirectionByLang("en");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDari, isPashto, isArabic, isEnglish]);

  // Direction

  const onToggleDirection = () => {
    setSettings({
      ...settings,
      themeDirection: settings.themeDirection === "rtl" ? "ltr" : "rtl",
    });
  };

  const onChangeDirection = (lang) => {
   
  };

  const onChangeDirectionByLang = (lang) => {};

  // Layout

  const onToggleLayout = () => {
    setSettings({
      ...settings,
      themeLayout:
        settings.themeLayout === "vertical" ? "horizontal" : "vertical",
    });
  };

  const onChangeLayout = (event) => {
    setSettings({
      ...settings,
      themeLayout: event.target.value,
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        // Direction
        onToggleDirection,
        onChangeDirection,
        onChangeDirectionByLang,

        // Layout
        onToggleLayout,
        onChangeLayout,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext };
