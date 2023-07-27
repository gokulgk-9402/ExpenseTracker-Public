"use client";

import { db } from "@/firebase/config";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

type Category = {
  title: string;
  id: string;
  color: string;
};

type Props = {
  email: string | null;
};

const AddExpense: React.FC<Props> = ({ email }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [error, setError] = useState("");

  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("0");

  const [categories, setCategories] = useState<Category[]>([]);

  const handleAddExpense = async () => {
    if (category == "") {
      setError("Category can't be empty");
      return;
    }
    if (desc == "") {
      setError("Description can't be empty");
      return;
    }
    if (amount == "") {
      setError("Amount can't be empty");
      return;
    }
    if (!Number(amount)) {
      setError("Invalid value for amount");
      return;
    }
    await setDoc(doc(db, "userid-expensens", uuidv4()), {
      category: categoryId,
      amount: Number(amount),
      desc: desc,
    });

    setCategory("");
    setCategoryId("");
    setDesc("");
    setAmount("0");
  };

  useEffect(() => {
    const unsubscribe = async () => {
      console.log(email);
      const q = query(collection(db, `${email}-categories`));
      const querySnapshot = await getDocs(q);
      let tempCat: Category[] = [];
      querySnapshot.forEach((doc) =>
        tempCat.push({
          id: doc.data().id,
          title: doc.data().title,
          color: doc.data().color,
        })
      );
      setCategories(tempCat);
    };

    unsubscribe();
  }, [setShowModal]);

  return (
    <div className="relative">
      <button
        className=" bg-green-600 px-4 py-2 text-slate-200 rounded-lg hover:bg-green-800"
        onClick={() => setShowModal(!showModal)}
      >
        + Add New
      </button>
      <div
        className={`min-h-[25rem] min-w-[25rem] max-h-full max-w-full absolute right-2 top-12 backdrop-blur-sm rounded-2xl addExpenseModal flex flex-col items-center justify-center gap-8 p-10 border-2 border-slate-700 ${
          showModal
            ? "opacity-100 translate-y-0 "
            : "opacity-0 pointer-events-none -translate-y-5 "
        } transition-all ease-in-out duration-300`}
      >
        <button
          className=" bg-red-700 text-slate-100 absolute top-2 right-4 w-7 h-7 rounded-full border-2 border-red-200 flex justify-center items-center"
          onClick={() => setShowModal(false)}
        >
          X
        </button>
        <h1 className=" text-3xl font-bold text-yellow-500">Add Expense</h1>
        <div className="w-4/5 relative justify-center items-center transition-transform duration-200 hover:scale-105">
          <div
            className={`w-full rounded-2xl px-6 text-base py-2 bg-slate-700 cursor-pointer border-none outline-none shadow-sm shadow-slate-300 ${
              category != "" ? "text-slate-200" : "text-slate-300"
            }`}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {category ? category : "Category"}
          </div>
          <div
            className={` bg-slate-600 absolute w-full left-0 top-11 rounded-2xl transition-all duration-200 overflow-hidden ${
              showDropdown
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            {categories.map((cat, index) => (
              <div
                className={`w-full text-base text-slate-100 py-2 px-4 hover:bg-slate-500 cursor-pointer flex items-center border-b-2 border-b-slate-100 rounded-2xl
                    ${category === cat.title ? " bg-slate-500" : ""}
                `}
                onClick={() => {
                  if (category === cat.title) {
                    setCategory("");
                    setCategoryId("");
                  } else {
                    setCategory(cat.title);
                    setCategoryId(cat.id);
                  }
                  setShowDropdown(false);
                }}
                key={index}
              >
                <div
                  className={`w-4 h-4 rounded-full mr-2`}
                  style={{ backgroundColor: cat.color }}
                ></div>
                {cat.title}
              </div>
            ))}
          </div>
        </div>
        <input
          className=" w-4/5 rounded-2xl px-6 text-base text-slate-200 py-2 bg-slate-700 placeholder-slate-300 border-none outline-none transition-transform duration-200 focus:scale-105 shadow-sm shadow-slate-300 hover:scale-105"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          className=" w-4/5 rounded-2xl px-6 text-base text-slate-200 py-2 bg-slate-700 placeholder-slate-300 border-none outline-none transition-transform duration-200 focus:scale-105 shadow-sm shadow-slate-300 hover:scale-105"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className="px-6 py-2 bg-green-600 rounded-lg text-slate-200 hover:bg-green-700"
          onClick={handleAddExpense}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddExpense;
