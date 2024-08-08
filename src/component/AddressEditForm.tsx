import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateProfile } from "../api/userApi";
import { login as storeLogin } from "../features/authSlice";
import { Iuser } from "../types/types";
import { toastError, toastSuccess } from "../utils/toast";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";
type editFormType = {
  userData: Iuser;
  setEditToggle: React.Dispatch<React.SetStateAction<boolean>>;
};
const AddressEditForm = ({ userData, setEditToggle }: editFormType) => {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      address: userData?.address || "",
      state: userData?.state || "",
      country: userData?.country || "",
      pincode: userData?.pincode || "",
    },
  });
  const signup = async (data: FieldValues) => {
    try {
      const updateResponse = await updateProfile(data);

      if (updateResponse.data.success) {
        const userData = updateResponse.data.data;
        dispatch(storeLogin({ userData }));

        setEditToggle(false);
        toastSuccess("Address Updated Successfully");
      } else {
        toastError("Address Update Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-1/2 flex  justify-center  mx-auto">
      <form onSubmit={handleSubmit(signup)}>
        <div>
          <Input
            label="Address"
            className="rounded-lg py-2 px-3 w-full border-2"
            placeholder="Enter your House No ,Locality ,city"
            {...register("address", {
              required: true,
            })}
          />

          <Input
            label="State"
            type="text"
            className="rounded-lg py-2 px-3 w-full mt-2 mb-2 border-2"
            placeholder="Enter your State "
            {...register("state", {
              required: true,
            })}
          ></Input>

          <Select
            options={["india"]}
            label="Country"
            className=" "
            {...register("country", { required: true })}
          />
          <Input
            label="Pincode"
            type="Number"
            className="rounded-lg py-2 px-3 w-full mt-2 mb-2 border-2"
            placeholder="Enter your pincode "
            {...register("pincode", {
              required: true,
            })}
          ></Input>

          <Button
            type="submit"
            className="bg-sky-500 w-full py-2  mt-4 rounded-lg text-white"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddressEditForm;
