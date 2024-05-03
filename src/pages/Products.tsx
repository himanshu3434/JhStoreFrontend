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
  const FilterChangeHandler = async (e: filterHandler) => {
    dispatch(
      updateFilter({
        data: e.target.value,
        id: e.target.id,
      })
    );
  };
  const filters = useSelector((state: RootState) => state.filter);

  const getAllProducts = async () => {
    const allProducts = await fetchAllProductsWithFilters(filters);

    if (allProducts.data.success) {
      console.log("all products", allProducts.data);
      setProducts(allProducts.data.data.limitedProductList);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [filters]);

  return (
    <div className="flex space-x-3">
      <aside>
        <Filters />
      </aside>

      <div className="absolute right-5 mt-3 bg-green-300">
        <select onChange={FilterChangeHandler} id="sort">
          <option value="asc">Low to High</option>
          <option value="dsc">High To Low</option>
        </select>
      </div>

      <div className="mt-10 ">
        <div className="flex space-x-6">
          {products.map((product: IProduct) => {
            return <Product key={product._id} productDetails={product} />;
          })}
        </div>

        <div>
          <Pagination />
        </div>
      </div>
    </div>
  );
}

export default Products;
