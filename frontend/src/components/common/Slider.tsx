import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Button, Flex, HStack, Image } from "@chakra-ui/react";
import { Navigation, Pagination } from "swiper/modules";
import { useState } from "react";
import useCustomColor from "../../hooks/useCustomColor";
import { FaTimes } from "react-icons/fa";

const Slider = ({ image_data }: { image_data: File[] }) => {
  const { alpha_color } = useCustomColor();
  const [isOpen, setIsOpen] = useState(false);
  const [viewedImage, setViewedImage] = useState("");
  return (
    <>
      {isOpen && (
        <Flex
          position={"absolute"}
          inset={0}
          p={16}
          background={alpha_color}
          backdropFilter={"blur(10px)"}
          zIndex={20}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button
            variant={"unstyled"}
            pos={"absolute"}
            right={"1rem"}
            top={"1rem"}
            onClick={() => setIsOpen(false)}
          >
            <FaTimes />
          </Button>
          <Image src={`${viewedImage}`} alt="house" h={"100%"} />
        </Flex>
      )}
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
          {image_data.map((src: File, i: number) => (
            <SwiperSlide key={i} className="w-full">
              <Image
                src={`http://localhost:4200${src}`}
                alt="house"
                width={"100%"} // Ensure the image fits the container
                objectFit={"cover"} // Make images cover the container
                aspectRatio={"16/9"}
                _hover={{ cursor: "pointer" }}
                onClick={() => {
                  setIsOpen(true);
                  setViewedImage(`http://localhost:4200${src}`);
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </HStack>
    </>
  );
};

export default Slider;
