"use client";

import Topbar from "../components/Topbar";
import SummaryCard from "../components/SummaryCard";
import WeekData from "../components/WeekData";
import Stats from "../components/Stats";
import Footer from "../components/Footer";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const user = auth.currentUser;
  const router = useRouter();

  // if (user == null || !user.email) return router.push("/login");

  useEffect(() => {
    if (user == null) return router.push("/login");
  });

  const [weekdataRefresh, setWeekDataRefresh] = useState(false);

  if (user == null) return;

  return (
    <div className=" bg-slate-950 min-h-screen w-full flex flex-col items-center">
      <Topbar displayName={user?.displayName} photoURL={user?.photoURL} />
      <SummaryCard
        email={user.email}
        setWeekDataRefresh={setWeekDataRefresh}
        weekDataRefresh={weekdataRefresh}
      />
      <WeekData email={user.email} weekDataRefresh={weekdataRefresh} />
      <Stats email={user.email} refresh={weekdataRefresh} />
      <Footer />
    </div>
  );
}
