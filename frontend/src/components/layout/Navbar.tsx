import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { User } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const { user } = useAuth();

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-600">
        {/* <Link to="/dashboard" className="hover:text-blue-600 font-medium">
          Dashboard
        </Link> */}

        {pathnames.map((value, index) => {
          const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;

          return (
            <span key={routeTo} className="flex items-center">
              {/* <span className="mx-2">/</span> */}

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

        <div className="bg-gray-200 p-2 rounded-full">
          <User size={18} />
        </div>
      </div>
    </div>
  );
}
