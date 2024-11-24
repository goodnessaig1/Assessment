import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
}
const PageLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default PageLayout;
