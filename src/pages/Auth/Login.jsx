import React from "react";
import AuthLayout from "../../components/Layout/AuthLayout";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">
          Welcome Back to the Expense Tracker App
        </h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please Enter your details for login
        </p>

          <form className="space-y-2">
            <div>
              <label className="block text-lg">Email</label>
              <input
                className="w-full border border-slate-200 px-4 py-3 bg-slate-100 flex justify-between mb-4 mt-3 rounded outline-none"
                type="email"
                placeholder="Enter the email"
                required
              />
            </div>

            <div>
              <label className="block text-lg">Password</label>
              <input
                className="w-full border border-slate-200 px-4 py-3 bg-slate-100 flex justify-between mb-4 mt-3 rounded outline-none"
                type="password"
                placeholder="Enter the password"
                required
              />
            </div>

            <button className="bg-violet-500 text-sm shadow-lg shadow-purple-600/5 p-2.5 rounded-md my-1 w-full px-4 py-2 text-white hover:bg-violet-600/15 hover:text-purple-600">
              Login
            </button>
            <p className="text-sm">
              You Don't have an account{" "}
              <button onClick={() => navigate("/signup")} className="underline text-violet-700 mt-3">
                SignUp
              </button>
            </p>
          </form>
        </div>
    </AuthLayout>
  );
}

export default Login;
