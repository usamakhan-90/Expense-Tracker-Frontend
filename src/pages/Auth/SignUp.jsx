import React from "react";
import AuthLayout from "../../components/Layout/AuthLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const navigate = useNavigate();
  return (
    <>
      <AuthLayout>
        <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
          <h3 className="text-xl font-medium text-black">Create An Account</h3>
          <p className="text-xs text-slate-700 mt-[5px] mb-6">
            Join us today by entering your details below.
          </p>

          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-3">
                <Label htmlFor="text">Full Name</Label>
                <Input
                  type="text"
                  id="text"
                  placeholder="Enter the full Name"
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="email">Email Address</Label>
                <Input type="email" id="email" placeholder="Email" />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="email">Password</Label>
              <Input
                type="password"
                id="email"
                placeholder="Enter the password"
              />
            </div>
            <Button>Login</Button>
            <p className="text-sm text-black">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-violet-500 underline cursor-pointer"
              >
                Signup
              </button>
            </p>
          </form>
        </div>
      </AuthLayout>
    </>
  );
}

export default SignUp;
