import React, { useState } from 'react'
import AuthLayout from "../../components/Layout/AuthLayout";
import { Label } from '@radix-ui/react-label'
import { Input } from "@/components/ui/input"
import { Button } from '../../components/ui/button'
import { useNavigate } from 'react-router-dom'
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) =>{
    e.preventDefault();

    if(email === 'admin@gmail.com' && password==='password')
    {
      navigate("/dashboard")
      console.log("Successfully navigate to the dashboard")
    }
    else
    {
      console.log("Invalid credianls")
    }
  }
  return (
    <>
    <AuthLayout>
      <div className='h-3/4 md:w-[70%] flex flex-col justify-center md:h-full'>
        <h3 className='md:text-xl  font-medium text-[#333333] md:mb-1'>Welcome Back</h3>
        <p className='md:text-sm  text-slate-700 mb-6'>Please enter your details to Access your account</p>

        <form onSubmit={handleLogin} className='space-y-4'>
          <div className='flex flex-col gap-3'>
            <Label className='md:text-lg text-[#333333]'>Email</Label>
            <Input value={email} onChange={(e)=>setEmail(e.target.value)} className="" type ="email" placeholder = "Enter the email"/>
          </div>
          
           <div className='flex flex-col gap-3'>
            <Label className='md:text-lg text-[#333333]'>Password</Label>
            <Input value={password} onChange={(e)=>setPassword(e.target.value)} className="" type ="password" placeholder = "Enter the Password"/>
          </div>

          <Button type="submit">Login</Button>
          <p className='sm:text-sm md:text-base text-[#333333]'>Don't have an account <button onClick={()=>navigate('/signup')} className='text-violet-500 underline cursor-pointer'>SignUp</button></p>
        </form>
      </div>
    </AuthLayout>
    </>
  )
}

export default Login