import { fetchAllCategories } from "../api/adminApi";
import { setCategoriesType } from "../types/types";

export const getAllCategories = async ({
  setCategories,
}: setCategoriesType) => {
  const allCategories = await fetchAllCategories();
  console.log("category all response ", allCategories);
  if (allCategories.data.success) {
    setCategories(allCategories.data.data);
    console.log("category all ", allCategories.data.data);
  }
};
