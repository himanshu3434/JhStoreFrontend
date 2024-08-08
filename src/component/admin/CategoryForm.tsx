import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../../api/adminApi";
import { toastError, toastSuccess } from "../../utils/toast";
import Button from "../Button";
import Input from "../Input";
function CategoryForm() {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data: FieldValues) => {
    const categoryAddResponse = await addCategory(data);
    console.log("category add response ", categoryAddResponse);
    if (categoryAddResponse.data.success) {
      toastSuccess("Category Added Successfully");
      navigate("/admin/inventory");
    } else {
      toastError("Category Creation Failed");
    }
  };
  return (
    <div>
      <div className="font-bold text-xl uppercase text-center py-14">
        {" "}
        Add Category
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap justify-center items-center "
      >
        <div className="w-2/3 px-2">
          <Input
            label="Name :"
            placeholder="Category Name"
            className="rounded-lg py-2 px-3 w-full   placeholder-opacity-65  "
            {...register("categoryName", { required: true })}
          />

          <Button
            type="submit"
            className="w-full mt-7 bg-sky-500 rounded-lg py-2 text-white hover:bg-sky-400"
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CategoryForm;
