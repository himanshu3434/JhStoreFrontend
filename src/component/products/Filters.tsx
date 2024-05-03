import React, { useState, useEffect, ChangeEvent } from "react";
import { fetchAllCategories } from "../../api/adminApi";
import Select from "../Select";
import Input from "../Input";
import Button from "../Button";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../../features/filterSlice";
import { filterHandler } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/Store";

function Filters() {
  const { handleSubmit, register } = useForm();
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentFilters = useSelector((state: RootState) => state.filter);
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
    <div className="h-screen bg-blue-400 w-[17vw] ">
      <div>
        <h1>Filters</h1>
      </div>

      <hr className="my-5" />

      <div>Categories</div>
      <select
        className="text-black"
        id="category"
        defaultValue={currentFilters.category}
        onChange={FilterChangeHandler}
      >
        {categories?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <hr className="my-7" />

      <div className="space-y-2">
        <div>Customer Review</div>

        <select
          className="text-black"
          id="review"
          onChange={FilterChangeHandler}
        >
          <option value="4">⭐⭐⭐⭐ &up</option>
          <option value="3">⭐⭐⭐ &up</option>
          <option value="2">⭐⭐ &up</option>
          <option value="1">⭐ &up</option>
        </select>

        <br />
      </div>
      <hr className="py-5" />

      <div>
        <div>Price Range</div>
        <form onSubmit={handleSubmit(priceFilterChangeHandler)}>
          <Input
            label="Min Price :"
            placeholder="Minimum Price"
            className=" bg-gray-200"
            {...register("minPrice", { required: true })}
          />
          <Input
            label="Max Price :"
            placeholder="Maximum Price"
            className=" bg-gray-200"
            {...register("maxPrice", { required: true })}
          />
          <Button type="submit" className="w-full">
            Go
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Filters;
