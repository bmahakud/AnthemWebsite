"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

// Simple layout — no sidebar. Navigation is handled by the horizontal tab bar inside each page.
export default function Admin1Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (auth.loading) return;
    const token = localStorage.getItem("access") || localStorage.getItem("access_token");
    if (!token) {
      router.replace("/login");
      return;
    }
    if ((auth as any)?.user?.employee_id) {
      router.replace("/employee/dashboard");
    }
  }, [auth, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/10">
      {children}
    </div>
  );
}
