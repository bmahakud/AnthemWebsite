/**
 * Site Config — hybrid store.
 *
 * - Public homepage reads from the Django API (/api/site-config/).
 * - Admin panel writes via PATCH /api/site-config/update/ (multipart for video).
 * - localStorage is used as a fast local cache so the page doesn't flash
 *   default values while the API response arrives.
 */

import { API_URL } from "@/lib/config";

export interface SiteConfig {
  id?: number;
  company_name: string;
  hero_heading: string;
  hero_highlight: string;
  hero_subheading: string;
  hero_video?: string | null;    // write-only upload (File object)
  hero_video_url?: string | null; // read-only CDN URL returned by the API
  updated_at?: string;
}

// ─── Legacy keys (camelCase) kept for compatibility ──────────────────────────
export interface SiteConfigLegacy {
  companyName: string;
  heroHeading: string;
  heroHighlight: string;
  heroSubheading: string;
  heroVideoUrl: string;
}

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  company_name: "Anthem Global",
  hero_heading: "Your Vision, Our",
  hero_highlight: "Technology",
  hero_subheading: "From Vision to Reality With AI-Driven IT Services",
  hero_video_url: "/Hero Section Video/Anthem Global.mp4",
};

const STORAGE_KEY = "diracai_site_config_v2";
const API_ENDPOINT = `${API_URL}/api/site-config/`;
const API_UPDATE_ENDPOINT = `${API_URL}/api/site-config/update/`;

// ─── Token helpers (matches project key names) ────────────────────────────────

function getStoredToken(): { access: string; refresh: string } {
  if (typeof window === "undefined") return { access: "", refresh: "" };
  return {
    access:
      localStorage.getItem("access") ||
      localStorage.getItem("access_token") ||
      "",
    refresh:
      localStorage.getItem("refresh") ||
      localStorage.getItem("refresh_token") ||
      "",
  };
}

async function getValidToken(): Promise<string> {
  const { access, refresh } = getStoredToken();
  if (!access) return "";

  // Try to decode expiry without a library
  try {
    const payload = JSON.parse(atob(access.split(".")[1]));
    const expiresSoon = payload.exp && payload.exp * 1000 < Date.now() + 30_000;
    if (!expiresSoon) return access; // Still valid

    // Token expired — try to refresh
    if (!refresh) return access;
    const res = await fetch(`${API_URL}/api/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });
    if (!res.ok) return access; // Refresh failed, try with old token anyway
    const data = await res.json();
    if (data.access) {
      localStorage.setItem("access", data.access);
      localStorage.setItem("access_token", data.access);
      return data.access;
    }
  } catch {
    // Decoding or refresh failed — return whatever we have
  }
  return access;
}

// ─── localStorage helpers ────────────────────────────────────────────────────

export function getCachedConfig(): SiteConfig {
  if (typeof window === "undefined") return DEFAULT_SITE_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SITE_CONFIG;
    return { ...DEFAULT_SITE_CONFIG, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SITE_CONFIG;
  }
}

function setCachedConfig(config: SiteConfig): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

// ─── Broadcast helpers ───────────────────────────────────────────────────────

export function broadcastConfigUpdate(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("site-config-updated"));
  }
}

// ─── Public fetch (used by homepage) ────────────────────────────────────────

export async function fetchSiteConfig(): Promise<SiteConfig> {
  try {
    const res = await fetch(API_ENDPOINT, { cache: "no-store" });
    if (!res.ok) throw new Error("API error");
    const data: SiteConfig = await res.json();
    setCachedConfig(data);
    return data;
  } catch {
    // Fall back to localStorage cache, then defaults
    return getCachedConfig();
  }
}

// ─── Admin save (text fields only) ──────────────────────────────────────────

export async function saveSiteConfigText(
  fields: Partial<Omit<SiteConfig, "hero_video" | "hero_video_url" | "updated_at">>
): Promise<SiteConfig> {
  const token = await getValidToken();
  const res = await fetch(API_UPDATE_ENDPOINT, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(fields),
  });
  if (!res.ok) throw new Error(await res.text());
  const updated: SiteConfig = await res.json();
  setCachedConfig(updated);
  broadcastConfigUpdate();
  return updated;
}

// ─── Admin save with video upload (multipart) ────────────────────────────────

export async function saveSiteConfigWithVideo(
  fields: Partial<Omit<SiteConfig, "hero_video_url" | "updated_at">>,
  videoFile: File | null
): Promise<SiteConfig> {
  const token = await getValidToken();
  const form = new FormData();
  Object.entries(fields).forEach(([k, v]) => {
    if (v !== undefined && v !== null && k !== "hero_video") {
      form.append(k, String(v));
    }
  });
  if (videoFile) form.append("hero_video", videoFile);

  const res = await fetch(API_UPDATE_ENDPOINT, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (!res.ok) throw new Error(await res.text());
  const updated: SiteConfig = await res.json();
  setCachedConfig(updated);
  broadcastConfigUpdate();
  return updated;
}

// ─── Legacy localStorage-only helpers (kept for backward compat) ─────────────

/** @deprecated Use fetchSiteConfig() instead */
export function getSiteConfig(): SiteConfig {
  return getCachedConfig();
}

/** @deprecated Use saveSiteConfigText() or saveSiteConfigWithVideo() */
export function saveSiteConfig(config: Partial<SiteConfig>): void {
  const current = getCachedConfig();
  const updated = { ...current, ...config };
  setCachedConfig(updated);
  broadcastConfigUpdate();
}

export function resetSiteConfig(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  broadcastConfigUpdate();
}

// ─── Hero Video Library ───────────────────────────────────────────────────────

export interface HeroVideoItem {
  id: number;
  media_type: "video" | "image";
  title: string;
  duration: number;       // seconds
  is_selected: boolean;
  order: number;
  video_url: string | null;
  image_url: string | null;
  uploaded_at: string;
}

const HERO_VIDEOS_ENDPOINT = `${API_URL}/api/hero-videos/`;

export async function fetchHeroVideos(selectedOnly = false): Promise<HeroVideoItem[]> {
  try {
    const url = selectedOnly
      ? `${HERO_VIDEOS_ENDPOINT}?selected=true`
      : HERO_VIDEOS_ENDPOINT;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function uploadHeroVideo(
  file: File,
  title = "",
  duration = 8
): Promise<HeroVideoItem> {
  const token = await getValidToken();
  const isImage = file.type.startsWith("image/");
  const form = new FormData();
  form.append(isImage ? "image" : "video", file);
  form.append("media_type", isImage ? "image" : "video");
  form.append("title", title);
  form.append("duration", String(duration));
  const res = await fetch(HERO_VIDEOS_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function updateHeroVideo(
  id: number,
  fields: Partial<Pick<HeroVideoItem, "title" | "duration" | "is_selected" | "order">>
): Promise<HeroVideoItem> {
  const token = await getValidToken();
  const res = await fetch(`${HERO_VIDEOS_ENDPOINT}${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(fields),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deleteHeroVideo(id: number): Promise<void> {
  const token = await getValidToken();
  const res = await fetch(`${HERO_VIDEOS_ENDPOINT}${id}/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.text());
}
