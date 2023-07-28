"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Category from "./Category";
import WeekDataDoughnutChart from "./WeekDoughnutChart";
import AddCategory from "./AddCategory";
import {
  Timestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/config";

type Props = {
  email: string | null;
  weekDataRefresh: boolean;
};

type Category = {
  title: string;
  id: string;
  color: string;
};

type Expense = {
  category: string;
  amount: number;
  desc: string;
  id: string;
};

type CategoryWithAmount = {
  title: string;
  id: string;
  color: string;
  amount: number;
};

const WeekData: React.FC<Props> = ({ email = "", weekDataRefresh = false }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesWithAmount, setCategoriesWithAmount] = useState<
    CategoryWithAmount[]
  >([]);
  const [refresh, setRefresh] = useState(false);

  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const unsubscribe = async () => {
      const categoryQuery = query(collection(db, `${email}-categories`));
      const categoriesSnapshot = await getDocs(categoryQuery);
      let tempCat: Category[] = [];
      categoriesSnapshot.forEach((doc) =>
        tempCat.push({
          id: doc.data().id,
          title: doc.data().title,
          color: doc.data().color,
        })
      );
      setCategories(tempCat);

      let weekStart = new Date();
      console.log(weekStart);
      weekStart.setSeconds(weekStart.getSeconds() - 86400 * weekStart.getDay());
      // weekStart = weekStart.getTime() / 1000;
      // let weekEnd = weekStart + 86400 * 7;

      let weekStartTS = Timestamp.fromDate(weekStart);
      console.log(weekStartTS);
      // let weekEnd = weekStart;
      // weekStart.setSeconds(weekStart.getSeconds() + 86400 * 7);
      // let weekEndTS = Timestamp.fromDate(weekStart);

      console.log("Start: ", weekStartTS);
      // console.log("End: ", weekEndTS);

      // const expenseQuery = query(
      //   collection(db, `${email}-expenses`),
      //   where("addedAt", ">=", weekStartTS)
      // );

      const expenseQuery = query(collection(db, `${email}-expenses`));
      const expensesSnapshot = await getDocs(expenseQuery);
      let tempExp: Expense[] = [];
      expensesSnapshot.forEach((doc) => {
        console.log(doc.data().addedAt);
        console.log(weekStartTS);
        console.log(doc.data().addedAt > weekStartTS);
        tempExp.push({
          id: doc.id,
          category: doc.data().category,
          amount: doc.data().amount,
          desc: doc.data().desc,
        });
      });
      setExpenses(tempExp);
    };

    unsubscribe();
  }, [refresh, weekDataRefresh]);

  useEffect(() => {
    setCategoriesWithAmount(
      categories.map((category) => {
        return {
          id: category.id,
          title: category.title,
          color: category.color,
          amount: expenses
            .filter((expense) => expense.category == category.id)
            .reduce((partialSum, expense) => partialSum + expense.amount, 0),
        };
      })
    );
  }, [categories, expenses]);

  return (
    <div className=" w-[calc(100%-2rem)] h-[calc(130vh-17.5rem)] mt-10 bg-slate-900 rounded-2xl flex flex-col px-4 py-6 gap-4 md:max-w-5xl md:flex-row md:bg-transparent md:px-0 md:h-[40rem]">
      <div className=" w-full h-2/5 md:bg-slate-900 p-2 flex justify-center items-center md:rounded-2xl md:w-1/2 md:h-full md:p-6">
        <WeekDataDoughnutChart data={categoriesWithAmount} />
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
        {categoriesWithAmount.map((category) => {
          return (
            <Category
              title={category.title}
              key={category.id}
              id={category.id}
              color={category.color}
              amount={category.amount}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WeekData;
