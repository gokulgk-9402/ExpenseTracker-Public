"use client";

import Topbar from "../components/Topbar";
import SummaryCard from "../components/SummaryCard";
import WeekData from "../components/WeekData";
import Stats from "../components/Stats";
import Footer from "../components/Footer";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";

export default function Home() {
  const user = auth.currentUser;
  const router = useRouter();

  if (user == null) return router.push("/login");

  return (
    <div className=" bg-slate-950 min-h-screen w-full flex flex-col items-center">
      <Topbar user={user} />
      <SummaryCard />
      <WeekData />
      <Stats />
      <Footer />
    </div>
  );
}
