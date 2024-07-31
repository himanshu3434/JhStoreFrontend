import axios from "axios";

type filterType = {
  search: string;
  category: string;
  sort: string;
  review: string;
  minPrice: string;
  maxPrice: string;
};
export const fetchAllProductsWithFilters = async (filter: filterType) => {
  const FilterUrl = `${import.meta.env.VITE_SERVER_URL}/product/all/filter/1`;

  console.log("filterss", filter);
  const createOptions = {
    method: "POST",
    url: FilterUrl,
    headers: {
      "Content-Type": "application/json",
    },
    data: { ...filter },
  };

  const session = await axios.request(createOptions);

  return session;
};

export const fetchSingleProductUsingId = async (id: string) => {
  const FilterUrl = `${import.meta.env.VITE_SERVER_URL}/product/${id}`;

  const createOptions = {
    method: "GET",
    url: FilterUrl,
  };

  const session = await axios.request(createOptions);

  return session;
};

export const getAllProducts = async (page: number) => {
  const getAllProductUrl = `${
    import.meta.env.VITE_SERVER_URL
  }/product/all/${page}`;

  const createOptions = {
    method: "GET",
    url: getAllProductUrl,
  };

  const getAllProductResponse = await axios.request(createOptions);

  return getAllProductResponse;
};
