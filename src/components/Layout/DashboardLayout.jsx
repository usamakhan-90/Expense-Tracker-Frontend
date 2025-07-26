import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="">
       <Navbar />
      <div>
        <Sidebar />
      </div>
      <div className="grow mx-5">{children}</div>
    </div>
  );
}

export default DashboardLayout;
