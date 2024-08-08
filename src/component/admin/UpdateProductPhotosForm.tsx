import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { updateProductPhotos } from "../../api/adminApi";
import { dataType } from "../../types/types";
import Button from "../Button";
import Input from "../Input";

function UpdateProductPhotosForm({ productData }: dataType) {
  const { register, handleSubmit } = useForm();
  const [choice, setChoice] = useState("nothing");
  const navigate = useNavigate();
  const onSubmit = async (data: FieldValues) => {
    const updatePhotoResponse = await updateProductPhotos(
      data,
      choice,
      productData._id
    );

    if (updatePhotoResponse.data.success) {
      navigate("/admin/inventory");
    }
  };
  const handleChoice = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button_id = e.currentTarget.id;
    setChoice(button_id);
  };
  return (
    <div>
      {choice === "nothing" && (
        <div className="mt-5">
          <h1 className="font-bold text-xl text-center uppercase ">
            Select Photo
          </h1>

          <div className="flex  justify-between">
            <div className="w-[15vw] text-center pt-2 pl-2 pr-2 ">
              <img
                src={productData.photo1}
                alt=""
                className="rounded-t-lg min-h-[22.5vh]"
              />
              <Button
                onClick={handleChoice}
                id="photo1"
                className="text-xl bg-yellow-400 p-2 rounded-b-lg hover:bg-yellow-300 text-black hover:text-slate-600 w-full"
              >
                Update
              </Button>
            </div>
            <div className="w-[15vw] text-center pt-2 pl-2 pr-2 ">
              <img
                src={productData.photo2}
                alt=""
                className="rounded-t-lg min-h-[22.5vh]"
              />
              <Button
                onClick={handleChoice}
                id="photo2"
                className="text-xl bg-yellow-400 p-2 rounded-b-lg hover:bg-yellow-300 text-black hover:text-slate-600 w-full"
              >
                Update
              </Button>
            </div>
            <div className="w-[15vw] text-center pt-2 pl-2 pr-2">
              <img
                src={productData.photo3}
                alt=""
                className="rounded-t-lg  min-h-[22.5vh]"
              />
              <Button
                onClick={handleChoice}
                id="photo3"
                className="text-xl bg-yellow-400 p-2 rounded-b-lg hover:bg-yellow-300 text-black hover:text-slate-600 w-full"
              >
                Update
              </Button>
            </div>
            <div className="w-[15vw] text-center pt-2 pl-2 pr-2 ">
              <img
                src={productData.coverPhoto}
                alt=""
                className="rounded-t-lg min-h-[22.5vh]"
              />
              <Button
                onClick={handleChoice}
                id="coverPhoto"
                className="text-xl bg-yellow-400 p-2 rounded-b-lg hover:bg-yellow-300 text-black hover:text-slate-600 w-full"
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      )}

      {choice !== "nothing" && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=""
          encType="multipart/form-data"
        >
          <div className="flex flex-col w-[40vw] mx-auto p-5 space-y-5 shadow-lg">
            <Input
              label="Product Image :"
              type="file"
              className=" bg-gray-200"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("photo1", { required: true })}
            />

            <Button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-green-500 rounded-lg py-2 "
            >
              Update
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default UpdateProductPhotosForm;
