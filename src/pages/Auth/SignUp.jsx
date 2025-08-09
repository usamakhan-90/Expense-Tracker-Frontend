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
import { useRegisterMutation } from "../../features/auth/authApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUser } from "../../features/auth/authSlice";
function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register] = useRegisterMutation();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
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
        alert("Please select an image file");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert("image size should be less than 2MB");
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
      toast.error("Please fill in all fields");
      return;
    }

    if (!selectedImage) {
      toast.error("Please upload a profile image");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fullname", formData.fullname);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("file", selectedImage);

      const response = await register(formDataToSend).unwrap();

      dispatch(setUser(response.user));

      toast.success("Registration successfull! Redirecting...");

      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      console.error("Registration error:", error);

      // Handle different error cases
      if (error.data?.message === "Email already exists") {
        toast.error("This email is already registered");
      } else if (error.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("Registration failed. Please try again.");
      }
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
        />
        <div className="h-auto mt-10 md:mt-0 md:w-[100%] flex flex-col justify-center md:h-full">
          <h3 className="md:text-xl  font-medium text-[#333333] md:mb-1">
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
              >
                {previewImage ? (
                  <MdDeleteOutline className="text-white" />
                ) : (
                  <TbUpload className=" text-white" />
                )}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label className="md:text-lg text-[#333333]">Fullname</Label>
                <Input
                  className=""
                  type="text"
                  name = "fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label className="md:text-lg text-[#333333]">Email</Label>
                <Input
                  className=""
                  type="email"
                  name= "email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter the email"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Label className="text-lg text-[#333333]">Password</Label>
              <Input
                className=""
                name= "password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter the Password"
              />
            </div>

            <Button type="submit">Login</Button>
            <p className="sm:text-sm md:text-base text-[#333333]">
              Already have an account{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-violet-500 underline cursor-pointer"
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
