import React from "react";

const Stats = () => {
  return (
    <div className="w-[calc(100%-2rem)]  h-[calc(100vh-2rem)] mt-10 flex flex-col items-center gap-8 pt-4 rounded-2xl overflow-hidden bg-slate-900 md:bg-transparent md:h-auto">
      <div className=" w-full h-10 gap-2 md:max-w-5xl flex items-center justify-center">
        <div className="bg-slate-800 w-24 h-full text-slate-100 flex items-center justify-center text-lg hover:bg-slate-700 hover: hover:scale-[1.1] rounded-lg transition ease-in-out duration-300 cursor-pointer">
          Week
        </div>
        <div className="bg-slate-800 w-24 h-full text-slate-100 flex items-center justify-center text-lg hover:bg-slate-700 hover: hover:scale-[1.1] rounded-lg transition ease-in-out duration-300 cursor-pointer">
          Month
        </div>
        <div className="bg-slate-800 w-24 h-full text-slate-100 flex items-center justify-center text-lg hover:bg-slate-700 hover: hover:scale-[1.1] rounded-lg transition ease-in-out duration-300 cursor-pointer">
          Year
        </div>
      </div>
      <div className="w-full h-[calc(100%-8.5rem)] gap-4 flex flex-col  md:max-w-5xl md:flex-row md:px-0 md:h-[40rem]">
        <div className=" w-full h-full bg-slate-500 md:bg-slate-900 md:rounded-2xl md:w-2/5"></div>
        <div className=" w-full h-full bg-slate-500 md:bg-slate-900 md:rounded-2xl md:w-3/5"></div>
      </div>
      <div className=" w-full h-24 bg-slate-700 md:max-w-5xl"></div>
    </div>
  );
};

export default Stats;
