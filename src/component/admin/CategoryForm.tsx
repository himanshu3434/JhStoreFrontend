import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../../api/adminApi";
import { toastError, toastSuccess } from "../../utils/toast";
import Button from "../Button";
import Input from "../Input";
import AdminSideBar from "./AdminSideBar";
function CategoryForm() {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data: FieldValues) => {
    const categoryAddResponse = await addCategory(data);

    if (categoryAddResponse.data.success) {
      toastSuccess("Category Added Successfully");
      navigate("/admin/inventory");
    } else {
      toastError("Category Creation Failed");
    }
  };
  return (
    <div className="flex items-center">
      <div>
        <AdminSideBar selectedItem="Inventory" />
      </div>
      <div className="w-[40vw] mx-auto shadow-lg rounded-lg space-y-3 h-[40vh]">
        <div className="font-semibold text-center   opacity-45 mt-5">
          {" "}
          Add Category
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex  justify-center items-center "
        >
          <div className="w-2/3 px-2">
            <Input
              label="Name :"
              placeholder="Category Name"
              className="rounded-lg py-2 px-3 w-full text-black bg-gray-200  "
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
    </div>
  );
}

export default CategoryForm;
