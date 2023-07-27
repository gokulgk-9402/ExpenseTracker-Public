import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import AddExpense from "./AddExpense";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/firebase/config";

type Props = {
  email: string | null;
  weekDataRefresh: boolean;
  setWeekDataRefresh: Dispatch<SetStateAction<boolean>>;
};

type Expense = {
  category: string;
  amount: number;
  desc: string;
  id: string;
};

const SummaryCard: React.FC<Props> = ({
  email = "",
  weekDataRefresh = false,
  setWeekDataRefresh = () => {},
}) => {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const unsubscribe = async () => {
      const expenseQuery = query(collection(db, `${email}-expenses`));
      const expensesSnapshot = await getDocs(expenseQuery);
      let tempExp: Expense[] = [];
      expensesSnapshot.forEach((doc) =>
        tempExp.push({
          id: doc.id,
          category: doc.data().category,
          amount: doc.data().amount,
          desc: doc.data().desc,
        })
      );
      setTotal(
        tempExp.reduce((partialSum, temp) => partialSum + temp.amount, 0)
      );
    };

    unsubscribe();
  }, [weekDataRefresh]);

  return (
    <div className="w-[calc(100%-2rem)] h-24 flex flex-row items-center bg-slate-900 mt-10 justify-between py-4 px-6 rounded-2xl md:max-w-5xl md:px-10 hover:bg-slate-800 transition ease-in-out duration-300 relative">
      <div>
        <h6 className=" text-slate-400 font-extralight text-lg">This Week</h6>
        <h1 className=" text-slate-200 text-2xl md:text-3xl md:font-bold">
          Rs. {total}
        </h1>
      </div>
      <AddExpense
        email={email}
        weekDataRefresh={weekDataRefresh}
        setWeekDataRefresh={setWeekDataRefresh}
      />
    </div>
  );
};

export default SummaryCard;
