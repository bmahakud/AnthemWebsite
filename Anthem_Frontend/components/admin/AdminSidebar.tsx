"use client";

import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Briefcase,
  Globe,
  Package,
  MessageSquare,
  Image as ImageIcon,
  PenLine,
  Calendar,
  Clock,
  FileText,
  Ticket,
  ChevronRight,
  ChevronLeft,
  LogOut,
  Settings,
  Activity,
  X,
  Menu,
} from "lucide-react";

// Nav items that map to ?tab= query params on the dashboard page
const navGroups = [
  {
    label: "Overview",
    items: [
      { tab: "overview", icon: LayoutDashboard, label: "Dashboard", href: "/admin1/dashboard" },
    ],
  },
  {
    label: "People",
    items: [
      { tab: "team", icon: Users, label: "Team" },
      { tab: "employees", icon: UserPlus, label: "Employees" },
    ],
  },
  {
    label: "Content",
    items: [
      { tab: "current-projects", icon: Activity, label: "Private Projects" },
      { tab: "projects", icon: Briefcase, label: "Projects" },
      { tab: "services", icon: Settings, label: "IT Services" },
      { tab: "gis-services", icon: Globe, label: "GIS Services" },
      { tab: "products", icon: Package, label: "Products" },
      { tab: "testimonials", icon: MessageSquare, label: "Testimonials" },
      { tab: "gallery", icon: ImageIcon, label: "Gallery" },
      { tab: "blog", icon: PenLine, label: "Blog" },
    ],
  },
  {
    label: "HR",
    items: [
      { tab: "leave-requests", icon: Calendar, label: "Leave Requests" },
      { tab: "overtime-requests", icon: Clock, label: "Overtime" },
      { tab: "employee-docs", icon: FileText, label: "Documents" },
      { tab: "tickets", icon: Ticket, label: "Tickets" },
    ],
  },
];

interface AdminSidebarProps {
  username?: string;
}

export default function AdminSidebar({ username = "Admin" }: AdminSidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentTab = searchParams?.get("tab") ?? "team";

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh");
    router.replace("/login");
  };

  const isActive = (tab?: string, href?: string) => {
    if (href && href === "/admin1/dashboard" && !searchParams?.get("tab")) return true;
    if (tab) return currentTab === tab;
    return false;
  };

  const getHref = (tab?: string, href?: string) => {
    if (href) return href;
    return `/admin1/dashboard?tab=${tab}`;
  };

  const SidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo + Brand */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${collapsed ? "justify-center px-2" : ""}`}>
        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shrink-0">
          <LayoutDashboard className="w-5 h-5 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden"
            >
              <p className="text-white font-bold text-sm whitespace-nowrap">Anthem Admin</p>
              <p className="text-white/50 text-[10px] whitespace-nowrap">Admin Panel</p>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Collapse toggle — desktop only */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto hidden lg:flex items-center justify-center w-6 h-6 rounded-md bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all shrink-0"
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* User pill */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-3 mt-4 mb-2 flex items-center gap-2.5 bg-white/10 rounded-xl px-3 py-2.5"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {username[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate">{username}</p>
              <p className="text-white/50 text-[10px]">Administrator</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav Groups */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-5 scrollbar-thin scrollbar-thumb-white/10">
        {navGroups.map((group) => (
          <div key={group.label}>
            <AnimatePresence>
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-widest text-white/30"
                >
                  {group.label}
                </motion.p>
              )}
            </AnimatePresence>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.tab, (item as any).href);
                const href = getHref(item.tab, (item as any).href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                  >
                    <motion.div
                      whileHover={{ x: collapsed ? 0 : 3 }}
                      className={`
                        flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 cursor-pointer group
                        ${active
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-900/30"
                          : "text-white/60 hover:text-white hover:bg-white/10"
                        }
                        ${collapsed ? "justify-center px-2.5" : ""}
                      `}
                      title={collapsed ? item.label : undefined}
                    >
                      <item.icon className={`shrink-0 ${active ? "text-white" : "text-white/60 group-hover:text-white"} ${collapsed ? "w-5 h-5" : "w-4 h-4"} transition-colors`} />
                      <AnimatePresence>
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            className="text-sm font-medium whitespace-nowrap overflow-hidden"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {active && !collapsed && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80 shrink-0" />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/10">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-white/60 hover:text-white hover:bg-red-500/20 transition-all duration-200 group ${collapsed ? "justify-center px-2.5" : ""}`}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className="w-4 h-4 shrink-0 group-hover:text-red-400 transition-colors" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="text-sm font-medium whitespace-nowrap overflow-hidden"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-slate-900/98 backdrop-blur-xl border-r border-white/[0.08] z-50 shadow-2xl overflow-hidden"
      >
        {SidebarContent}
      </motion.aside>

      {/* ── Mobile Hamburger ── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg border border-white/10"
      >
        <Menu className="w-5 h-5 text-white" />
      </button>

      {/* ── Mobile Sidebar Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-[260px] bg-slate-900 border-r border-white/[0.08] z-50 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
              >
                <X className="w-4 h-4" />
              </button>
              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
