import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createNewProduct, fetchAllCategories } from "../../api/adminApi";
import { toastError, toastSuccess } from "../../utils/toast";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import AdminSideBar from "./AdminSideBar";
function ProductForm() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const getAllCategories = async () => {
    const allCategories = await fetchAllCategories();

    if (allCategories.data.success) {
      setCategories(allCategories.data.data);
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  const onSubmit = async (data: FieldValues) => {
    data.coverPhoto = data.coverPhoto[0];
    data.photo1 = data.photo1[0];
    data.photo2 = data.photo2[0];
    data.photo3 = data.photo3[0];

    const createProductResponse = await createNewProduct(data);

    if (createProductResponse.data.success) {
      toastSuccess("Product Created Successfully");
      navigate("/admim/inventory");
    } else {
      toastError("Product Creation Failed");
    }
  };
  return (
    <div className="flex">
      <div>
        <AdminSideBar selectedItem="Inventory" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-[40vw] mx-auto shadow-lg p-5 rounded-2xl"
        encType="multipart/form-data"
      >
        <div className=" w-full space-y-5">
          <div className="font-semibold text-center   opacity-45  ">
            Create Product{" "}
          </div>
          <Input
            label="Name :"
            placeholder="Product Name"
            className=" rounded-lg py-2 px-3 w-full text-black bg-gray-200"
            {...register("name", { required: true })}
          />
          <Input
            label="Description :"
            placeholder="Description"
            className=" rounded-lg py-2 px-3 w-full text-black bg-gray-200"
            {...register("description", { required: true })}
          />
          <Input
            label="Stock :"
            placeholder="Stock"
            className=" rounded-lg py-2 px-3 w-full text-black bg-gray-200"
            {...register("stock", { required: true })}
          />
          <Input
            label="Price :"
            placeholder="Price"
            className="  rounded-lg py-2 px-3 w-full text-black bg-gray-200"
            {...register("price", { required: true })}
          />
        </div>
        <div className=" space-y-5 mt-5">
          <Input
            label="Product CoverImage:"
            type="file"
            className=" bg-gray-200 flex "
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("coverPhoto", { required: true })}
          />
          <Input
            label="Product Image1 :"
            type="file"
            className=" bg-gray-200 flex"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("photo1", { required: true })}
          />
          <Input
            label="Product Image2 :"
            type="file"
            className=" bg-gray-200 flex"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("photo2", { required: true })}
          />
          <Input
            label="Product Image3 :"
            type="file"
            className=" bg-gray-200 flex "
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("photo3", { required: true })}
          />

          <Select
            options={categories}
            label="Categories"
            className=""
            {...register("categoryName", { required: true })}
          />
          <Button
            type="submit"
            className="w-full mt-2  bg-sky-500 rounded-lg py-2 text-white hover:bg-sky-400"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
