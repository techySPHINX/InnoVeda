import React from "react";
import { ThemeToggle } from "@/lib/ThemeProvider";
import { Link, useLocation } from "wouter";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AssessmentIcon from "@mui/icons-material/Assessment";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BarChartIcon from "@mui/icons-material/BarChart";
import { motion } from "framer-motion";

interface DoctorAppLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

const doctorMenuItems = [
  {
    label: "Dashboard",
    icon: <DashboardIcon fontSize="small" />,
    href: "/doctor/dashboard",
  },
  {
    label: "Prakriti Verification",
    icon: <AssessmentIcon fontSize="small" />,
    href: "/doctor/prakriti-verification",
  },
  {
    label: "Diet Chart Generator",
    icon: <RestaurantMenuIcon fontSize="small" />,
    href: "/doctor/diet-chart-generator",
  },
  {
    label: "Monitoring",
    icon: <MonitorHeartIcon fontSize="small" />,
    href: "/doctor/monitoring",
  },
];

export const DoctorAppLayout: React.FC<DoctorAppLayoutProps> = ({
  children,
  showSidebar = true,
}) => {
  const [location] = useLocation();
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {showSidebar && (
        <aside className="bg-sidebar w-full md:w-64 lg:w-72 border-r border-sidebar-border shrink-0 shadow-xl">
          <div className="p-4 h-16 border-b border-sidebar-border flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">TrivedaCare</h1>
            <ThemeToggle />
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {doctorMenuItems.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>
                    <motion.a
                      whileHover={{ scale: 1.04, backgroundColor: "#e3f2fd" }}
                      className={`flex items-center p-2 rounded-lg relative transition-all duration-200 text-sidebar-foreground ${
                        location === item.href
                          ? "font-semibold text-primary"
                          : ""
                      }`}
                    >
                      {location === item.href && (
                        <motion.span
                          layoutId="sidebar-active-indicator"
                          className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          exit={{ scaleY: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </motion.a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border flex items-center justify-between px-4 md:px-6 bg-card">
          <div className="md:hidden">
            {showSidebar && (
              <button className="p-2 rounded-md hover:bg-sidebar-accent/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="flex items-center space-x-1 text-sm font-medium">
                <span>Account</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
};

export default DoctorAppLayout;
