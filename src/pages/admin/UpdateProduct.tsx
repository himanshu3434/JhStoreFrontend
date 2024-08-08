import { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../../component/Button";
import AdminSideBar from "../../component/admin/AdminSideBar";
import UpdateProductDetailsForm from "../../component/admin/UpdateProductDetailsForm";
import UpdateProductPhotosForm from "../../component/admin/UpdateProductPhotosForm";

function UpdateProduct() {
  const location = useLocation();
  const { data } = location.state;
  const [heading, setHeading] = useState("Product");
  const [choice, setChoice] = useState(1);
  const handleChoice2 = () => {
    setChoice(2);
    setHeading("Details");
  };
  const handleChoice3 = () => {
    setChoice(3);
    setHeading("Photos");
  };
  console.log("   all data is ", data);
  return (
    <div className="flex">
      <div>
        <AdminSideBar selectedItem="Inventory" />
      </div>
      <div className="flex-1 ">
        <h1 className="font-bold text-3xl text-center uppercase ">
          Update {heading}{" "}
        </h1>
        <h3 className="font-semibold text-lg text-center ">{data.name}</h3>

        {choice === 1 && (
          <div className="flex justify-center space-x-6 pt-8">
            <Button
              className="text-xl bg-yellow-400 p-2 rounded-lg hover:bg-yellow-300 text-slate-500"
              onClick={handleChoice2}
            >
              Update Details
            </Button>
            <Button
              className="text-xl bg-sky-400 p-2 rounded-lg hover:bg-sky-300 text-white"
              onClick={handleChoice3}
            >
              Update Photos
            </Button>
          </div>
        )}

        {choice === 2 && <UpdateProductDetailsForm productData={data} />}
        {choice === 3 && <UpdateProductPhotosForm productData={data} />}
      </div>
    </div>
  );
}

export default UpdateProduct;
