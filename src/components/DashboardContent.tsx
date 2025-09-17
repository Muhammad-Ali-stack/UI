import React from "react";
import { AuthState } from "../types/auth";
import {
  Users,
  Server,
  Settings,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface DashboardContentProps {
  authState: AuthState;
  onNavigateToUsers: () => void;
  onNavigateToUserGroups: () => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  authState,
  onNavigateToUsers,
  onNavigateToUserGroups,
}) => {
  const cards = [
    {
      title: "MCP Server Management",
      icon: Server,
      items: [
        { name: "MCP Server 1", status: "running" },
        { name: "MCP Server 2", status: "running" },
        { name: "MCP Server 3", status: "running" },
        { name: "MCP Server 4", status: "running" },
        { name: "MCP Server 5", status: "down" },
      ],
    },
    {
      title: "CJ Env Management",
      icon: Settings,
      items: [
        { name: "Env 1", status: "running" },
        { name: "Env 2", status: "running" },
        { name: "Env 3", status: "down" },
      ],
    },
    {
      title: "User Management",
      icon: Users,
      items: [
        { name: "Users", onClick: onNavigateToUsers },
        { name: "User Grps", onClick: onNavigateToUserGroups },
      ],
    },
  ];

  // helper to count running vs down
  const getStatusCounts = (items: { name: string; status?: string }[]) => {
    const running = items.filter((i) => i.status === "running").length;
    const down = items.filter((i) => i.status === "down").length;
    return { running, down };
  };

  return (
    <div className="flex-1 ml-64 pt-16 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Welcome back Admin
      </h1>

      {/* 3 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          const { running, down } = getStatusCounts(card.items);

          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition"
            >
              <div
                className="flex items-center mb-2 space-x-2 cursor-pointer"
                onClick={() => {
                  // No header click navigation needed anymore
                }}
              >
                <Icon className="w-6 h-6 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  {card.title}
                </h2>
              </div>

              {/* Show counts only if there are statuses */}
              {(running > 0 || down > 0) && (
                <div className="flex items-center space-x-4 mb-4 text-sm">
                  <span className="flex items-center text-green-600 font-medium">
                    <CheckCircle className="w-4 h-4 mr-1" /> {running} Running
                  </span>
                  <span className="flex items-center text-red-600 font-medium">
                    <XCircle className="w-4 h-4 mr-1" /> {down} Down
                  </span>
                </div>
              )}

              <ul className="space-y-3">
                {card.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between text-sm font-medium hover:bg-gray-50 p-2 rounded cursor-pointer"
                    onClick={() => {
                      if ("onClick" in item && item.onClick) {
                        item.onClick();
                      }
                    }}
                  >
                    <span className="text-gray-700">{item.name}</span>
                    {"status" in item &&
                      (item.status === "running" ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      ))}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardContent;
