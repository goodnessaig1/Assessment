"use client";
import React from "react";
import AuthPage from "../components/common/AuthPage";
import FileUpload from "./Upload";

const page = () => {
  return (
    <AuthPage>
      <FileUpload />
    </AuthPage>
  );
};

export default page;
