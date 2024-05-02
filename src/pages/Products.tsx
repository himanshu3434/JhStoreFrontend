import React, { lazy } from "react";
import { useDispatch } from "react-redux";
import { filterHandler } from "../types/types";
import { updateFilter } from "../features/filterSlice";

const Filters = lazy(() => import("../component/products/Filters"));
const Product = lazy(() => import("../component/products/Product"));
const Pagination = lazy(() => import("../component/Pagination"));
function Products() {
  const dispatch = useDispatch();
  const FilterChangeHandler = async (e: filterHandler) => {
    dispatch(
      updateFilter({
        data: e.target.value,
        id: e.target.id,
      })
    );
  };

  return (
    <div className="flex space-x-3">
      <aside>
        <Filters></Filters>
      </aside>

      <div className="absolute right-5 mt-3 bg-green-300">
        <select onChange={FilterChangeHandler} id="sort">
          <option value="asc">Low to High</option>
          <option value="dsc">High To Low</option>
        </select>
      </div>

      <div className="mt-10">
        <Product />

        <div>
          <Pagination />
        </div>
      </div>
    </div>
  );
}

export default Products;
