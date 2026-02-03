import React, { useState } from "react";
import SideBar from "../components/layout/SideBar";
import { Outlet } from "react-router-dom";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from "react-icons/tb";

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${isCollapsed ? "w-24" : "w-64"}`}
      >
        <SideBar isCollapsed={isCollapsed} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar with Collapse Button on Left */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center px-4">
          {/* Collapse Button on Left */}
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors mr-4"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <TbLayoutSidebarRightCollapse
                size={24}
                className="text-gray-600"
              />
            ) : (
              <TbLayoutSidebarLeftCollapse
                size={24}
                className="text-gray-600"
              />
            )}
          </button>

          {/* Optional: Page title or other header content */}
          <div className="flex-1">
            {/* You can add breadcrumbs or page title here */}
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-4 md:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
