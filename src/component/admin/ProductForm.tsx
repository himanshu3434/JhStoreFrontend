import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Input from "../Input";
import Button from "../Button";
import Select from "../Select";
import { fetchAllCategories } from "../../api/adminApi";
function ProductForm(product: FieldValues) {
  const { register, handleSubmit } = useForm();
  const [categories, setCategories] = useState([]);
  const getAllCategories = async () => {
    const allCategories = await fetchAllCategories();
    console.log("category all response ", allCategories);
    if (allCategories.data.success) {
      setCategories(allCategories.data.data);
      console.log("category all ", allCategories.data.data);
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  const onSubmit = async (data: FieldValues) => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap">
      <div className="">
        <Input
          label="Name :"
          placeholder="Product Name"
          className=" bg-gray-200"
          {...register("name", { required: true })}
        />
        <Input
          label="Description :"
          placeholder="Description"
          className=" bg-gray-200"
          {...register("description", { required: true })}
        />
        <Input
          label="Stock :"
          placeholder="Stock"
          className=" bg-gray-200"
          {...register("stock", { required: true })}
        />
        <Input
          label="Price :"
          placeholder="Price"
          className="  bg-gray-200"
          {...register("price", { required: true })}
        />
      </div>
      <div className=" ">
        <Input
          label="Product CoverImage :"
          type="file"
          className=" bg-gray-200"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("coverImage", { required: !product })}
        />
        <Input
          label="Product Image1 :"
          type="file"
          className=" bg-gray-200"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("photo1", { required: !product })}
        />
        <Input
          label="Product Image2 :"
          type="file"
          className=" bg-gray-200"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("photo2", { required: !product })}
        />
        <Input
          label="Product Image3 :"
          type="file"
          className=" bg-gray-200"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("photo3", { required: !product })}
        />
        {/* {product && (
    //   <div className="w-full mb-4">
    //     <img
    //       src={bucketService.getImagePreview(post.featuredImage)}
    //       alt={post.title}
    //       className="rounded-lg"
    //     />
    //   </div>
    )} */}
        <Select
          options={categories}
          label="Categories"
          className="mb-4 bg-gray-500"
          {...register("categoryName", { required: true })}
        />
        <Button
          type="submit"
          bgColor={product ? "bg-green-500" : undefined}
          className="w-full"
        >
          "Submit"
        </Button>
      </div>
    </form>
  );
}

export default ProductForm;
