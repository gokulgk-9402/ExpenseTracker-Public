"use client";

import Topbar from "../components/Topbar";
import SummaryCard from "../components/SummaryCard";
import WeekData from "../components/WeekData";
import Stats from "../components/Stats";
import Footer from "../components/Footer";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const user = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    if (user == null) return router.push("/login");
  });

  return (
    <div className=" bg-slate-950 min-h-screen w-full flex flex-col items-center">
      {user && (
        <Topbar displayName={user?.displayName} photoURL={user?.photoURL} />
      )}
      <SummaryCard />
      <WeekData />
      <Stats />
      <Footer />
    </div>
  );
}
