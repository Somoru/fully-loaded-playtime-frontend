
import { Link, useLocation } from "react-router-dom";
import { Home, Ticket, User, Bell, Layout } from "lucide-react";

const BottomNav = ({ isAdmin = false }: { isAdmin?: boolean }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = isAdmin ? [
    { path: "/admin", icon: <Layout className="nav-icon" />, label: "Dashboard" },
    { path: "/admin/games", icon: <Ticket className="nav-icon" />, label: "Games" },
    { path: "/admin/notifications", icon: <Bell className="nav-icon" />, label: "Alerts" },
    { path: "/admin/profile", icon: <User className="nav-icon" />, label: "Profile" }
  ] : [
    { path: "/dashboard", icon: <Home className="nav-icon" />, label: "Home" },
    { path: "/tickets", icon: <Ticket className="nav-icon" />, label: "Tickets" },
    { path: "/notifications", icon: <Bell className="nav-icon" />, label: "Alerts" },
    { path: "/profile", icon: <User className="nav-icon" />, label: "Profile" }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-secondary border-t border-gray-800 flex justify-around items-center px-2 z-50">
      {navItems.map((item) => (
        <Link 
          to={item.path} 
          key={item.path}
          className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg ${
            currentPath === item.path 
              ? "text-housie-gold" 
              : "text-gray-400 hover:text-housie-purple"
          }`}
        >
          {item.icon}
          <span className="text-xs mt-1">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNav;
