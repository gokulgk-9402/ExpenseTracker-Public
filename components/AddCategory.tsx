"use client";

import React, { useState } from "react";
import { SketchPicker, BlockPicker, ChromePicker } from "react-color";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/firebase/config";

const AddCategory = () => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#FFFFFF");

  const handleAddCategory = async () => {
    console.log(title);
    console.log(color);
  };

  return (
    <div className="relative">
      <button
        className=" bg-green-600 px-4 py-2 text-slate-200 rounded-lg"
        onClick={() => setShowCategoryModal(!showCategoryModal)}
      >
        + Add New
      </button>
      <div
        className={`min-h-[25rem] min-w-[25rem] max-h-[32rem] max-w-full absolute right-2 top-12 backdrop-blur-sm rounded-2xl addExpenseModal flex flex-col items-center justify-center gap-8 p-10 border-2 border-slate-700 ${
          showCategoryModal
            ? "opacity-100 translate-y-0 "
            : "opacity-0 pointer-events-none -translate-y-5 "
        } transition-all ease-in-out duration-300`}
      >
        <button
          className=" bg-red-700 text-slate-100 absolute top-2 right-4 w-7 h-7 rounded-full border-2 border-red-200 flex justify-center items-center"
          onClick={() => setShowCategoryModal(false)}
        >
          X
        </button>
        <h1 className=" text-3xl font-bold text-yellow-500">Add Category</h1>
        <input
          className=" w-4/5 rounded-2xl px-6 text-base text-slate-200 py-2 bg-slate-700 placeholder-slate-300 border-none outline-none transition-transform duration-200 focus:scale-105 shadow-sm shadow-slate-300 hover:scale-105"
          placeholder="Category name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ChromePicker color={color} onChange={(color) => setColor(color.hex)} />
        <button
          className="px-6 py-2 bg-green-600 rounded-lg text-slate-200 hover:bg-green-700"
          onClick={handleAddCategory}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddCategory;
