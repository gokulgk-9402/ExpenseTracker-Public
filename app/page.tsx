import Image from "next/image";
import Topbar from "../components/Topbar";
import SummaryCard from "../components/SummaryCard";
import WeekData from "../components/WeekData";
import Stats from "../components/Stats";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className=" bg-slate-950 min-h-screen w-full flex flex-col items-center">
      <Topbar />
      <SummaryCard />
      <WeekData />
      <Stats />
      <Footer />
    </div>
  );
}
