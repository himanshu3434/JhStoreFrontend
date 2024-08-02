import React, { useState } from "react";
import { dataType } from "../../types/types";
import Input from "../Input";
import Button from "../Button";
import { Field, FieldValues, useForm } from "react-hook-form";

function UpdateProductPhotosForm({ productData }: dataType) {
  const { register, handleSubmit } = useForm();
  const [choice, setChoice] = useState(1);
  const [heading, setHeading] = useState("Select Photo");
  const onSubmit = (data: FieldValues) => {};
  const handleChoice = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button_id = e.currentTarget.id;

    if (button_id === "photo1") {
      setChoice(3);
    } else if (button_id === "photo2") {
      setChoice(4);
    } else if (button_id === "photo3") {
      setChoice(5);
    } else if (button_id === "coverPhoto") {
      setChoice(2);
    }
  };
  return (
    <div>
      {choice === 1 && (
        <div className="mt-5">
          <h1 className="font-bold text-xl text-center uppercase ">
            {heading}
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

      {choice !== 1 && (
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex flex-col w-[40vw] mx-auto p-5 space-y-5 shadow-lg">
            {choice === 2 && (
              <Input
                label="Product CoverImage :"
                type="file"
                className=" bg-gray-200"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("coverPhoto", { required: true })}
              />
            )}
            {choice === 3 && (
              <Input
                label="Product Image1 :"
                type="file"
                className=" bg-gray-200"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("photo1", { required: true })}
              />
            )}
            {choice === 4 && (
              <Input
                label="Product Image2 :"
                type="file"
                className=" bg-gray-200"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("photo2", { required: true })}
              />
            )}
            {choice === 5 && (
              <Input
                label="Product Image3 :"
                type="file"
                className=" bg-gray-200"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("photo3", { required: true })}
              />
            )}
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
