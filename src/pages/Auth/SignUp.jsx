import React, { useRef, useState } from "react";
import AuthLayout from "../../components/Layout/AuthLayout";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { RxPerson } from "react-icons/rx";
import { TbUpload } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useLazyGetProfileQuery, useLoginMutation, useRegisterMutation } from "../../features/auth/authApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUser } from "../../features/auth/authSlice";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const [triggerGetProfile] = useLazyGetProfileQuery();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.match("image.*")) {
        toast.warning("Please select an image file", {
          position: "top-right",
          theme: "colored"
        });
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        toast.warning("Image size should be less than 2MB", {
          position: "top-right",
          theme: "colored"
        });
        return;
      }

      setSelectedImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullname || !formData.email || !formData.password) {
      toast.error("Please fill in all fields", {
        position: "top-right",
        theme: "colored"
      });
      return;
    }

    if (!selectedImage) {
      toast.error("Please upload a profile image", {
        position: "top-right",
        theme: "colored"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address", {
        position: "top-right",
        theme: "colored"
      });
      return;
    }

    // Password validation (at least 6 characters)
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long", {
        position: "top-right",
        theme: "colored"
      });
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fullname", formData.fullname);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("file", selectedImage);

      // Show loading toast
      const toastId = toast.loading("Creating your account...", {
        position: "top-right"
      });

      await register(formDataToSend).unwrap();

      toast.update(toastId, {
        render: "Account created! Logging you in...",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
      });

      await login({ email: formData.email, password: formData.password }).unwrap();

      const user = await triggerGetProfile().unwrap();
      dispatch(setUser(user));

      toast.success("Registration successful! Redirecting to dashboard...", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
      });

      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      console.error("Registration error:", error);

      // Handle different error cases
      if (error.data?.message === "Email already exists") {
        toast.error("This email is already registered. Please try logging in.", {
          position: "top-right",
          theme: "colored"
        });
      } else if (error.data?.message) {
        toast.error(error.data.message, {
          position: "top-right",
          theme: "colored"
        });
      } else {
        toast.error("Registration failed. Please try again.", {
          position: "top-right",
          theme: "colored"
        });
      }
    } finally {
      setIsLoading(false);
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
        <div className="h-auto mt-10 md:mt-0 md:w-[100%] flex flex-col justify-center md:h-full">
          <h3 className="md:text-xl font-medium text-[#333333] md:mb-1">
            Create An Account
          </h3>
          <p className="md:text-sm text-slate-700 mb-6">
            Join us today by entering your details below
          </p>

          <div className="flex justify-center items-center mb-6">
            <div className="relative">
              <div className="size-[100px] rounded-full bg-violet-300 flex justify-center items-center">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="profile preview"
                    className="size-[100px] rounded-full object-cover"
                  />
                ) : (
                  <RxPerson className="text-white size-8" />
                )}
              </div>

              <div
                onClick={previewImage ? handleRemoveImage : handleUploadClick}
                className={`absolute size-[30px] rounded-full ${
                  previewImage ? "bg-red-500" : "bg-violet-500"
                } flex justify-center items-center bottom-0 -right-2 cursor-pointer`}
                disabled={isLoading}
              >
                {previewImage ? (
                  <MdDeleteOutline className="text-white" />
                ) : (
                  <TbUpload className="text-white" />
                )}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
                disabled={isLoading}
              />
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label className="md:text-lg text-[#333333]">Fullname</Label>
                <Input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label className="md:text-lg text-[#333333]">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Label className="text-lg text-[#333333]">Password</Label>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password (min. 6 characters)"
                disabled={isLoading}
              />
            </div>

            <Button 
              className="w-full transition-all duration-300 bg-violet-600 hover:bg-violet-700" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                "Register"
              )}
            </Button>
            
            <p className="sm:text-sm md:text-base text-[#333333] text-center pt-4">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-violet-600 hover:text-violet-800 font-medium transition-colors duration-300 cursor-pointer"
                disabled={isLoading}
              >
                Login
              </button>
            </p>
          </form>
        </div>
      </AuthLayout>
    </>
  );
}

export default SignUp;