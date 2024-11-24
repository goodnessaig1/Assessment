"use client";
import React, { useEffect } from "react";
import PageLayout from "./PageLayout";
import { useAppContext } from "@/app/context/AppContext";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}
const AuthPage: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const { isLoggedIn } = useAppContext();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/sign-in");
    }
  }, [isLoggedIn]);

  return (
    <PageLayout>
      <div className="">{children}</div>
    </PageLayout>
  );
};

export default AuthPage;
