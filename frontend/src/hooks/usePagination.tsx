import React from "react";
import { PaginationTypes } from "../types";
import { Button } from "@chakra-ui/react";

const usePagination = ({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
  paginationClassName,
  pageNumberClassName,
  btnClassName,
  previousChildren,
  nextChildren,
  apiEndpoint,
  setPosts,
}: PaginationTypes) => {
  const [pages, setPages] = React.useState<number[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>();

  console.log(loading, error);

  // Calculate pages array when totalPosts or postsPerPage changes
  React.useEffect(() => {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const newPages = [];
    for (let i = 1; i <= totalPages; i++) {
      newPages.push(i);
    }
    setPages(newPages);
  }, [totalPosts, postsPerPage]);

  // Fetch paginated data when currentPage changes
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
          controller.abort();
        }, 10000);
        const response = await fetch(`${apiEndpoint}?page=${currentPage}&limit=${postsPerPage}`, {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        if (!response.ok) {
          throw new Error("Failed to fetch data from server.");
        }
        const data = await response.json();
        if (data?.posts?.length === 0) {
          throw new Error("No data found.");
        }

        setPosts && setPosts(data.posts);
        
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, postsPerPage, apiEndpoint, setPosts]);

  const pagination = (
    <div className={`${paginationClassName ? paginationClassName : ""}`}>
      {/* prev button */}
      <Button
        {...btnClassName}
        variant={"outline"}
        disabled={currentPage === 1}
        className={`${
          currentPage === 1
            ? "hover:cursor-not-allowed"
            : "hover:cursor-pointer"
        }`}
        onClick={() => {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
      >
        {previousChildren}
      </Button>

      {/* page */}
      {pages.map((page, index) => (
        <button
          key={`${page} + ${index}`}
          onClick={() => setCurrentPage(page)}
          className={`${pageNumberClassName ? pageNumberClassName : ""}`}
        >
          {page}
        </button>
      ))}

      {/* next button */}
      <Button
        {...btnClassName}
        variant={"outline"}
        className={`${
          currentPage === Math.ceil(totalPosts / postsPerPage)
            ? "hover:cursor-not-allowed"
            : "hover:cursor-pointer"
        }`}
        onClick={() => {
          if (currentPage < Math.ceil(totalPosts / postsPerPage)) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
      >
        {nextChildren}
      </Button>
    </div>
  );

  return [error, loading, pagination];
};

export default usePagination;
