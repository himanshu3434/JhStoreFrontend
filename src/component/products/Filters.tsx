import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllCategories } from "../../api/adminApi";
import { updateFilter } from "../../features/filterSlice";
import { RootState } from "../../store/Store";
import { filterHandler } from "../../types/types";
import Button from "../Button";
import Input from "../Input";

function Filters() {
  const { handleSubmit, register } = useForm();
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentFilters = useSelector((state: RootState) => state.filter);
  const getAllCategories = async () => {
    const allCategories = await fetchAllCategories();

    if (allCategories.data.success) {
      setCategories(allCategories.data.data);

      console.log("category all ", allCategories.data.data);
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  const priceFilterChangeHandler = async (data: FieldValues) => {
    dispatch(updateFilter({ data: data, id: "price" }));
    navigate("/products");
  };
  const FilterChangeHandler = async (e: filterHandler) => {
    dispatch(
      updateFilter({
        data: e.target.value,
        id: e.target.id,
      })
    );

    navigate("/products");
  };
  return (
    <div className="h-screen w-[19vw] mt-5  px-2 ">
      <div className="font-bold text-2xl text-center">
        <h1>Filter</h1>
      </div>

      <hr className="my-5" />

      <div className="font-bold  text-xl text-center mb-4">Categories</div>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        id="category"
        onChange={FilterChangeHandler}
        value={currentFilters.category}
      >
        <option value="">None</option>
        {categories?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <hr className="my-3" />

      {/* <div className="space-y-2">
        <div className="font-bold  text-xl text-center mb-4">Rating</div>

        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          id="review"
          onChange={FilterChangeHandler}
        >
          <option value="">None</option>
          <option value="4">⭐⭐⭐⭐ &up</option>
          <option value="3">⭐⭐⭐ &up</option>
          <option value="2">⭐⭐ &up</option>
          <option value="1">⭐ &up</option>
        </select>

        <br />
      </div> */}
      {/* <hr className="py-3" /> */}

      <div>
        <div className="font-bold  text-xl text-center ">Price Range</div>
        <form onSubmit={handleSubmit(priceFilterChangeHandler)}>
          <div className="flex">
            <Input
              label="Min Price :"
              placeholder="Min"
              className=" w-[8vw] bg-gray-300  placeholder-slate-400 rounded-lg px-3 py-2"
              {...register("minPrice", { required: true })}
            />
            <Input
              label="Max Price :"
              placeholder="Max"
              className=" w-[8vw] bg-gray-300  placeholder-slate-400 rounded-lg px-3 py-2"
              {...register("maxPrice", { required: true })}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-sky-500 text-white rounded-lg p-2 mt-3"
          >
            Go
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Filters;
