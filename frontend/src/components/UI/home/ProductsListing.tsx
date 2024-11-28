import { Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { HouseListingTypes, Property } from "../../../types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import HouseCard from "../../common/HouseCard";

const ProductsListing = ({
  title,
  data,
  loading,
  navigation,
  state,
}: HouseListingTypes<Record<string, unknown>>) => {
  const navigate = useNavigate();
  return (
    // featured properties
    <VStack as={"section"} alignItems={"center"} py={12}>
      <Flex
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text fontWeight={"bold"} fontSize={{ base: "2xl", lg: "4xl" }}>
          {title}
        </Text>
        <Button
          onClick={() => navigate(navigation, { state })}
          variant={"link"}
        >
          View All
        </Button>
      </Flex>
      {/* slider */}
      <HStack w={"100%"} py={"20px"} justifyContent={"center"}>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1} // Default to 1 slide per view
          breakpoints={{
            1024: {
              slidesPerView: 3, // Show 3 images on large screens
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 2, // Show 2 images on medium screens
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 1, // Show 1 image on small screens
              spaceBetween: 10,
            },
          }}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          className={"w-full"}
        >
          {data.map((src: Property, i: number) => (
            <SwiperSlide key={i} className="w-full">
              <HouseCard loading={loading} cardData={src}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </HStack>
    </VStack>
  );
};

export default ProductsListing;
