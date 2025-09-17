import React, { useState } from "react";
import {
  Home,
  Users,
  Building2,
  ChevronRight,
} from "lucide-react";
import { AuthState } from "../types/auth";

interface SidebarProps {
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

const Sidebar: React.FC<SidebarProps> = ({ authState, setAuthState }) => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const menuItems = [
    { id: "dashboard", label: "Homepage", icon: Home },
    {
      id: "mcp",
      label: "Model Context Protocol",
      icon: Building2,
      children: [
        { id: "mcp-view", label: "View MCP Servers" },
        { id: "mcp-add", label: "Add MCP Server" },
      ],
    },
    {
      id: "users",
      label: "Users",
      icon: Users,
      children: [
        { id: "users-list", label: "Users" },
        { id: "user-grps", label: "User Groups" },
      ],
    },
    {
      id: "connect-junction",
      label: (
        <>
          Connect<i>J</i>unction
        </>
      ),
      icon: Building2,
      children: [
        { id: "cj-list", label: "Env List" },
        { id: "cj-add", label: "Add Env" },
      ],
    }
  ];

  const handleClick = (itemId: string, hasChildren?: boolean) => {
    if (hasChildren) {
      setExpandedItem(expandedItem === itemId ? null : itemId);
    } else {
      setActiveItem(itemId);
      
      // Handle navigation based on itemId
      switch (itemId) {
        case 'dashboard':
          setAuthState({ ...authState, currentPage: 'dashboard' });
          break;
        case 'mcp-view':
          setAuthState({ ...authState, currentPage: 'mcp-server' });
          break;
        case 'mcp-add':
          setAuthState({ ...authState, currentPage: 'add-mcp-server' });
          break;
        case 'cj-list':
          setAuthState({ ...authState, currentPage: 'cj-env-list' });
          break;
        case 'cj-add':
          setAuthState({ ...authState, currentPage: 'add-cj-env' });
          break;
        case 'users-list':
          setAuthState({ ...authState, currentPage: 'user' });
          break;
        case 'user-grps':
          setAuthState({ ...authState, currentPage: 'user-grps' });
          break;
      }
    }
  };

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen pt-16 fixed left-0">
      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            const isExpanded = expandedItem === item.id;

            return (
              <div key={item.id}>
                {/* Main menu button */}
                <button
                  onClick={() => handleClick(item.id, !!item.children)}
                  className={`w-full flex items-center justify-between p-3 rounded-md text-left transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.children && (
                    <ChevronRight
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </button>

                {/* Submenu */}
                {item.children && isExpanded && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => handleClick(child.id)}
                        className={`block w-full text-left p-2 rounded-md text-sm transition-all duration-200 ${
                          activeItem === child.id
                            ? "bg-blue-100 text-blue-700 font-medium"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;