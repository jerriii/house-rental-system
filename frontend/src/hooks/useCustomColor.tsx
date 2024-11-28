import { useColorModeValue } from "@chakra-ui/react";

const useCustomColor = () => {
  const header_background = useColorModeValue("header.light", "header.dark");
  const primaryAccentColor = useColorModeValue(
    "buttonColors.500",
    "buttonColors.200"
  );
  const secondaryAccentColor = useColorModeValue(
    "buttonColors.600",
    "buttonColors.300"
  );
  const house_card_background = useColorModeValue(
    "cardColor.light",
    "cardColor.dark"
  );
  const alpha_color = useColorModeValue("whiteAlpha.600", "blackAlpha.600");
  const hover_color = useColorModeValue("#e5e7eb", "#414141");

  return {
    header_background,
    house_card_background,
    alpha_color,
    primaryAccentColor,
    secondaryAccentColor,
    hover_color,
  };
};

export default useCustomColor;
