import afgIcon from "./assets/language/afg-flag.png";
import usaIcon from "./assets/language/usa-flag.png";
import arabIcon from "./assets/language/arabic-flag.png";

export const defaultSettings = {
  themeDirection: "ltr",
  themeLayout: "horizontal",
};

// @mui
import { faIR, ptPT, enUS, arSD } from "@mui/material/locale";

export const allLangs = [
  {
    label: "پښتو",
    value: "ps",
    systemValue: ptPT,
    icon: afgIcon,
  },
  {
    label: "دری",
    value: "fa",
    systemValue: faIR,
    icon: afgIcon,
  },
  {
    label: "English",
    value: "en",
    systemValue: enUS,
    icon: usaIcon,
  },
];

export const defaultLang = allLangs[2]; // English
