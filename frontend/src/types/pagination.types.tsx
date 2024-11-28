import { HouseCardTypes } from "./house.types";

export type PaginationTypes = {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  paginationClassName?: string;
  btnClassName?: object;
  pageNumberClassName?: string;
  previousChildren: JSX.Element;
  nextChildren: JSX.Element;
  apiEndpoint: string;
  setPosts: React.Dispatch<React.SetStateAction<HouseCardTypes[]>> | undefined;
};
