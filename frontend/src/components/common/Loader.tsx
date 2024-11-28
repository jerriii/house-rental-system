import { Spinner, Text, VStack } from "@chakra-ui/react";
import useCustomColor from "../../hooks/useCustomColor";

const Loader = () => {
  const { primaryAccentColor, header_background, alpha_color } = useCustomColor();
  return (
    <VStack
      justifyContent="center"
      alignItems={"center"}
      h={"100%"}
      w={"100%"}
      position={"absolute"}
      zIndex={10}
      inset={0}
      background={header_background}
    >
      <Spinner
        size="xl"
        color={primaryAccentColor}
        speed="0.65s"
        emptyColor={alpha_color}
      />
      <Text fontSize={"xl"}>Loading...</Text>
    </VStack>
  );
};

export default Loader;
