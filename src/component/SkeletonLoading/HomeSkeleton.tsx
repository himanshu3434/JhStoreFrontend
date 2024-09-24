function HomeSkeleton() {
  return (
    <div>
      <div className=" p-6 hidden sm:block">
        <div className="w-full   mt-4 h-[40vh] bg-slate-200 rounded-lg animate-pulse"></div>
        {/* <div className="absolute right-[15vw] top-[40vh]  bg-slate-100 w-[8rem] h-[3rem] rounded-lg animate-pulse "></div> */}

        <div className="flex mt-4">
          <div className="w-[70vw]">
            <div className="  bg-slate-100 w-[16rem] h-[3rem] mx-auto mt-4 rounded-3xl animate-pulse"></div>
            <div className="flex pl-6">
              <div className="w-[20vw] h-[25vh] flex flex-col justify-center items-center   mt-4 rounded-xl">
                <div className="w-[9vw]  h-[17vh] bg-slate-100 rounded-full animate-pulse"></div>
                <div className="w-[60%] h-[20%] bg-slate-100 mt-2 rounded-xl animate-pulse"></div>
              </div>

              <div className="w-[20vw] h-[25vh] flex flex-col justify-center items-center   mt-4  rounded-xl animate-pulse">
                <div className="w-[9vw]  h-[17vh] bg-slate-100 rounded-full"></div>
                <div className="w-[60%] h-[20%] bg-slate-100 mt-2 rounded-xl"></div>
              </div>
              <div className="w-[20vw] h-[25vh] flex flex-col justify-center items-center   mt-4 rounded-xl animate-pulse">
                <div className="w-[9vw]  h-[17vh] bg-slate-100 rounded-full"></div>
                <div className="w-[60%] h-[20%] bg-slate-100 mt-2 rounded-xl"></div>
              </div>
            </div>
          </div>
          <div className="w-[18vw] h-[35vh] bg-slate-100 rounded-full animate-pulse "></div>
        </div>
      </div>

      <div className="sm:hidden p-6">
        <div className="w-full   mt-4 h-[20vh] bg-slate-200 rounded-lg animate-pulse"></div>
        {/* <div className="absolute right-[15vw] top-[40vh]  bg-slate-100 w-[8rem] h-[3rem] rounded-lg animate-pulse "></div> */}
        <div className="  bg-slate-100 w-[8rem] h-[3rem] mx-auto mt-4 rounded-3xl animate-pulse"></div>
        <div className="flex mt-4">
          <div className="w-[80vw] ">
            <div className="  bg-slate-100 w-[16rem] h-[3rem] mx-auto mt-4 rounded-3xl animate-pulse"></div>
            <div className="flex flex-col items-center pl-6">
              <div className="w-[100vw] h-[25vh] flex flex-col justify-center items-center   mt-4 rounded-xl">
                <div className="w-[34vw]  h-[17vh] bg-slate-100 rounded-full animate-pulse"></div>
                <div className="w-[40%] h-[20%] bg-slate-100 mt-2 rounded-xl animate-pulse"></div>
              </div>

              <div className="w-[100vw] h-[25vh] flex flex-col justify-center items-center   mt-4  rounded-xl animate-pulse">
                <div className="w-[34vw]  h-[17vh] bg-slate-100 rounded-full"></div>
                <div className="w-[40%] h-[20%] bg-slate-100 mt-2 rounded-xl"></div>
              </div>
              <div className="w-[100vw] h-[25vh] flex flex-col justify-center items-center   mt-4 rounded-xl animate-pulse">
                <div className="w-[34vw]  h-[17vh] bg-slate-100 rounded-full"></div>
                <div className="w-[40%] h-[20%] bg-slate-100 mt-2 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSkeleton;
