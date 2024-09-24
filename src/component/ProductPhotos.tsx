import { MouseEvent } from "react";
type productPhotosType = {
  productPhotos: string[];
  photoSwapHandler: (e: MouseEvent<HTMLImageElement>) => void;
};
function ProductPhotos({ productPhotos, photoSwapHandler }: productPhotosType) {
  return (
    <div className="w-full sm:w-[80vw] flex px-3 sm:px-0 my-5 sm:my-0 ">
      <div className="w-[40vw] sm:w-[15vw] space-y-7 ">
        <img
          src={productPhotos[0]}
          alt=""
          id="productPhoto1"
          className="w-[20vw] sm:w-[10vw] rounded-lg cursor-pointer"
          onClick={photoSwapHandler}
        />
        <img
          src={productPhotos[1]}
          alt=""
          id="productPhoto2"
          className="w-[20vw] sm:w-[10vw] rounded-lg cursor-pointer"
          onClick={photoSwapHandler}
        />
        <img
          src={productPhotos[2]}
          alt=""
          id="productPhoto3"
          className="w-[20vw] sm:w-[10vw] rounded-lg cursor-pointer"
          onClick={photoSwapHandler}
        />
      </div>
      <div className="w-[60vw] sm:w-[30vw] flex items-center">
        <img
          src={productPhotos[3]}
          alt=""
          className="w-[50vw] sm:w-[30vw] "
          id="productPhoto4"
        />
      </div>
    </div>
  );
}

export default ProductPhotos;
