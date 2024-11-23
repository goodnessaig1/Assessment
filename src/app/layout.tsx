import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThirdwebProvider from "./context/ThirdwebProvider";
import { AppProvider } from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "GruveWeb3 Assessment",
  description: "My auth application with thirdweb and arweave",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThirdwebProvider>
        <AppProvider>
          <body className="font-dancing">
            <ToastContainer />
            {children}
          </body>
        </AppProvider>
      </ThirdwebProvider>
    </html>
  );
}
