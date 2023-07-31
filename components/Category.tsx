import React from "react";
import { AiOutlineMore } from "react-icons/ai";

type Props = {
  title: string;
  id: string;
  color: string;
  amount: number;
};

const Category: React.FC<Props> = ({
  title = "",
  id = "",
  color = "",
  amount = 0,
}) => {
  return (
    <div className="w-full h-16 py-4 px-6 rounded-md border-b-2 border-slate-200 gap-4 flex flex-row justify-between items-center">
      <div
        className=" w-4 h-4 rounded-full"
        style={{ backgroundColor: color }}
      ></div>
      <div className="flex justify-between flex-1 px-2 gap-2 items-center">
        <div className=" text-slate-300 text-xl flex-1">{title}</div>
        <div className=" font-light text-lg w-16" style={{ color: color }}>
          Rs. {amount}
        </div>
      </div>
      <button className="p-1 text-2xl text-white hover:bg-slate-600 rounded-md">
        <AiOutlineMore />
      </button>
    </div>
  );
};

export default Category;
