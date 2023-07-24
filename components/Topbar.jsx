import Image from "next/image";
import React from "react";

const Topbar = () => {
  return (
    <div className=" w-full h-20 flex flex-row items-center justify-between py-4 px-4 md:max-w-2xl">
      <h6 className=" text-slate-400 font-light text-lg">Hi, Gokul</h6>
      <h1 className=" text-slate-200 text-2xl md:3xl md:font-bold">
        Expense Tracker
      </h1>
      <div className=" h-16 w-16 rounded-full overflow-hidden border-2 border-slate-600 hover:scale-[1.1] transition ease-in-out duration-200 relative">
        <Image
          className=""
          src="https://png.pngtree.com/element_our/png/20181022/man-avatar-icon-professional-man-character-business-man-avatar-carton-symbol-png_206531.jpg"
          objectFit="cover"
          fill={true}
          objectPosition="center"
        />
      </div>
    </div>
  );
};

export default Topbar;
