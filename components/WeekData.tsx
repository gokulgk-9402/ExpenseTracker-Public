import React from "react";
import Category from "./Category";
import WeekDataDoughnutChart from "./WeekDoughnutChart";
import AddCategory from "./AddCategory";

const WeekData = () => {
  return (
    <div className=" w-[calc(100%-2rem)] h-[calc(130vh-17.5rem)] mt-10 bg-slate-900 rounded-2xl flex flex-col px-4 py-6 gap-4 md:max-w-5xl md:flex-row md:bg-transparent md:px-0 md:h-[40rem]">
      <div className=" w-full h-2/5 md:bg-slate-900 p-2 flex justify-center items-center md:rounded-2xl md:w-1/2 md:h-full md:p-6">
        <WeekDataDoughnutChart />
      </div>
      <div className=" w-full h-3/5 md:bg-slate-900 md:rounded-2xl md:w-1/2 overflow-auto md:h-full">
        <div className=" flex flex-row justify-between bg-slate-700 h-20 py-4 px-4 items-center rounded-2xl md:rounded-none">
          <h1 className="text-2xl text-slate-200">Categories</h1>
          <AddCategory />
        </div>
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
      </div>
    </div>
  );
};

export default WeekData;
