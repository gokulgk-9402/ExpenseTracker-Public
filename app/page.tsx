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

  const [weekdataRefresh, setWeekDataRefresh] = useState(false);

  useEffect(() => {
    if (user == null) return router.push("/login");
  });

  if (user == null || !user.email) return;

  const email = user.email;
  return (
    <div className=" bg-slate-950 min-h-screen w-full flex flex-col items-center">
      <Topbar displayName={user?.displayName} photoURL={user?.photoURL} />
      <SummaryCard
        email={email}
        setWeekDataRefresh={setWeekDataRefresh}
        weekDataRefresh={weekdataRefresh}
      />
      <WeekData email={email} weekDataRefresh={weekdataRefresh} />
      <Stats />
      <Footer />
    </div>
  );
}
