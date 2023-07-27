"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import Icon from "../../resources/images/rupee.png";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app, auth } from "../../firebase/config";

const provider = new GoogleAuthProvider();

const Login = () => {
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    if (user != null) return router.push("/");
  });

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((re) => {
        const user = auth.currentUser;
        return router.push("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="bg-slate-950 h-screen w-full flex flex-col items-center justify-center">
      <div className="bg-slate-700 w-[400px] p-10 flex items-center flex-col rounded-2xl">
        <Image src={Icon} height={60} width={60} alt="icon" className=" mb-4" />
        <h1 className=" text-slate-300 text-3xl font-mono">Expense Tracker</h1>
        <h6 className=" text-slate-400 text-lg font-light">By Gokul</h6>
        <button
          className=" bg-slate-100 px-4 py-2 mt-10 rounded-lg hover:bg-slate-300 text-slate-900"
          onClick={handleGoogleSignIn}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
