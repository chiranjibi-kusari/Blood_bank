// Sidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaTable,
  FaTasks,
  FaBell,
  FaChartBar,
  FaUserCog,
  FaProjectDiagram,
  FaBox,
  FaClipboardList,
  FaUsers,
  FaBullseye,
  FaCodeBranch,
} from "react-icons/fa";
import { Cookies, useCookies } from "react-cookie";
import { LuLogOut } from "react-icons/lu";
import { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { toast } from "react-toastify";
//import { useGetUser } from "../../hooks/useGetUser";

const menus = {
  user: [
    { name: "Dashboard", icon: <FaHome />, path: "/user/dashboard" },
    { name: "My Donation", icon: <FaTable />, path: "/user/my-donation" },
    // { name: "Add Lead", icon: <FaPlus />, path: "/branch-staff/add-lead" },
    {
      name: "My Request",
      icon: <FaProjectDiagram />,
      path: "/user/my-request",
    },
    //{ name: "Matching", icon: <FaTasks />, path: "/user/matching" },
  ],

  admin: [
    { name: "Dashboard", icon: <FaHome />, path: "/admin/dashboard" },
    {
      name: "Donations",
      icon: <FaChartBar />,
      path: "/admin/donor",
    },
    {
      name: "Requests",
      icon: <FaBox />,
      path: "/admin/request",
    },
    {
      name: "Users",
      icon: <FaBox />,
      path: "/admin/user",
    },
    //{
    //  name: "Approve Donations",
    //  icon: <FaBox />,
    //  path: "/admin/approve-donations",
    //},
    //{
    //  name: "Approve Requests",
    //  icon: <FaBox />,
    //  path: "/admin/approve-requests",
    //},
  ],
};

export default function Sidebar({ isCollapsed }) {
  // const [cookies] = useCookies(["userRole"]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cookies, , removeCookie] = useCookies(["role", "token", "name"]);
  const nav = useNavigate("");
  //const { data } = useGetUser();
  const handleLogout = () => {
    setDropdownOpen(false);
    removeCookie("token", { path: "/" });
    removeCookie("role", { path: "/" });
    removeCookie("name", { path: "/" });

    toast.success("User Logged Out!");
    nav("/home", { replace: true });
  };
  const role = cookies.role;
  const name = cookies.name;
  const menu = menus[role] || [];

  return (
    <aside
      className={`${
        isCollapsed ? "w-40" : "w-64"
      } min-h-screen bg-[#1B2A65] overflow-x-hidden transition-all duration-300 text-gray-200 shadow-lg flex flex-col pt-5`}
    >
      <div
        className={`flex flex-col  items-center justify-center gap-1 ${
          isCollapsed ? "px-1" : ""
        }`}
      >
        {!isCollapsed && (
          <div>
            {" "}
            <h3 className="text-2xl font-medium text-green-500">
              Blood Managment
            </h3>
            <h6 className="text-2xl font-medium text-green-500 pl-12">
              System
            </h6>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center">
        <div
          className={`mt-4 flex ${isCollapsed ? "flex-col" : "flex-row"} gap-4`}
        >
          <div className="flex flex-col justify-center items-center text-center">
            {!isCollapsed && (
              <h4 className="text-xl font-semibold text-white text-nowrap pr-8">
                {name}
              </h4>
            )}
            <h6
              className={`text-lg font-normal text-white ${isCollapsed ? "pr-16" : "pr-8"}`}
            >
              {/*{data?.role.charAt(0) + data?.role.slice(1).toLowerCase()}*/}
              {role}
            </h6>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="mt-4 flex-1  space-y-1">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 text-sm font-medium transition-colors
              ${
                isActive
                  ? "bg-[#D9E2F7] text-black"
                  : "text-white hover:bg-gray-800 hover:text-gray-100"
              }`
            }
          >
            <div className="text-lg">{item.icon}</div>
            {!isCollapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center  gap-2  py-2 rounded bg-green-700 cursor-pointer text-white font-semibold hover:bg-green-800 disabled:opacity-60"
      >
        Logout <LuLogOut size={20} className="text-white" />
      </button>
    </aside>
  );
}
