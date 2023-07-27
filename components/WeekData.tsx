"use client";

import React, { useEffect, useState } from "react";
import Category from "./Category";
import WeekDataDoughnutChart from "./WeekDoughnutChart";
import AddCategory from "./AddCategory";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/firebase/config";

type Props = {
  email: string | null;
};

type Category = {
  title: string;
  id: string;
  color: string;
};

const WeekData: React.FC<Props> = ({ email }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [refresh, setRefresh] = useState(false);

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
  }, [refresh]);

  return (
    <div className=" w-[calc(100%-2rem)] h-[calc(130vh-17.5rem)] mt-10 bg-slate-900 rounded-2xl flex flex-col px-4 py-6 gap-4 md:max-w-5xl md:flex-row md:bg-transparent md:px-0 md:h-[40rem]">
      <div className=" w-full h-2/5 md:bg-slate-900 p-2 flex justify-center items-center md:rounded-2xl md:w-1/2 md:h-full md:p-6">
        <WeekDataDoughnutChart />
      </div>
      <div className=" w-full h-3/5 md:bg-slate-900 md:rounded-2xl md:w-1/2 overflow-auto md:h-full">
        <div className=" flex flex-row justify-between bg-slate-700 h-20 py-4 px-4 items-center rounded-2xl md:rounded-none">
          <h1 className="text-2xl text-slate-200">Categories</h1>
          <AddCategory
            email={email}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </div>
        {categories.map((category) => {
          return (
            <Category
              title={category.title}
              key={category.id}
              id={category.id}
              color={category.color}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WeekData;
