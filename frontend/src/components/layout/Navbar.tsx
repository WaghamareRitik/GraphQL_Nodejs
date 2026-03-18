import { useLocation, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { User } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const { user } = useAuth0();

  const pathnames = location.pathname.split("/").filter((x) => x);

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
          <p className="font-semibold text-gray-800">{user?.name || "User"}</p>
        </div>

        {user?.picture ? (
          <img
            src={user.picture}
            alt="profile"
            className="w-9 h-9 rounded-full border"
          />
        ) : (
          <div className="bg-gray-200 p-2 rounded-full">
            <User size={18} />
          </div>
        )}
      </div>
    </div>
  );
}
