"use client";
import { useAppContext } from "@/app/context/AppContext";
import React from "react";
import Connect from "../Connect/Connect";
import Header from "../common/Header";
import FileUpload from "../Upload/Upload";

const HomePage = () => {
  const { loggedIn } = useAppContext();

  return (
    <div>
      <Header />
      {loggedIn ? (
        <div className="flex w-full">
          <FileUpload />
        </div>
      ) : (
        <Connect />
      )}
    </div>
  );
};

export default HomePage;
