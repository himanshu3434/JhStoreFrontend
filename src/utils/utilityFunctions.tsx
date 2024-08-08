import { fetchAllCategories } from "../api/adminApi";
import { setCategoriesType } from "../types/types";

export const getAllCategories = async ({
  setCategories,
}: setCategoriesType) => {
  const allCategories = await fetchAllCategories();

  if (allCategories.data.success) {
    setCategories(allCategories.data.data);
  }
};
