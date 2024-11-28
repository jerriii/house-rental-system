import { CardProps } from "@chakra-ui/react";
import {Property} from "./models.types.tsx";

export type HouseCardProps = CardProps & {
  cardData: Property;
  loading: boolean;
};
