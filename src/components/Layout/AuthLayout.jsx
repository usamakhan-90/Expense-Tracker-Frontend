import React from "react";
import home from "../../assets/images/home.jpeg";
function AuthLayout({ children }) {
  return (
    <>
      <div className="flex">
        <div className="md:w-[60vw] w-screen h-screen px-12 pt-8 pb-12">
          <h1 className="md:text-2xl  font-medium text-black">Expense Tracker</h1>
          {children}
        </div>

        <div className="w-[40vw] hidden md:flex justify-center items-center bg-violet-500  bg-cover overflow-hidden p-8">
          <img className="lg:w-[90%] w-64 rounded-lg" src={home} alt="" />
        </div>
      </div>
    </>
  );
}

export default AuthLayout;
