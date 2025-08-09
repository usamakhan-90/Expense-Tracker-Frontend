import React, { useRef, useState } from "react";
import AuthLayout from "../../components/Layout/AuthLayout";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { RxPerson } from "react-icons/rx";
import { TbUpload } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
function SignUp() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) =>{
    const file = e.target.files[0];

    if(file)
    {
      if(!file.type.match('image.*'))
      {
        alert('Please select an image file');
        return
      }

      if(file.size > 2 * 1024 * 1024){
        alert("image size should be less than 2MB")
      }

      setSelectedImage(file);

      const reader = new FileReader();
      reader.onloadend = () =>{
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(file)
    }
  };

  const handleUploadClick = () =>{
    fileInputRef.current.click();
  }
  return (
    <>
      <AuthLayout>
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
                {
                  previewImage ? (
                    <img src={previewImage} alt="profile preview" className="size-[100px] rounded-full object-cover" />
                  ) : (<RxPerson className="text-white size-8"/>)
                }
              </div>

              <div
              onClick={handleUploadClick}
               className={`absolute size-[30px] rounded-full ${previewImage ? 'bg-red-500' : 'bg-violet-500'} flex justify-center items-center bottom-0 -right-2 cursor-pointer`}>
                {
                  previewImage ? <MdDeleteOutline className="text-white"/> : <TbUpload className=" text-white"/>
                }
              </div>

              <input type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden" />
            </div>
          </div>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label className="md:text-lg text-[#333333]">Username</Label>
                <Input
                  className=""
                  type="text"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label className="md:text-lg text-[#333333]">Email</Label>
                <Input
                  className=""
                  type="email"
                  placeholder="Enter the email"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Label className="text-lg text-[#333333]">Password</Label>
              <Input
                className=""
                type="password"
                placeholder="Enter the Password"
              />
            </div>
            
            <Button>Login</Button>
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
