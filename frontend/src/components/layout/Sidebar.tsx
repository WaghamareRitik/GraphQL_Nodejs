import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  LogOut,
  Users,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth0();
  const [collapsed, setCollapsed] = useState(false);

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: <FolderKanban size={20} />,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: <CheckSquare size={20} />,
    },
    {
      name: "Users",
      path: "/users",
      icon: <Users size={20} />,
    },
  ];

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } h-screen bg-gray-900 text-gray-200 flex flex-col transition-all duration-300`}
    >
      {/* Top */}
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        {!collapsed && (
          <h1 className="text-lg font-bold text-white">Project Manager</h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 hover:bg-gray-800 rounded"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
              ${active ? "bg-blue-600 text-white" : "hover:bg-gray-800"}`}
            >
              {item.icon}
              {!collapsed && item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={() =>
            logout({
              logoutParams: {
                returnTo: window.location.origin,
              },
            })
          }
          className="flex items-center gap-2 w-full px-3 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition"
        >
          <LogOut size={18} />
          {!collapsed && "Logout"}
        </button>
      </div>
    </div>
  );
}
