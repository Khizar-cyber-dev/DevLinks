'use client';

import React from "react";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { 
  FiHome, 
  FiGrid, 
  FiBookmark, 
  FiCompass, 
  FiUser, 
  FiSettings, 
  FiLogOut,
} from "react-icons/fi";
import { useAuth } from "@clerk/nextjs";

export interface RouteItem {
  path: string;
  name: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  onClick?: () => void; 
}

export function useRoutes() {
  const pathname = usePathname();
  const { signOut } = useAuth();

  const isActive = useCallback(
    (path: string) => pathname === path,
    [pathname]
  );

  const routes: RouteItem[] = [
    {
      path: "/dashboard",
      name: "Overview",
      icon: React.createElement(FiHome, { className: "text-lg" }),
      activeIcon: React.createElement(FiHome, { className: "text-lg text-blue-400" })
    },
    {
      path: "/dashboard/add-projects",
      name: "Add Projects",
      icon: React.createElement(FiGrid, { className: "text-lg" }),
      activeIcon: React.createElement(FiGrid, { className: "text-lg text-blue-400" })
    },
    {
      path: "/dashboard/bookmarks",
      name: "Saves",
      icon: React.createElement(FiBookmark, { className: "text-lg" }),
      activeIcon: React.createElement(FiBookmark, { className: "text-lg text-blue-400" })
    },
    {
      path: "/dashboard/explore",
      name: "Explore",
      icon: React.createElement(FiCompass, { className: "text-lg" }),
      activeIcon: React.createElement(FiCompass, { className: "text-lg text-blue-400" })
    },
    {
      path: "/dashboard/profile",
      name: "Profile Settings",
      icon: React.createElement(FiUser, { className: "text-lg" }),
      activeIcon: React.createElement(FiUser, { className: "text-lg text-blue-400" })
    },
    // {
    //   path: "/dashboard/settings",
    //   name: "Settings",
    //   icon: React.createElement(FiSettings, { className: "text-lg" }),
    //   activeIcon: React.createElement(FiSettings, { className: "text-lg text-blue-400" })
    // },
    {
      path: "/",
      name: "Logout",
      icon: React.createElement(FiLogOut, { className: "text-lg" }),
      activeIcon: React.createElement(FiLogOut, { className: "text-lg text-blue-400" }),
      onClick: async () => {
        await signOut(); 
      }
    }
  ];

  return { routes, isActive };
}
