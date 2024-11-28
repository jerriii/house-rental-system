// 1. import `extendTheme` function
import { selectAnatomy } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyleConfig,
  extendTheme,
  StyleFunctionProps,
  type ThemeConfig,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys);

const customMenuList = defineStyleConfig({
  baseStyle: (props) => ({
    list: {
      background: mode("header.light", "header.dark")(props),
      borderColor: mode("buttonColors.500", "buttonColors.200")(props),
      borderWidth: "1px",
      borderStyle: "solid",
      maxHeight: 72,
    },
    item: {
      background: mode("header.light", "header.dark")(props),
      _hover: {
        background: mode("buttonColors.500", "buttonColors.200")(props),
        color: mode("header.light", "header.dark")(props),
      },
    },
  }),
});

const variantOutline = definePartsStyle((props: StyleFunctionProps) => {
  return {
    field: {
      borderColor: `${props.colorMode === "light" ? "#6366f1" : "#c7d2fe"} !important`,
      _hover: {
        borderColor: props.colorMode === "light" ? "#4f46e5" : "#a5b4fc",
      },
    },
  };
});

const inputTheme = defineMultiStyleConfig({
  variants: {
    outline: variantOutline,
  },
});

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// 3. extend the theme
export const theme = extendTheme({
  config,
  colors: {
    buttonColors: {
      50: "#eef2ff",
      100: "#e0e7ff",
      200: "#c7d2fe",
      300: "#a5b4fc",
      400: "#818cf8",
      500: "#6366f1",
      600: "#4f46e5",
      700: "#4338ca",
      800: "#3730a3",
      900: "#312e81",
      950: "#1e1b4b",
    },
    body: {
      light: "#eef2ff",
      dark: "#171717",
    },
    header: {
      light: "#fafafa",
      dark: "#252525",
    },
    cardColor: {
      light: "#A7B8FF",
      dark: "#1B142E",
    },
  },
  components: {
    Input: inputTheme,
    Menu: customMenuList,
    Button: {
      baseStyle: {
        borderRadius: "xl",
      },
      defaultProps: {
        colorScheme: "buttonColors",
      },
    },
  },
});
