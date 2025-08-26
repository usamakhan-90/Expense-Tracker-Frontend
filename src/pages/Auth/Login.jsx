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
  const [isLoading, setIsLoading] = useState(false);

  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast.warning("Please fill in all fields", {
        position: "top-right",
        theme: "colored"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setUser(res));
      
      toast.success("Login successful! Redirecting to dashboard...", {
        position: "top-right",
        theme: "colored",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      if (error.data?.message === 'invalid credentials') {
        toast.error("Wrong email or password. Please try again.", {
          position: "top-right",
          theme: "colored"
        });
      } else {
        toast.error("Login failed. Please try again.", {
          position: "top-right",
          theme: "colored"
        });
      }
    } finally {
      setIsLoading(false);
      setEmail("");
      setPassword("");
    }
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
          theme="colored"
        />
        <div className="h-3/4 md:w-[70%] flex flex-col justify-center md:h-full">
          <h3 className="md:text-xl font-medium text-[#333333] md:mb-1">
            Welcome Back
          </h3>
          <p className="md:text-sm text-slate-700 mb-6">
            Please enter your details to access your account
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex flex-col gap-3">
              <Label className="md:text-lg text-[#333333]">Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label className="md:text-lg text-[#333333]">Password</Label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full transition-all duration-300 bg-violet-600 hover:bg-violet-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </Button>
            
            <p className="sm:text-sm md:text-base text-[#333333] text-center pt-4">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="text-violet-600 hover:text-violet-800 font-medium transition-colors duration-300 cursor-pointer"
                disabled={isLoading}
              >
                Sign Up
              </button>
            </p>
          </form>
        </div>
      </AuthLayout>
    </>
  );
}

export default Login;