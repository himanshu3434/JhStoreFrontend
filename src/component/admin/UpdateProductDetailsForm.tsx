import React, { useEffect, useState } from "react";
import { dataType, IProduct } from "../../types/types";
import { Field, FieldValues, useForm } from "react-hook-form";

import { getAllCategories } from "../../utils/utilityFunctions";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import { UpdateProductDetails } from "../../api/adminApi";
import { useNavigate } from "react-router-dom";

function UpdateProductDetailsForm({ productData }: dataType) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: productData.name,
      stock: productData.stock,
      price: productData.price,
      description: productData.description,
      categoryName: productData.categoryName,
    },
  });
  const [categories, setCategories] = useState<string[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAllCategories({ setCategories });
  }, []);

  const onSubmit = async (data: FieldValues) => {
    const updateProductResponse = await UpdateProductDetails(
      data,
      productData._id
    );
    if (updateProductResponse.data.success === true) {
      navigate("/admin/inventory");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="flex flex-col w-[40vw] mx-auto p-5 space-y-5 shadow-lg">
          <Input
            label="Name :"
            placeholder="Product Name"
            className=" rounded-lg py-2 px-3 w-full text-black bg-gray-200 "
            {...register("name", { required: true })}
          />
          <Input
            label="Description :"
            placeholder="Description"
            className=" rounded-lg py-2 px-3 w-full text-black  bg-gray-200"
            {...register("description", { required: true })}
          />
          <Input
            label="Stock :"
            placeholder="Stock"
            className=" rounded-lg py-2 px-3 w-full text-black  bg-gray-200"
            {...register("stock", { required: true })}
          />
          <Input
            label="Price :"
            placeholder="Price"
            className="  rounded-lg py-2 px-3 w-full text-black  bg-gray-200"
            {...register("price", { required: true })}
          />

          <Select
            options={categories}
            label="Categories"
            className="mb-4 "
            {...register("categoryName", { required: true })}
          />
          <Button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-green-500 rounded-lg py-2 "
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProductDetailsForm;
