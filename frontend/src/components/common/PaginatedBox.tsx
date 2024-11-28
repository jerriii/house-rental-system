import { Grid, Text, VStack } from "@chakra-ui/react";
import HouseCard from "./HouseCard";
import { HouseCardTypes } from "../../types";
import usePagination from "../../hooks/usePagination";
import { GrNext, GrPrevious } from "react-icons/gr";
import React from "react";

const PaginatedBox = ({ data }: { data: HouseCardTypes[] }) => {
  const [posts, setPosts] = React.useState<HouseCardTypes[]>([]); 
  const [currentPage, setCurrentPage] = React.useState(1);

  const prevButton = <GrPrevious className="w-6 h-6" />;
  const nextButton = <GrNext className="w-6 h-6" />;

  const [loading, error, pagination] = usePagination({
    totalPosts: data.length,
    postsPerPage: 30,
    currentPage: currentPage,
    setCurrentPage: setCurrentPage,
    paginationClassName: "flex w-full justify-end gap-4",
    btnClassName: {
      width: "2.5rem",
      height: "2.5rem",
      borderRadius: "full",
      padding: "0.5rem",
      border: "1px",
    },
    pageNumberClassName: "hidden",
    previousChildren: prevButton,
    nextChildren: nextButton,
    apiEndpoint: "",
    setPosts,
  }) as [number, number, JSX.Element];

  return (
    <VStack as={"section"} py={{ base: 4, lg: 8 }} key={currentPage} gap={6} w={"100%"}>
      {/* grid box with pagination */}
      <Grid
        gap={6}
        gridTemplateColumns={{
          base: "repeat(auto-fill, minmax(260px, 1fr))",
          lg: "repeat(auto-fill, minmax(340px, 1fr))",
        }}
        gridTemplateRows={"auto"}
        justifyContent={"center"}
      >
        {posts.map((card, i) => (
          <HouseCard cardData={card} key={i} />
        ))}
        {/* Loading and Error states */}
      {error ? <Text textAlign={"center"}>{error}</Text>: null}
      {loading ? <Text textAlign={"center"}>Loading...</Text>:""}
      </Grid>
      {pagination}
    </VStack>
  );
};

export default PaginatedBox;
