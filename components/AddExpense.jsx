"use client";

import React, { useState } from "react";

const AddExpense = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative">
      <button
        className=" bg-green-600 px-4 py-2 text-slate-200 rounded-lg hover:bg-green-800"
        onClick={() => setShowModal(!showModal)}
      >
        + Add New
      </button>
      {showModal && (
        <div className="min-h-[25rem] min-w-[25rem] max-h-full max-w-full absolute right-2 top-12 backdrop-blur-sm rounded-2xl addExpenseModal flex flex-col items-center justify-center gap-8 p-10 border-4 border-slate-700">
          <h1 className=" text-3xl font-bold text-yellow-500">Add Expense</h1>
          <input
            className=" w-4/5 rounded-2xl px-6 text-base py-2"
            placeholder="Description"
          />
          <input
            className=" w-4/5 rounded-2xl px-6 text-base py-2"
            placeholder="Amount"
          />
          <button className="px-6 py-2 bg-green-600 rounded-lg text-slate-200 hover:bg-green-700">
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default AddExpense;
