"use client";

import { useCallback, useMemo } from "react";
import { useAuthContext } from "../context/AuthContext";

export default function useAuth() {
  const ctx = useAuthContext();

  const getToken = useCallback(() => {
    const token =
      localStorage.getItem("access") || localStorage.getItem("access_token");
    return token || null;
  }, []);

  const authFetch = useCallback(async (url, options = {}) => {
    const token = getToken();

    const doFetch = (authType = null) => {
      const headers = { ...(options.headers || {}) };
      if (authType && token) {
        headers.Authorization = `${authType} ${token}`;
      }
      return fetch(url, {
        ...options,
        headers,
        credentials: "include",
      });
    };

    if (!token) {
      return await doFetch();
    }

    let res = await doFetch("JWT");
    if (res.status === 401 || res.status === 403) {
      if (res.status === 403) {
        try {
          const clone = res.clone();
          const json = await clone.json();
          if (json && (json.detail === "Forbidden" || json.detail === "Forbidden.")) {
            return res;
          }
        } catch (e) {
          // ignore
        }
      }
      res = await doFetch("Bearer");
    }
    if (res.status === 401 || res.status === 403) {
      if (res.status === 403) {
        try {
          const clone = res.clone();
          const json = await clone.json();
          if (json && (json.detail === "Forbidden" || json.detail === "Forbidden.")) {
            return res;
          }
        } catch (e) {
          // ignore
        }
      }
      res = await doFetch();
    }
    return res;
  }, [getToken]);

  return useMemo(() => ({ ...ctx, authFetch }), [ctx, authFetch]);
}
