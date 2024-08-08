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
const ProfileEditForm = ({ userData, setEditToggle }: editFormType) => {
  const dispatch = useDispatch();

  const date = new Date(userData.dob);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName: userData?.fullName || "",
      mobileNumber: userData?.mobileNumber || "",
      dob: formattedDate || "",
      email: userData?.email || "",
      gender: userData?.gender || "",
    },
  });
  const signup = async (data: FieldValues) => {
    try {
      const updateResponse = await updateProfile(data);

      if (updateResponse.data.success) {
        const userData = updateResponse.data.data;
        dispatch(storeLogin({ userData }));

        setEditToggle(false);
        toastSuccess("Profile Updated SuccessFully");
      } else {
        // handler error
        toastError("Profile Update Failed");
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
            label="Full Name"
            className="rounded-lg py-2 px-3 w-full border-2"
            placeholder="Enter your Full Name"
            {...register("fullName", {
              required: true,
            })}
          />

          <Input
            label="Mobile Number"
            type="tel"
            className="rounded-lg py-2 px-3 w-full mt-2 mb-2 border-2"
            placeholder="Enter your Number "
            {...register("mobileNumber", {
              validate: {
                matchPatern: (value) =>
                  /^[789]\d{9}$/.test(value as string) ||
                  "Mobile number must be a valid number",
              },
            })}
          ></Input>

          <Input
            label="Email Address"
            type="email"
            className="rounded-lg py-2 px-3 w-full mt-2 mb-2 border-2"
            placeholder="Enter your Email address"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          ></Input>

          <Select
            options={["Male", "Female", "Other"]}
            label="Gender"
            className=" "
            {...register("gender", { required: true })}
          />
          <Input
            label="Date of Birth"
            type="date"
            className="rounded-lg py-2 px-3 w-full mt-2 text-black border-2"
            placeholder="enter you Date"
            {...register("dob", {
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

export default ProfileEditForm;
