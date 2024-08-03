import React from "react";
import Button from "./Button";

type paginationProps = {
  page: number;
  total: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};
function Pagination({ page, total, setPage }: paginationProps) {
  const handlerPageDown = () => {
    if (page === 1) return;
    else {
      setPage(page - 1);
    }
  };
  const handlerPageUp = () => {
    if (page === total) return;
    else setPage(page + 1);
  };

  return (
    <div className=" space-x-4 mt-6 text-center">
      <Button
        className={` px-3 py-1 text-white rounded-lg  ${
          page === 1 ? "bg-gray-400" : "bg-sky-500 hover:bg-sky-400"
        }`}
        onClick={handlerPageDown}
      >
        Prev
      </Button>
      <span>
        {page} of {total}
      </span>
      <Button
        className={` px-3 py-1 text-white rounded-lg ${
          total === page ? "bg-gray-400" : "bg-sky-500 hover:bg-sky-400"
        }`}
        onClick={handlerPageUp}
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;
