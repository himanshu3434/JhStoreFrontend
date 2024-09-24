import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../api/productsApi";
import AdminSideBar from "../../component/admin/AdminSideBar";
import Button from "../../component/Button";
import Pagination from "../../component/Pagination";
import { IProduct } from "../../types/types";

function Inventory() {
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const navigate = useNavigate();
  const [totalPageNumber, setTotalPageNumber] = useState(1);
  const [page, setPage] = useState(1);
  const fetchAllProducts = async () => {
    const getAllProductsResponse = await getAllProducts(page);
    if (getAllProductsResponse.data.success === true) {
      setTotalPageNumber(getAllProductsResponse.data.data.totalPageNumber);

      setAllProducts(getAllProductsResponse.data.data.allProducts);
    }
  };

  const handlerCategory = () => {
    navigate("/admin/inventory/create/category");
  };
  const handlerProduct = () => {
    navigate("/admin/inventory/create/product");
  };
  useEffect(() => {
    fetchAllProducts();
  }, [page]);
  return (
    <div className="flex">
      <div>
        <AdminSideBar selectedItem="Inventory" />
      </div>
      <div>
        <div className="fixed bottom-8 right-8  hover:bg-red-300 rounded-3xl p-3 bg-red-400  cursor-pointer  group ">
          <div className="invisible absolute right-4 bottom-10 group-hover:visible   w-36 bg-blue-300 text-center  leading-loose rounded-md ">
            <div
              className="cursor-pointer text-white hover:text-slate-200"
              onClick={handlerCategory}
            >
              Category
            </div>
            <div
              className="cursore-pointer text-white hover:text-slate-200"
              onClick={handlerProduct}
            >
              Product
            </div>
          </div>
          <FaPlus color="white" />
        </div>
      </div>
      <div>
        <table className=" table-fixed w-full text-center  border-seperate ">
          <thead className="text-xl border-b  border-gray-600 h-[9vh]">
            <tr>
              <th className=""> Name</th>

              <th className="">Stock</th>

              <th className="">Price</th>
              <th className="">Category</th>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {allProducts.length > 0 &&
              allProducts.map((data, index) => {
                return (
                  <tr
                    className={
                      index % 2 !== 0 ? `bg-slate-100  h-[3em] ` : "h-[3em]"
                    }
                    key={data._id}
                  >
                    <td>{data.name}</td>

                    <td>{data.stock}</td>

                    <td>{data.price}</td>
                    <td>{data.categoryName}</td>
                    <td>
                      <Button
                        className=" text-sm text-blue-500 font-bold underline uppercase"
                        onClick={() =>
                          navigate("/admin/updateProduct", {
                            state: { data },
                          })
                        }
                      >
                        Update
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {totalPageNumber > 1 ? (
          <div>
            <Pagination page={page} setPage={setPage} total={totalPageNumber} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Inventory;
