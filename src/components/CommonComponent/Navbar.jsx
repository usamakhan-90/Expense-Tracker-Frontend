"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function NavMain({ items, onLogout }) {
  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentItem = items.find(item => item.url === location.pathname);
    if (currentItem) {
      setActive(currentItem.title);
    }
  }, [location.pathname, items]);

  const handleClick = (item) => {
    if (item.title === "Logout") {
      onLogout(); // Call the logout handler
    } else {
      setActive(item.title);
      navigate(item.url);
    }
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton 
              onClick={() => handleClick(item)}
              className={`flex items-center gap-3 ${active === item.title ? 'bg-violet-500 text-white' : ""}`}
            >
              {item.icon && <item.icon className="size-4" />}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}