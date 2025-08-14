"use client";

import { CiMoneyCheck1 } from "react-icons/ci";
import { MdOutlineDashboard, MdOutlineLogout } from "react-icons/md";
import { GiExpense } from "react-icons/gi";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { NavMain } from "../CommonComponent/Navbar";
import { useGetProfileQuery, useLogoutMutation } from "../../features/auth/authApi";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch } from "react-redux";
import { clearUser } from "../../features/auth/authSlice"; // Import your clearUser action
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const navItems = [
  {
    id: 12332,
    title: "Dashboard",
    url: "/dashboard",
    icon: MdOutlineDashboard,
  },
  {
    id: 332323,
    title: "Income",
    url: "/income",
    icon: CiMoneyCheck1,
  },
  {
    id: 323212,
    title: "Expense",
    url: "/expense",
    icon: GiExpense,
  },
  {
    id: 113311,
    title: "Logout",
    url: "/logout", // Changed to /logout to distinguish it
    icon: MdOutlineLogout,
  },
];

export function AppSidebar() {
  const { data: response, isLoading, isError } = useGetProfileQuery();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = response?.user;
  const profilePic = user?.profilePic?.[0]?.url || user?.profilePic?.[0];

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearUser()); // Clear user from Redux store
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", error);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarGroupLabel>Expense Tracker</SidebarGroupLabel>
        <div className="flex justify-center items-center mt-4">
          <div className="size-28 rounded-full border border-gray-600 overflow-hidden relative">
            {isLoading ? (
              <Skeleton className="w-full h-full rounded-full" />
            ) : isError ? (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Error loading image</span>
              </div>
            ) : profilePic ? (
              <img
                src={profilePic}
                alt="Profile picture"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/112";
                }}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No image</span>
              </div>
            )}
          </div>
        </div>
        {user?.fullname && (
          <p className="text-center mt-2 font-medium">{user.fullname}</p>
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} onLogout={handleLogout} />
      </SidebarContent>
    </Sidebar>
  );
}