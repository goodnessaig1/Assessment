"use client";
import React, { useEffect } from "react";
import PageLayout from "../components/common/PageLayout";
import Link from "next/link";
import { useAppContext } from "../context/AppContext";
import { useRouter } from "next/navigation";
const HomePage = () => {
  const { isLoggedIn } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/upload-file");
    }
  }, [isLoggedIn]);

  return (
    <PageLayout>
      <div className="min-h-screen bg-center flex flex-col mt-32 items-center px-4">
        <header className="text-center  p-6 rounded-md">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Decentralized File Uploads with Arweave
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Securely upload and store your files on the blockchain with Arweave.
            Experience the power of permanent, decentralized storage for your
            data.
          </p>
        </header>

        <div className="mt-8">
          <Link
            href={"sign-in"}
            className={`px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 ease-in-out shadow-md transform bg-gradient-to-r from-blue-500 to-teal-500 dark:from-purple-500 dark:to-pink-500 hover:scale-105 shadow-lg`}
          >
            Get Started
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default HomePage;
