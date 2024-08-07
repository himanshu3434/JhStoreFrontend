import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateFilter } from "../features/filterSlice";

function Home() {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="absolute inset-0 -z-10">
        <img src="./banner3.jpg" alt="" className=" " />
        <Link to="/products">
          <div className="absolute right-[10vw] top-[35vh]  bg-[#ffffff] p-2  px-3 rounded-lg text-[#FBAE3A] hover:text-white hover:bg-green-400 text-2xl">
            Shop Now
          </div>
        </Link>
        <div className="flex">
          <div className="w-[70vw]">
            <div className=" font-bold text-4xl pt-5 text-[#FBAE3A] text-center ">
              Categories
            </div>
            <div className="flex pl-6">
              <Link
                to="/products"
                onClick={() =>
                  dispatch(updateFilter({ data: "Mobile", id: "category" }))
                }
              >
                <div className="w-[20vw] h-[30vh] flex flex-col justify-center items-center  p-5  hover:scale-105 hover:opacity-70">
                  <img src="./banner7.jpg" alt="" className="w-[10vw] " />
                  <h3 className="font-semibold text-lg">Mobiles</h3>
                </div>
              </Link>

              <Link
                to="/products"
                onClick={() =>
                  dispatch(updateFilter({ data: "Laptop", id: "category" }))
                }
              >
                <div className="w-[20vw] h-[30vh] flex flex-col justify-center items-center  p-5 hover:scale-105 hover:opacity-70">
                  <img src="./banner9.jpg" alt="" className="w-[9vw]" />
                  <h3 className="font-semibold text-lg">Laptops</h3>
                </div>
              </Link>
              <Link
                to="/products"
                onClick={() =>
                  dispatch(updateFilter({ data: "Watches", id: "category" }))
                }
              >
                <div className="w-[20vw] h-[30vh] flex flex-col justify-center items-center  p-5 hover:scale-105 hover:opacity-70 ">
                  <img src="./banner10.jpg" alt="" className="w-[9vw]" />
                  <h3 className="font-semibold text-lg  ">Watches</h3>
                </div>
              </Link>
            </div>
          </div>
          <img
            src="
      ./banner6.jpg"
            alt=""
            className=" h-[50vh] "
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
