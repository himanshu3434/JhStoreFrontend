import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createNewProduct, fetchAllCategories } from "../../api/adminApi";
import { toastError, toastSuccess } from "../../utils/toast";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap mx-3"
      encType="multipart/form-data"
    >
      <div className=" w-full">
        <div className="font-semibold text-center   opacity-45  ">
          Create Product{" "}
        </div>
        <Input
          label="Name :"
          placeholder="Product Name"
          className=" rounded-lg py-1 px-2 w-full   placeholder-opacity-65"
          {...register("name", { required: true })}
        />
        <Input
          label="Description :"
          placeholder="Description"
          className=" rounded-lg py-1 px-2 w-full   placeholder-opacity-65"
          {...register("description", { required: true })}
        />
        <Input
          label="Stock :"
          placeholder="Stock"
          className=" rounded-lg py-1 px-2 w-full   placeholder-opacity-65"
          {...register("stock", { required: true })}
        />
        <Input
          label="Price :"
          placeholder="Price"
          className="  rounded-lg py-1 px-2 w-full   placeholder-opacity-65"
          {...register("price", { required: true })}
        />
      </div>
      <div className=" ">
        <Input
          label="Product CoverImage"
          type="file"
          className=" bg-gray-200"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("coverPhoto", { required: true })}
        />
        <Input
          label="Product Image1 :"
          type="file"
          className=" bg-gray-200"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("photo1", { required: true })}
        />
        <Input
          label="Product Image2 :"
          type="file"
          className=" bg-gray-200"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("photo2", { required: true })}
        />
        <Input
          label="Product Image3 :"
          type="file"
          className=" bg-gray-200"
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
          "Submit"
        </Button>
      </div>
    </form>
  );
}

export default ProductForm;
