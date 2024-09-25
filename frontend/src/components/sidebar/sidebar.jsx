import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Home, Truck, FileText, User, LogOut, Menu, MailCheck } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const logout = async () => {
    try {
      await fetch("/api/v1/logout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const menuItems = [
    { icon: Home, text: "Home", path: "/order" },
    { icon: Truck, text: "Tracking", path: "/tracking" },
    { icon: FileText, text: "Orders", path: "/history" },
    { icon: MailCheck, text: "Chats", path: "/chat" },
    { icon: User, text: "Profile", path: "/profile" },
  ];

  return (
    <div
      className={`h-screen bg-gradient-to-b from-purple-700 to-indigo-800 text-white transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex justify-between items-center p-4">
        {!isCollapsed && <h2 className="text-2xl font-bold">Dashboard</h2>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      <nav className="mt-8">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center p-3 mx-3 rounded-xl transition-all duration-200 ${
                    isActive ? "bg-white text-purple-700" : "hover:bg-white/10"
                  }`}
                >
                  <item.icon
                    className={`w-6 h-6 ${isCollapsed ? "mx-auto" : "mr-4"}`}
                  />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">{item.text}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <button
        onClick={logout}
        className={`flex items-center p-3 mx-3 mt-auto mb-8 bg-red-500 rounded-xl hover:bg-red-600 transition-colors duration-200 ${
          isCollapsed ? "justify-center" : ""
        }`}
      >
        <LogOut className={`w-6 h-6 ${isCollapsed ? "mx-auto" : "mr-4"}`} />
        {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
      </button>
    </div>
  );
};

export default Sidebar;
