"use client";

import Topbar from "../components/Topbar";
import SummaryCard from "../components/SummaryCard";
import WeekData from "../components/WeekData";
import Stats from "../components/Stats";
import Footer from "../components/Footer";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Home() {
  // const user = auth.currentUser;
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  // if (user == null || !user.email) return router.push("/login");

  useEffect(() => {
    if (currentUser == null) return router.push("/login");
  });

  const [weekdataRefresh, setWeekDataRefresh] = useState(false);

  if (currentUser == null) return;

  return (
    <div className=" bg-slate-950 min-h-screen w-full flex flex-col items-center">
      <Topbar
        displayName={currentUser?.displayName}
        photoURL={currentUser?.photoURL}
      />
      <SummaryCard
        email={currentUser.email}
        setWeekDataRefresh={setWeekDataRefresh}
        weekDataRefresh={weekdataRefresh}
      />
      <WeekData email={currentUser.email} weekDataRefresh={weekdataRefresh} />
      <Stats email={currentUser.email} refresh={weekdataRefresh} />
      <Footer />
    </div>
  );
}
