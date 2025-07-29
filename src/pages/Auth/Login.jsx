import React from "react";
import AuthLayout from "../../components/Layout/AuthLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (
    <>
      <AuthLayout>
        <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
          <h3 className="text-xl font-medium text-black">Welcome Back</h3>
          <p className="text-xs text-slate-700 mt-[5px] mb-6">
            Please enter your details to log in
          </p>

          <form className="space-y-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="email">Email Address</Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>

             <div className="flex flex-col gap-3">
              <Label htmlFor="email">Password</Label>
              <Input type="password" id="email" placeholder="Enter the password" />
            </div>
            <Button>Login</Button>
            <p className="text-sm text-black">Don't have an account? <button onClick={()=>navigate("/signup")} className="text-violet-500 underline cursor-pointer">Signup</button></p>
          </form>
        </div>
      </AuthLayout>
    </>
  );
}

export default Login;
