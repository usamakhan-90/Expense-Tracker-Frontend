import React, { useState } from "react";
import { AppSidebar } from "../CommonComponent/Sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

function DashboardLayout({ children }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1 hidden max-md:block" />
            <h1 className="hidden max-md:block font-medium text-xl">
              Expense Tracker
            </h1>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}

export default DashboardLayout;
