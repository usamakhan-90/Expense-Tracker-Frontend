"use client"

import { CiMoneyCheck1 } from "react-icons/ci";
import { MdOutlineDashboard, MdOutlineLogout } from "react-icons/md";
import { GiExpense } from "react-icons/gi";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { NavMain } from "../CommonComponent/Navbar";

// Menu items.
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
    url: "/login",
    icon: MdOutlineLogout,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarGroupLabel>Expense Tracker</SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
    </Sidebar>
  )
}