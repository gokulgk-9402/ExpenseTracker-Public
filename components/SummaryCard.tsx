import React from "react";
import AddExpense from "./AddExpense";

const SummaryCard = () => {
  return (
    <div className="w-[calc(100%-2rem)] h-24 flex flex-row items-center bg-slate-900 mt-10 justify-between py-4 px-6 rounded-2xl md:max-w-5xl md:px-10 hover:bg-slate-800 transition ease-in-out duration-300 hover:scale-[1.02] relative">
      <div>
        <h6 className=" text-slate-400 font-extralight text-lg">This Week</h6>
        <h1 className=" text-slate-200 text-2xl md:text-3xl md:font-bold">
          Rs. 5000
        </h1>
      </div>
      <AddExpense />
    </div>
  );
};

export default SummaryCard;
