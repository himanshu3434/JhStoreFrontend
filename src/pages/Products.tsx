import React, { lazy } from "react";
import Select from "../component/Select";
const Filters = lazy(() => import("../component/products/Filters"));
const Product = lazy(() => import("../component/products/Product"));
const Pagination = lazy(() => import("../component/Pagination"));
function Products() {
  return (
    <div className="flex space-x-3">
      <aside>
        <Filters></Filters>
      </aside>

      <div className="absolute right-5 mt-3 bg-green-300">
        <select>
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
