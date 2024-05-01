import React from "react";
import Button from "../Button";
import Input from "../Input";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import { addCategory } from "../../api/adminApi";
import { useNavigate } from "react-router-dom";
function CategoryForm() {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data: FieldValues) => {
    const categoryAddResponse = await addCategory(data);
    console.log("category add response ", categoryAddResponse);
    if (categoryAddResponse.data.success) {
      navigate("/admin/inventory");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Name :"
          placeholder="Category Name"
          className="mb-4  bg-gray-200"
          {...register("categoryName", { required: true })}
        />

        <Button type="submit" className="w-full">
          "Submit"
        </Button>
      </div>
    </form>
  );
}

export default CategoryForm;
