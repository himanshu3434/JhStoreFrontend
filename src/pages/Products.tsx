import React, { lazy, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IProduct, filterHandler } from "../types/types";
import { updateFilter } from "../features/filterSlice";
import { RootState } from "../store/Store";
import { fetchAllProductsWithFilters } from "../api/productsApi";

const Filters = lazy(() => import("../component/products/Filters"));
const Product = lazy(() => import("../component/products/Product"));
const Pagination = lazy(() => import("../component/Pagination"));
function Products() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [totalPageNumber, setTotalPageNumber] = useState(1);
  const FilterChangeHandler = async (e: filterHandler) => {
    dispatch(
      updateFilter({
        data: e.target.value,
        id: e.target.id,
      })
    );
  };
  const filters = useSelector((state: RootState) => state.filter);
  const [page, setPage] = useState(1);
  const getAllProducts = async () => {
    const allProducts = await fetchAllProductsWithFilters(filters, page);

    if (allProducts.data.success) {
      console.log("all products", allProducts.data);
      setTotalPageNumber(allProducts.data.data.totalPageNumber);
      setProducts(allProducts.data.data.limitedProductList);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [filters, page]);

  return (
    <div className="flex space-x-3 ">
      <aside>
        <Filters />
      </aside>

      <div className="absolute right-5 mt-3  ">
        <select
          onChange={FilterChangeHandler}
          id="sort"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none"
        >
          <option value="asc">Low to High</option>
          <option value="dsc">High To Low</option>
        </select>
      </div>

      <div className="mt-14  p-4 ">
        <div className="flex  flex-wrap  justify-center">
          {products.map((product: IProduct) => {
            return <Product key={product._id} productDetails={product} />;
          })}
        </div>

        {totalPageNumber > 1 ? (
          <div>
            <Pagination page={page} setPage={setPage} total={totalPageNumber} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Products;
