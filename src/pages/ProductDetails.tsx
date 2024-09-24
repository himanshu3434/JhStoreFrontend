import { MouseEvent, useEffect, useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { cudToCart, getCartItemQuantity } from "../api/cartApi";
import { fetchSingleProductUsingId } from "../api/productsApi";
import Button from "../component/Button";
import ProductPhotos from "../component/ProductPhotos";
import { RootState } from "../store/Store";
import { Iuser } from "../types/types";
import { toastError, toastSuccess } from "../utils/toast";
const initialState = {
  _id: "",
  name: "",
  description: "",
  stock: "",
  price: "",
  categoryName: "",
  coverPhoto: "",
  photo1: "",
  photo2: "",
  photo3: "",
  createdAt: "",
  updatedAt: "",
};
function ProductDetails() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(initialState);
  const [quantity, setQuantity] = useState(1);
  const [productPhotos, setProductPhotos] = useState(["", "", "", ""]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const navigate = useNavigate();
  const userData = useSelector(
    (state: RootState) => state.auth.userData
  ) as Iuser | null;
  const userStatus = useSelector((state: RootState) => state.auth.status) as
    | boolean
    | false;
  const getProductAndCartQuantityDetails = async () => {
    const productFetchResponse = await fetchSingleProductUsingId(id as string);
    if (productFetchResponse.data.success) {
      const productPhoto1Url = productFetchResponse.data.data.photo1;
      const productPhoto2Url = productFetchResponse.data.data.photo2;
      const productPhoto3Url = productFetchResponse.data.data.photo3;
      const productPhoto4Url = productFetchResponse.data.data.coverPhoto;
      setProductPhotos([
        productPhoto1Url,
        productPhoto2Url,
        productPhoto3Url,
        productPhoto4Url,
      ]);
      setProductDetails(productFetchResponse.data.data);
      const quantityFetchResponse = await getCartItemQuantity(
        (userData as Iuser | null)?._id || "",
        productFetchResponse.data.data._id
      );
      if (quantityFetchResponse.data.success) {
        setCartQuantity(quantityFetchResponse.data.data);
      }
    }
  };
  const addToCartHandler = async () => {
    if (userStatus === true) {
      const data = {
        user_id: userData?._id || "",
        product_id: productDetails._id,
        quantity: quantity,
      };
      if (Number(productDetails.stock) - cartQuantity === 0) return;

      const addToCartResponse = await cudToCart(data);

      if (addToCartResponse.data.success) {
        toastSuccess("Product Added to Cart");
      } else {
        toastError("Cart Operation Failed");
      }
    } else navigate("/login");
  };
  const quantityHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    if (id === "substract") {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    } else {
      if (quantity < Number(productDetails.stock) - cartQuantity) {
        setQuantity((prev) => prev + 1);
      }
    }
  };

  const photoSwapHandler = (e: MouseEvent<HTMLImageElement>) => {
    let photoIndex: number;
    const id = e.currentTarget.id;

    switch (id) {
      case "productPhoto1":
        photoIndex = 0;
        break;
      case "productPhoto2":
        photoIndex = 1;
        break;
      case "productPhoto3":
        photoIndex = 2;
        break;
      default:
        photoIndex = 3;
        break;
    }
    const newProductPhotos = [...productPhotos] as string[];
    [newProductPhotos[photoIndex], newProductPhotos[3]] = [
      newProductPhotos[3],
      newProductPhotos[photoIndex],
    ];
    setProductPhotos(newProductPhotos);
  };
  useEffect(() => {
    getProductAndCartQuantityDetails();
  }, []);
  return (
    <div>
      <div className="text-center text-3xl font-bold my-4">Product Detail</div>
      <div className="flex flex-col sm:flex-row mt-5">
        <ProductPhotos
          productPhotos={productPhotos}
          photoSwapHandler={photoSwapHandler}
        />
        <div>
          <div className="space-y-4">
            <div className="font-semibold text-2xl">{productDetails.name}</div>

            <div className="">{productDetails.description}</div>

            <div className="flex gap-2 items-center ">
              <div className="text-2xl">
                <span className="text-3xl ">₹</span>
                {productDetails.price}
              </div>
              <div className="text-md line-through text-red-500 ">
                ₹
                {Number(productDetails.price) +
                  Number(productDetails.price) / 2}
              </div>
              <div className=" text-md   bg-teal-300 text-white px-2 py-1 rounded-lg">
                Save 50%
              </div>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row  ">
                {/* <div
                  className={`absolute z-10 bg-red-700   py-3  flex items-center w-[46vw] justify-center  text-xl font-bold text-white ${
                    Number(productDetails.stock) - cartQuantity === 0
                      ? "visible"
                      : "invisible"
                  } `}
                >
                  No More Stock Go to Cart
                </div> */}
                <div
                  className={
                    " relative flex space-x-5 w-[30vw] sm:w-[10vw] justify-center items-center  bg-slate-200  rounded-md px-2 py-2 sm:py-1 shadow-sm sm:mr-4  my-2 sm:my-0 "
                  }
                >
                  <Button className="" id="substract" onClick={quantityHandler}>
                    <LuMinus className="" />
                  </Button>
                  <div className="">{quantity}</div>
                  <Button className="" id="add" onClick={quantityHandler}>
                    <LuPlus className="" />
                  </Button>
                </div>
                <Button
                  onClick={addToCartHandler}
                  className={`flex-1  text-white rounded-lg sm:py-2 hover:bg-sky-300 shadow-md text-2xl sm:text-xl font-bold py-4 ${
                    Number(productDetails.stock) - cartQuantity === 0
                      ? "bg-sky-300"
                      : "bg-sky-500"
                  }  `}
                >
                  Add To Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
