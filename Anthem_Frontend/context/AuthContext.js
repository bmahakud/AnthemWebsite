// context/AuthContext.js
"use client";
import { API_URL } from '@/lib/config';
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const AuthContext = createContext({
  user: null,
  loading: true,
  login: async (accessToken) => {},
  logout: () => {},
  refreshUser: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async (access) => {
    if (!access) {
      setUser(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const authHeaders = { Authorization: `Bearer ${access}` };
    try {
      // 1. Try employee endpoint first
      try {
        const empRes = await fetch(`${API_URL}/api/employees/me/`, { headers: authHeaders });
        if (empRes.ok) {
          const data = await empRes.json();
          setUser(data);
          return;
        }
      } catch { /* network error, fall through */ }

      // 2. Try admin dashboard (only if not an employee)
      try {
        const adminRes = await fetch(`${API_URL}/api/admin/dashboard/`, { headers: authHeaders });
        if (adminRes.ok) {
          const data = await adminRes.json();
          setUser(data?.user || data);
          return;
        }
      } catch { /* network error, fall through */ }

      // 3. If both failed, token is invalid or user has no profile
      throw new Error("Failed to fetch user");
    } catch (err) {
      console.error("fetchUser error:", err);
      localStorage.removeItem("access");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // login: store token and fetch user
  const login = useCallback(
    async (access) => {
      if (!access) return;
      localStorage.setItem("access", access);
      // trigger other tabs (storage event)
      try {
        await fetchUser(access);
      } finally {
        // custom event for same-window listeners
        window.dispatchEvent(new Event("authChanged"));
      }
    },
    [fetchUser]
  );

  const logout = useCallback(async () => {
    const refresh =
      localStorage.getItem("refresh") || localStorage.getItem("refresh_token");

    // Detect if the current user is an employee before clearing state
    const isEmployee = !!(user?.employee_id);

    try {
      if (refresh) {
        await fetch(`${API_URL}/api/logout/blacklist/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ refresh_token: refresh }),
        }).catch(() => null);
      }

      await fetch(`${API_URL}/api/logout/`, {
        method: "POST",
        credentials: "include",
      }).catch(() => null);
    } finally {
      localStorage.removeItem("access");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh");
      localStorage.removeItem("refresh_token");
      setUser(null);
      window.dispatchEvent(new Event("authChanged"));
      // Redirect employees to employee login, admins/others to main login
      window.location.href = isEmployee ? "/employee/login" : "/login";
    }
  }, [user]);

  // Refresh user from existing token
  const refreshUser = useCallback(async () => {
    const access = localStorage.getItem("access");
    await fetchUser(access);
  }, [fetchUser]);

  useEffect(() => {
    // initial load
    refreshUser();

    // listen to storage events (other tabs)
    const onStorage = (e) => {
      if (e.key === "access") {
        refreshUser();
      }
    };
    const onAuthChanged = () => {
      refreshUser();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("authChanged", onAuthChanged);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("authChanged", onAuthChanged);
    };
  }, [refreshUser]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// hook to consume
export function useAuthContext() {
  return useContext(AuthContext);
}
