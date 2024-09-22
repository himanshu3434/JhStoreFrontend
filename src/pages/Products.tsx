import { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductsWithFilters } from "../api/productsApi";
import ProductsSkeleton from "../component/SkeletonLoading/ProductsSkeleton";
import { clearFilter, updateFilter } from "../features/filterSlice";
import { RootState } from "../store/Store";
import { IProduct, filterHandler } from "../types/types";

const Filters = lazy(() => import("../component/products/Filters"));
const Product = lazy(() => import("../component/products/Product"));
const Pagination = lazy(() => import("../component/Pagination"));
function Products() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
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
      setTotalPageNumber(allProducts.data.data.totalPageNumber);
      setProducts(allProducts.data.data.limitedProductList);
      setLoading(false);
    }
  };

  const toggleOpenFilter = () => {
    setIsOpenFilter(!isOpenFilter);
  };
  useEffect(() => {
    return () => {
      dispatch(clearFilter());
    };
  }, []);
  useEffect(() => {
    getAllProducts();
  }, [filters, page]);

  return (
    <div>
      <div className="sm:flex sm:space-x-3 ">
        <aside className="hidden sm:block">
          <Filters setIsOpenFilter={setIsOpenFilter} />
        </aside>

        <div className="sm:absolute sm:right-5 sm:mt-3 hidden sm:block ">
          <select
            onChange={FilterChangeHandler}
            id="sort"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none"
          >
            <option value="asc">Low to High</option>
            <option value="dsc">High To Low</option>
          </select>
        </div>
        <div className="flex justify-end my-4 space-x-4 ">
          <button
            onClick={toggleOpenFilter}
            className="p-3  border-2 rounded-lg sm:hidden "
          >
            Filters
          </button>
          <div className=" sm:hidden">
            <select
              onChange={FilterChangeHandler}
              id="sort"
              className=" border-2  text-gray-900 text-sm rounded-lg  w-full p-3.5 focus:outline-none"
            >
              <option value="asc">Low to High</option>
              <option value="dsc">High To Low</option>
            </select>
          </div>
        </div>
        {isOpenFilter && (
          <div>
            <Filters setIsOpenFilter={setIsOpenFilter} />
          </div>
        )}

        {loading ? (
          <ProductsSkeleton />
        ) : (
          <div className="sm:mt-14  p-4 ">
            <div className="flex  flex-wrap  ">
              {products.map((product: IProduct) => {
                return <Product key={product._id} productDetails={product} />;
              })}
            </div>

            {totalPageNumber > 1 ? (
              <div>
                <Pagination
                  page={page}
                  setPage={setPage}
                  total={totalPageNumber}
                />
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
