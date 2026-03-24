import { useLocation, Link } from "react-router-dom";
import { User } from "lucide-react";
import { useMe } from "../../hooks/useMe";

export default function Navbar() {
  const location = useLocation();
  const { user, loading } = useMe();

  const pathnames = location.pathname.split("/").filter((x) => x);

  // 🔥 FIX: derive clean name
  const displayName = (() => {
    if (!user) return "User";

    // If name is email → convert to username
    if (user.name && user.name.includes("@")) {
      return user.name.split("@")[0]; // kaka@gmail.com → kaka
    }

    return user.name || user.email || "User";
  })();

  return (
    <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-600">
        {pathnames.map((value, index) => {
          const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;

          return (
            <span key={routeTo} className="flex items-center">
              {isLast ? (
                <span className="text-gray-800 font-semibold capitalize">
                  {value.replace("-", " ")}
                </span>
              ) : (
                <Link to={routeTo} className="hover:text-blue-600 capitalize">
                  {value.replace("-", " ")}
                </Link>
              )}
            </span>
          );
        })}
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm text-gray-500">Welcome</p>

          <p className="font-semibold text-gray-800">
            {loading ? "Loading..." : displayName}
          </p>
        </div>

        <div className="bg-gray-200 p-2 rounded-full">
          <User size={18} />
        </div>
      </div>
    </div>
  );
}
