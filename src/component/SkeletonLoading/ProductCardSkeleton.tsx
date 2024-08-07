import React from "react";
import Button from "../Button";

function ProductCardSkeleton() {
  return (
    <div className=" m-2">
      <div className="  w-[22vw] shadow-lg rounded-lg ">
        <div className="space-y-2 px-2">
          <div className="flex  justify-center">
            <div className=" h-[25vh] lg:h-[30vh] w-3/4 animate-pulse bg-gray-100 rounded-xl"></div>
          </div>
          <div className="  overflow-ellipsis overflow-hidden h-5 whitespace-nowrap h-[4vh] w-full  bg-gray-100  rounded-lg animate-pulse"></div>

          <div className="flex gap-2 items-center animate-pulse">
            <div className="flex gap-2 items-center w-1/2 bg-gray-100 rounded-lg  h-[2vh]"></div>
            <div className="flex gap-2 items-center w-1/4 bg-gray-100 rounded-lg  h-[2vh]"></div>
          </div>
        </div>

        <Button className=" hover:bg-yellow-300 w-full bg-yellow-400 text-black font-semibold mt-2 h-[7vh] animate-pulse">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
