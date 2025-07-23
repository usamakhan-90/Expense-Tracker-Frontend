import React from "react";
import AuthLayout from "../../components/Layout/AuthLayout";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  return (
    <>
      <AuthLayout>
        <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-black">
            Create an Account
          </h3>
          <p className="text-xs text-slate-700 mt-[5px] mb-6">
            Join us today by entering your details below
          </p>

          <form className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-lg">Name</label>
                <input
                  className="w-full border border-slate-200 px-4 py-3 bg-slate-100 flex justify-between mb-4 mt-3 rounded outline-none"
                  type="text"
                  placeholder="Enter the Name"
                  required
                />
              </div>

              <div>
                <label className="block text-lg">Email</label>
                <input
                  className="w-full border border-slate-200 px-4 py-3 bg-slate-100 flex justify-between mb-4 mt-3 rounded outline-none"
                  type="email"
                  placeholder="Enter the email"
                  required
                />
              </div>
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
              Do you have an account{" "}
              <button
                onClick={() => navigate("/login")}
                className="underline text-violet-700 mt-3"
              >
                SignUp
              </button>
            </p>
          </form>
        </div>
      </AuthLayout>
    </>
  );
}

export default SignUp;
