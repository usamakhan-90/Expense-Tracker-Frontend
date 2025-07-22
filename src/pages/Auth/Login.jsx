import React from "react";
import AuthLayout from "../../components/Layout/AuthLayout";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center p-4">
        <h1 className="text-lg font-bold">
          Welcome Back to the Expense Tracker App
        </h1>
        <p className="text-sm font-semibold">
          Please Enter your details for login
        </p>

        <div className="flex flex-1">
          <form className="space-y-2 bg-gray-50 border border-gray-200 shadow-lg p-4 rounded">
            <div>
              <label className="block">Email</label>
              <input
                className="w-full border outline-none px-4 py-1.5"
                type="email"
                placeholder="Enter the email"
                required
              />
            </div>

            <div>
              <label className="block">Password</label>
              <input
                className="w-full border outline-none px-4 py-1.5"
                type="password"
                placeholder="Enter the password"
                required
              />
            </div>

            <button className="bg-blue-500 rounded w-full px-3 py-1 text-white hover:bg-blue-700">
              Login
            </button>
            <p className="text-sm">
              You Don't have an account{" "}
              <button onClick={() => navigate("/signup")} className="hover:un">
                SignUp
              </button>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Login;
