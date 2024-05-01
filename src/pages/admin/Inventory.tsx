import React, { lazy, useState } from "react";
import AdminSideBar from "../../component/admin/AdminSideBar";
import { FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { DiVim } from "react-icons/di";
const CategoryForm = lazy(() => import("../../component/admin/CategoryForm"));
const ProductForm = lazy(() => import("../../component/admin/ProductForm"));
function Inventory() {
  const [isOpen, setIsOpen] = useState(false);
  const [formNo, setFormNo] = useState(0);
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handlerCategory = () => {
    setFormNo(1);
    toggleOpen();
  };
  const handlerProduct = () => {
    setFormNo(0);
    toggleOpen();
  };
  return (
    <div className="flex">
      <div>
        <AdminSideBar />
      </div>
      <div className="fixed bottom-8 right-8  hover:bg-red-300 rounded-3xl p-3 bg-red-400  cursor-pointer  group">
        <div className="invisible absolute right-4 bottom-10 group-hover:visible   w-36 bg-blue-300 text-center  leading-loose ">
          <div
            className="cursor-pointer hover:text-white"
            onClick={handlerCategory}
          >
            New Category
          </div>
          <div
            className="cursore-pointer hover:text-white"
            onClick={handlerProduct}
          >
            New Product
          </div>
        </div>
        <FaPlus color="white" />
      </div>

      <div>
        {isOpen && (
          <div className="fixed  inset-0 opacity-75 bg-gray-400   ">
            <div className="absolute right-[30vw] bottom-[10vh]  w-[40vw] h-[80vh] bg-gray-500">
              <div
                className="absolute right-2 top-2  cursor-pointer "
                onClick={toggleOpen}
              >
                <RxCross2 size={20} />
              </div>
              {formNo == 1 ? <CategoryForm /> : <ProductForm />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Inventory;
