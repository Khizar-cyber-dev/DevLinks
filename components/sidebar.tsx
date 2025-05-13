'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { useRoutes } from "@/hooks/useRoutes";
import { useAuth } from "@clerk/nextjs";

export default function Sidebar() {
  const { signOut } = useAuth();
  const { routes, isActive } = useRoutes();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isMounted, setIsMounted] = useState(false); 

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          <div className="flex items-center h-16 flex-shrink-0 px-6">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Dashboard
            </h1>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {routes.map((route) => (
                <NavItem
                  key={route.path}
                  href={route.path}
                  icon={isActive(route.path) ? (route.activeIcon || route.icon) : route.icon}
                  active={isActive(route.path)}
                  onClick={route.onClick}
                >
                  {route.name}
                </NavItem>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white z-20 shadow-lg p-4 flex  items-center">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
        >
          <FiMenu className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Dashboard
        </h1>
      </div>

      {/* Mobile Sidebar (Drawer) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30">
          <div 
            className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-gray-800 shadow-xl">
            <div className="flex items-center h-16 px-6">
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Dashboard
              </h1>
            </div>
            <div className="flex-1 overflow-y-auto">
              <nav className="px-2 py-4 space-y-1">
                {routes.map((route) => (
                  <MobileNavItem
                    key={route.path}
                    href={route.path}
                    icon={isActive(route.path) ? (route.activeIcon || route.icon) : route.icon}
                    active={isActive(route.path)}
                    onClick={route.name === "Logout" ? 
                      async () => {
                        await signOut();
                        setMobileMenuOpen(false);
                      } : 
                      () => setMobileMenuOpen(false)
                    }
                  >
                    {route.name}
                  </MobileNavItem>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function NavItem({ 
  href, 
  icon, 
  children, 
  active = false,
  onClick
}: { 
  href: string; 
  icon: React.ReactNode; 
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  if (children === "Logout") {
    return (
      <button
        onClick={onClick}
        className={`group flex items-center w-full px-3 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
          active 
            ? 'bg-gray-700 text-white shadow-lg'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
      >
        <span className={`mr-3 flex-shrink-0 ${
          active ? 'text-blue-400' : 'text-gray-400 group-hover:text-blue-400'
        }`}>
          {icon}
        </span>
        {children}
        {active && (
          <span className="ml-auto h-2 w-2 rounded-full bg-blue-500"></span>
        )}
      </button>
    );
  }

  return (
    <Link href={href}>
      <span 
        onClick={onClick}
        className={`group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
          active 
            ? 'bg-gray-700 text-white shadow-lg'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
      >
        <span className={`mr-3 flex-shrink-0 ${
          active ? 'text-blue-400' : 'text-gray-400 group-hover:text-blue-400'
        }`}>
          {icon}
        </span>
        {children}
        {active && (
          <span className="ml-auto h-2 w-2 rounded-full bg-blue-500"></span>
        )}
      </span>
    </Link>
  );
}

function MobileNavItem({ 
  href, 
  icon, 
  children, 
  active = false,
  onClick
}: { 
  href: string; 
  icon: React.ReactNode; 
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  if (children === "Logout") {
    return (
      <button
        onClick={onClick}
        className={`group flex items-center w-full px-3 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
          active 
            ? 'bg-gray-700 text-white shadow-lg'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
      >
        <span className={`mr-3 flex-shrink-0 ${
          active ? 'text-blue-400' : 'text-gray-400 group-hover:text-blue-400'
        }`}>
          {icon}
        </span>
        {children}
        {active && (
          <span className="ml-auto h-2 w-2 rounded-full bg-blue-500"></span>
        )}
      </button>
    );
  }

  return (
    <Link href={href}>
      <span 
        onClick={onClick}
        className={`group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
          active 
            ? 'bg-gray-700 text-white shadow-lg'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
      >
        <span className={`mr-3 flex-shrink-0 ${
          active ? 'text-blue-400' : 'text-gray-400 group-hover:text-blue-400'
        }`}>
          {icon}
        </span>
        {children}
        {active && (
          <span className="ml-auto h-2 w-2 rounded-full bg-blue-500"></span>
        )}
      </span>
    </Link>
  );
}