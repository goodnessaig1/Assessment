"use client";
import React, { useEffect } from "react";
import SignIn from "./SignIn";
import { useAppContext } from "../context/AppContext";
import { useRouter } from "next/navigation";

const page = () => {
  const { isLoggedIn } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/upload-file");
    }
  }, [isLoggedIn]);

  return (
    <div>
      <SignIn />
    </div>
  );
};

export default page;
