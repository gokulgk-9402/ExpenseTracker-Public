import React from "react";
import { AiOutlineMore } from "react-icons/ai";

type Props = {
  category: string;
  color: string;
  amount: number;
  desc: string;
  id: string;
};

const ExpenseItem: React.FC<Props> = ({
  category = "",
  color = "",
  amount = "",
  desc = "",
  id = "",
}) => {
  return (
    <div className="w-full h-20 py-2 px-3 rounded-md border-b-2 border-slate-200 gap-4 flex flex-row justify-between items-center">
      <div
        className=" w-4 h-4 rounded-full"
        style={{ backgroundColor: color }}
      ></div>
      <div className="flex  flex-col flex-1 px-2 ">
        <div className=" text-slate-300 text-md">{desc}</div>
        <div className=" font-light text-md" style={{ color: color }}>
          Rs. {amount}
        </div>
      </div>
      <button className="p-1 text-2xl text-white hover:bg-slate-600 rounded-md">
        <AiOutlineMore />
      </button>
    </div>
  );
};

export default ExpenseItem;
