import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import {
  Timestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import Category from "./Category";
import ExpenseItem from "./ExpenseItem";

type Props = {
  email: string | null;
  refresh: boolean;
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

type ExpenseElement = {
  category: string;
  color: string;
  amount: number;
  desc: string;
  id: string;
};

type ChangeTimeline = (tl: string) => void;

const Stats: React.FC<Props> = ({ email, refresh }) => {
  const [timeline, setTimeline] = useState("Week");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesWithAmount, setCategoriesWithAmount] = useState<
    CategoryWithAmount[]
  >([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  const [expenseData, setExpenseData] = useState<ExpenseElement[]>([]);

  let weekStart = new Date();
  weekStart.setHours(0, 0, 0, 0);
  weekStart.setSeconds(weekStart.getSeconds() - 86400 * weekStart.getDay());
  let weekStartTS = Timestamp.fromDate(weekStart);
  weekStart.setSeconds(weekStart.getSeconds() + 86400 * 7);
  let weekEndTS = Timestamp.fromDate(weekStart);

  const [startTS, setStartTS] = useState<Timestamp>(weekStartTS);
  const [endTS, setEndTS] = useState<Timestamp>(weekEndTS);

  useEffect(() => {
    if (timeline == "Week") {
      let weekStart = new Date();
      weekStart.setHours(0, 0, 0, 0);
      weekStart.setSeconds(weekStart.getSeconds() - 86400 * weekStart.getDay());
      let weekStartTS = Timestamp.fromDate(weekStart);
      setStartTS(weekStartTS);
      weekStart.setSeconds(weekStart.getSeconds() + 86400 * 7);
      let weekEndTS = Timestamp.fromDate(weekStart);
      setEndTS(weekEndTS);
    } else if (timeline === "Month") {
      let monthStart = new Date();
      const daysInMonth = new Date(
        monthStart.getFullYear(),
        monthStart.getMonth() + 1,
        0
      ).getDate();
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);
      let monthStartTS = Timestamp.fromDate(monthStart);
      setStartTS(monthStartTS);
      monthStart.setSeconds(monthStart.getSeconds() + 86400 * daysInMonth);
      let monthEndTS = Timestamp.fromDate(monthStart);
      setEndTS(monthEndTS);
    } else {
      let yearStart = new Date();
      yearStart.setDate(1);
      yearStart.setMonth(0);
      yearStart.setHours(0, 0, 0, 0);
      let yearStartTS = Timestamp.fromDate(yearStart);
      setStartTS(yearStartTS);
      yearStart.setFullYear(yearStart.getFullYear() + 1);
      let yearEndTS = Timestamp.fromDate(yearStart);
      setEndTS(yearEndTS);
    }
  }, [timeline]);

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

      const expenseQuery = query(
        collection(db, `${email}-expenses`),
        where("addedAt", ">=", startTS),
        where("addedAt", "<", endTS)
      );

      const expensesSnapshot = await getDocs(expenseQuery);
      let tempExp: Expense[] = [];
      expensesSnapshot.forEach((doc) => {
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
  }, [refresh, startTS, endTS, email]);

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

  useEffect(() => {
    let categoriesMap: { [id: string]: Category } = {};
    for (let category of categories) {
      categoriesMap[category.id] = category;
    }
    if (selectedCategory == "") {
      setSelectedCategoryName("");
      setExpenseData(
        expenses.map((expense) => {
          return {
            id: expense.id,
            category: categoriesMap[expense.category].title,
            desc: expense.desc,
            color: categoriesMap[expense.category].color,
            amount: expense.amount,
          };
        })
      );
    } else {
      setSelectedCategoryName(categoriesMap[selectedCategory].title);
      setExpenseData(
        expenses
          .filter((expense) => expense.category == selectedCategory)
          .map((expense) => {
            return {
              id: expense.id,
              category: categoriesMap[expense.category].title,
              desc: expense.desc,
              color: categoriesMap[expense.category].color,
              amount: expense.amount,
            };
          })
      );
    }
  }, [categories, expenses, selectedCategory]);

  const handleTimelineClick: ChangeTimeline = (tl) => {
    setTimeline(tl);
  };

  return (
    <div className="w-[calc(100%-2rem)]  h-[calc(100vh-2rem)] mt-10 flex flex-col items-center gap-8 pt-8 rounded-2xl overflow-hidden bg-slate-900 md:bg-transparent md:h-auto">
      <div className=" w-full h-10 gap-4 md:max-w-5xl flex items-center justify-center">
        <div
          className={`bg-slate-800 w-24 h-full text-slate-100 flex items-center justify-center text-lg hover:bg-slate-700 hover: hover:scale-[1.1] rounded-lg transition ease-in-out duration-300 cursor-pointer
          ${timeline === "Week" ? "scale-[1.1]" : ""}
        `}
          onClick={() => handleTimelineClick("Week")}
        >
          Week
        </div>
        <div
          className={`bg-slate-800 w-24 h-full text-slate-100 flex items-center justify-center text-lg hover:bg-slate-700 hover: hover:scale-[1.1] rounded-lg transition ease-in-out duration-300 cursor-pointer
          ${timeline === "Month" ? "scale-[1.1]" : ""}
        `}
          onClick={() => handleTimelineClick("Month")}
        >
          Month
        </div>
        <div
          className={`bg-slate-800 w-24 h-full text-slate-100 flex items-center justify-center text-lg hover:bg-slate-700 hover: hover:scale-[1.1] rounded-lg transition ease-in-out duration-300 cursor-pointer
          ${timeline === "Year" ? "scale-[1.1]" : ""}
        `}
          onClick={() => handleTimelineClick("Year")}
        >
          Year
        </div>
      </div>
      <div className="w-full h-[calc(100%-8.5rem)] gap-4 flex flex-col  md:max-w-5xl md:flex-row md:px-0 md:h-[40rem]">
        <div className=" w-full h-full md:bg-slate-900 md:rounded-2xl md:w-2/5 overflow-auto p-6">
          <h1 className="text-2xl text-slate-200 md:text-4xl mb-4 font-extralight">
            Expenses{selectedCategoryName ? ` - ${selectedCategoryName}` : ""}
          </h1>
          {expenseData.map((expense) => {
            return (
              <ExpenseItem
                category={expense.category}
                desc={expense.desc}
                color={expense.color}
                amount={expense.amount}
                id={expense.id}
                key={expense.id}
              />
            );
          })}

          {/* {categoriesWithAmount.map((category) => {
            return (
              <Category
                title={category.title}
                key={category.id}
                id={category.id}
                color={category.color}
                amount={category.amount}
              />
            );
          })} */}
        </div>
        <div className=" w-full h-full md:bg-slate-900 md:rounded-2xl md:w-3/5 flex flex-col justify-between p-6 gap-2 md:pb-20">
          <h1 className=" text-2xl font-extralight text-slate-300 md:text-4xl">
            {timeline}ly Expenses Chart
          </h1>
          <BarChart
            data={categoriesWithAmount}
            setCategory={setSelectedCategory}
            selected={selectedCategory}
          />
        </div>
      </div>
      {/* <div className=" w-full h-24 bg-slate-700 md:max-w-5xl"></div> */}
    </div>
  );
};

export default Stats;
