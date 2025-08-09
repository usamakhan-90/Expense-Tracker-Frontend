import React, { useState } from "react";
import AuthLayout from "../../components/Layout/AuthLayout";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setUser(res));
      setTimeout(() => navigate("/dashboard"), 2000);
      toast.success("Login successfully! Redirecting...", {
        position: 'top-right'
      })
      console.log("Login is successfully");
    } catch (error) {
      if(error.data?.message === 'invalid credentials')
      {
        toast.error("Wrong email or password", {
          position: 'top-right'
        })
      }
      else
      {
        toast.error("Login failed. Please try again,", {
          position: 'top-right'
        })
      }
    }

    setEmail("");
    setPassword("");
  };
  return (
    <>
      <AuthLayout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="h-3/4 md:w-[70%] flex flex-col justify-center md:h-full">
          <h3 className="md:text-xl  font-medium text-[#333333] md:mb-1">
            Welcome Back
          </h3>
          <p className="md:text-sm  text-slate-700 mb-6">
            Please enter your details to Access your account
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex flex-col gap-3">
              <Label className="md:text-lg text-[#333333]">Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=""
                type="email"
                placeholder="Enter the email"
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label className="md:text-lg text-[#333333]">Password</Label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=""
                type="password"
                placeholder="Enter the Password"
              />
            </div>

            <Button type="submit">Login</Button>
            <p className="sm:text-sm md:text-base text-[#333333]">
              Don't have an account{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-violet-500 underline cursor-pointer"
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

export default Login;
