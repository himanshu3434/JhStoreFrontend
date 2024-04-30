import React, { lazy, useState } from "react";
import AdminSideBar from "../../component/admin/AdminSideBar";
import { FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
const ProductForm = lazy(() => import("../../component/admin/ProductForm"));
function Inventory() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="flex">
      <div>
        <AdminSideBar />
      </div>
      <div
        onClick={toggleOpen}
        className="fixed bottom-8 right-8  bg-red-300 rounded-3xl p-3 hover:bg-red-400  cursor-pointer"
      >
        <FaPlus color="white" />
      </div>

      <div>
        {isOpen && (
          <div className="fixed  inset-0 opacity-75 bg-gray-400   ">
            <div className="absolute right-[30vw] bottom-[10vh]  w-[40vw] h-[80vh] bg-white">
              <div
                className="absolute right-2 top-2  cursor-pointer "
                onClick={toggleOpen}
              >
                <RxCross2 size={20} />
              </div>
              {/* <ProductForm /> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Inventory;
