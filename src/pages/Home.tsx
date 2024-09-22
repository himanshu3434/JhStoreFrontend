import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateFilter } from "../features/filterSlice";

function Home() {
  const dispatch = useDispatch();

  return (
    <div className="relative">
      <div className=" ">
        <img src="./banner3.jpg" alt="" className="xl:h-[37rem] object-cover" />
        <div className="hidden sm:block">
          <Link to="/products">
            <div className="absolute right-[10vw] top-[35vh]  bg-[#ffffff] p-2  px-3 rounded-lg text-[#FBAE3A] hover:text-white hover:bg-green-400 text-2xl">
              Shop Now
            </div>
          </Link>
        </div>
        <div className="sm:hidden flex justify-center">
          <Link to="/products">
            <button className=" p-2  px-3 rounded-lg bg-red-400   hover:bg-green-400 text-white mt-5">
              Shop Now
            </button>
          </Link>
        </div>
        <div className="flex">
          <div className="sm:w-[70vw] w-full  flex flex-col justify-center">
            <div className=" font-bold text-4xl pt-5 text-[#FBAE3A] text-center ">
              Categories
            </div>
            <div className="flex pl-6 flex-col sm:flex-row">
              <Link
                to="/products"
                onClick={() =>
                  dispatch(updateFilter({ data: "Mobile", id: "category" }))
                }
              >
                <div className="sm:w-[20vw] sm:h-[30vh] flex flex-col justify-center items-center  p-5  hover:scale-105 hover:opacity-70">
                  <img
                    src="./banner7.jpg"
                    alt=""
                    className="w-[40vw] sm:w-[10vw] "
                  />
                  <h3 className="font-semibold text-lg">Mobiles</h3>
                </div>
              </Link>

              <Link
                to="/products"
                onClick={() =>
                  dispatch(updateFilter({ data: "Laptop", id: "category" }))
                }
              >
                <div className="sm:w-[20vw] sm:h-[30vh] flex flex-col justify-center items-center  p-5 hover:scale-105 hover:opacity-70">
                  <img
                    src="./banner9.jpg"
                    alt=""
                    className="w-[39vw] sm:w-[9vw]"
                  />
                  <h3 className="font-semibold text-lg">Laptops</h3>
                </div>
              </Link>
              <Link
                to="/products"
                onClick={() =>
                  dispatch(updateFilter({ data: "Watches", id: "category" }))
                }
              >
                <div className="sm:w-[20vw] sm:h-[30vh] flex flex-col justify-center items-center  p-5 hover:scale-105 hover:opacity-70 ">
                  <img
                    src="./banner10.jpg"
                    alt=""
                    className="w-[39vw] sm:w-[9vw]"
                  />
                  <h3 className="font-semibold text-lg  ">Watches</h3>
                </div>
              </Link>
            </div>
          </div>
          <img
            src="
      ./banner6.jpg"
            alt=""
            className=" h-[50vh]  hidden sm:block"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
