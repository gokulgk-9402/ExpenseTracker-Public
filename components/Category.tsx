import React from "react";
import { AiOutlineMore } from "react-icons/ai";

type Props = {
  title: string;
  id: string;
  color: string;
};

const Category: React.FC<Props> = ({ title, id, color }) => {
  return (
    <div className="w-full h-16 py-4 px-6 rounded-md border-b-2 border-slate-200 gap-4 flex flex-row justify-between items-center">
      <div
        className=" w-7 h-7 rounded-full"
        style={{ backgroundColor: color }}
      ></div>
      <div className="flex justify-between flex-1 px-2">
        <div className=" text-slate-300 text-xl">{title}</div>
        <div className="text-yellow-500 font-thin text-lg">Rs. 2000</div>
      </div>
      <button className="p-1 text-2xl text-white hover:bg-slate-600 rounded-md">
        <AiOutlineMore />
      </button>
    </div>
  );
};

export default Category;
