import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { card_details } from "../../DummyData.json";
import PaginatedBox from "../../common/PaginatedBox";
import useUniqueDataFilter from "../../../hooks/useUniqueDataFilter";
// import { HouseCardTypes } from "../../../types";
import { handleFilter, removeItemFromArray } from "../../../utils";
import CrossIconSVG from "../../../assets/svg/CrossIconSVG";
import useCustomColor from "../../../hooks/useCustomColor";
import { clamp } from "framer-motion";

const DisplayProperties = () => {
  const { colorMode } = useColorMode();
  const { primaryAccentColor } = useCustomColor();
  // data filtering
  const [addressFilterData] = useUniqueDataFilter(card_details, "address");
  const [propertyFilterData] = useUniqueDataFilter(
    card_details,
    "property_type"
  );

  // values to be display inside of select box
  const [value, setValue] = React.useState<{
    address: string;
    property_type: string;
  }>({
    address: "",
    property_type: "",
  });

  // filters for select box
  const [AddressFilter, setAddressFilter] = React.useState<string[]>([]);
  const [PropertyTypeFilter, setPropertyTypeFilter] = React.useState<string[]>(
    []
  );

  // // handle filter
  // React.useEffect(() => {
  //   const houses = card_details.filter((data) => {
  //     const address = data.address;
  //     const property_type = data.property_type;
  //     return (
  //       dataFilter(AddressFilter, address) &&
  //       dataFilter(PropertyTypeFilter, property_type)
  //     );
  //   });
  //   setFilteredData(houses);
  // }, [value, AddressFilter, PropertyTypeFilter]);

  // //filtered data
  // const [filteredData, setFilteredData] =
  //   React.useState<HouseCardTypes[]>(card_details);

  return (
    <VStack padding={{ base: 4, lg: 12 }} gap={4}>
      {/* search bar */}
      <InputGroup width={{ lg: "60%", base: "100%" }}>
        <Input
          placeholder="Search for properties"
          size="lg"
          border={"1px"}
          pr={12}
          borderRadius={"full"}
        />
        <InputRightElement right={1} top={1} width={"fit-content"}>
          <Button borderRadius={"full"} padding={1}>
            <FaSearch />
          </Button>
        </InputRightElement>
      </InputGroup>
      <HStack flexWrap={"wrap"} justifyContent={"center"} gap={4} pt={8}>
        {/* property type */}
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                as={Button}
                variant={"outline"}
                rightIcon={isOpen ? <IoChevronUp /> : <IoChevronDown />}
              >
                {value.property_type || "Property Type"}
              </MenuButton>
              <MenuList overflow={"auto"} zIndex={10}>
                {propertyFilterData.map((card) => (
                  <MenuItem
                    key={card}
                    data-value={card}
                    onClick={() => {
                      setValue({ ...value, property_type: card });
                      handleFilter(card, setPropertyTypeFilter);
                    }}
                  >
                    {card}
                  </MenuItem>
                ))}
              </MenuList>
            </>
          )}
        </Menu>
        {/* address */}
        <Menu>
          {(props) => (
            <>
              <MenuButton
                as={Button}
                variant={"outline"}
                rightIcon={props.isOpen ? <IoChevronUp /> : <IoChevronDown />}
              >
                {value.address || "Address"}
              </MenuButton>
              <MenuList overflow={"auto"} zIndex={10}>
                {addressFilterData.map((card) => (
                  <MenuItem
                    key={card}
                    onClick={() => {
                      setValue({ ...value, address: card });
                      handleFilter(card, setAddressFilter);
                    }}
                  >
                    {card}
                  </MenuItem>
                ))}
              </MenuList>
            </>
          )}
        </Menu>
      </HStack>
      <HStack gap={clamp(2, 4, 6)} flexWrap={"wrap"} justifyContent={"center"}>
        {AddressFilter.map((card) => (
          <Text
            key={card}
            display={"inline-flex"}
            gap={2}
            alignItems={"center"}
            border={"1px solid"}
            borderRadius={"xl"}
            py={2}
            px={3}
            _hover={{ cursor: "default" }}
          >
            {card}{" "}
            <Text
              as={"span"}
              _hover={{
                cursor: "pointer",
                borderRadius: "full",
                bg: primaryAccentColor,
              }}
              onClick={() => {
                setAddressFilter(removeItemFromArray(AddressFilter, card));
              }}
            >
              {<CrossIconSVG width="1rem" height="1rem" />}
            </Text>
          </Text>
        ))}
        {PropertyTypeFilter.map((card) => (
          <Text
            key={card}
            display={"inline-flex"}
            gap={2}
            alignItems={"center"}
            border={"1px solid"}
            borderRadius={"xl"}
            py={2}
            px={3}
            _hover={{ cursor: "default" }}
          >
            {card}{" "}
            <Text
              as={"span"}
              _hover={{
                cursor: "pointer",
                borderRadius: "full",
                bg: primaryAccentColor,
                color: colorMode === "light" ? "white" : "black",
              }}
              onClick={() => {
                setPropertyTypeFilter(
                  removeItemFromArray(PropertyTypeFilter, card)
                );
              }}
            >
              {<CrossIconSVG width="1rem" height="1rem" />}
            </Text>
          </Text>
        ))}
      </HStack>
      <PaginatedBox data={filteredData} />
    </VStack>
  );
};

export default DisplayProperties;
