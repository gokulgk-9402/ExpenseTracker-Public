import React from "react";
import { AiOutlineMore } from "react-icons/ai";

const Category = () => {
  return (
    <div className="w-full h-16 py-4 px-6 rounded-md border-b-2 border-slate-200 gap-4 flex flex-row justify-between items-center">
      <div className=" w-7 h-7 rounded-full bg-yellow-500"></div>
      <div className=" text-slate-300 text-xl">Groceries</div>
      <div className="text-yellow-500 font-thin text-lg">Rs. 2000</div>
      <button className="p-1 text-2xl text-white hover:bg-slate-600 rounded-md">
        <AiOutlineMore />
      </button>
    </div>
  );
};

export default Category;
