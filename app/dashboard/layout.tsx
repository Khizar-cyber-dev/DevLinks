import Sidebar from "@/components/sidebar";
import React from "react";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto pt-16 md:pt-0">
        <div className="h-full">
          {children}
          <Toaster position="top-center" richColors />
        </div>
      </main>
    </div>
  );
}