import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { AuthState } from '../types/auth';
import { Copy, Edit, Trash2 } from 'lucide-react';

interface MCPServerProps {
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

interface Server {
  id: number;
  name: string;
  status: "up" | "down";
}

const initialServers: Server[] = [
  { id: 1, name: "MCP-Server-1", status: "up" },
  { id: 2, name: "MCP-Server-2", status: "up" },
  { id: 3, name: "MCP-Server-3", status: "up" },
  { id: 4, name: "MCP-Server-4", status: "up" },   // ✅ now UP
  { id: 5, name: "MCP-Server-5", status: "down" }, // ❌ now DOWN
];

const MCPServer: React.FC<MCPServerProps> = ({ authState, setAuthState }) => {
  const [servers, setServers] = useState<Server[]>(initialServers);
  const [activeModal, setActiveModal] = useState<null | { type: "Clone" | "Edit" | "Delete"; server: Server }>(null);
  const [editName, setEditName] = useState<string>("");

  // Clone server
  const handleClone = (server: Server) => {
    const newServer: Server = {
      id: Math.max(...servers.map(s => s.id)) + 1,
      name: `${server.name}-Copy`,
      status: server.status,
    };
    setServers([...servers, newServer]);
    setActiveModal(null);
  };

  // Delete server
  const handleDelete = (server: Server) => {
    setServers(servers.filter(s => s.id !== server.id));
    setActiveModal(null);
  };

  // Edit server
  const handleEdit = (server: Server) => {
    setServers(
      servers.map(s => (s.id === server.id ? { ...s, name: editName || s.name } : s))
    );
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar authState={authState} setAuthState={setAuthState} />
      <div className="flex">
        <Sidebar authState={authState} setAuthState={setAuthState} />
        <div className="flex-1 ml-64 pt-16 p-6">
          <h1 className="text-2xl font-bold text-gray-900">MCP Server Management</h1>
          <p className="text-gray-600 mt-2 mb-6">Manage your MCP servers below.</p>

          <div className="bg-white shadow rounded-2xl overflow-hidden">
            <table className="min-w-full text-left">
              <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-800">
                {servers.map((server) => (
                  <tr key={server.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{server.name}</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2">
                        <span
                          className={`h-3 w-3 rounded-full ${
                            server.status === "up" ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></span>
                        {server.status === "up" ? "Running" : "Down"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3 text-gray-600">
                        <button
                          onClick={() => setActiveModal({ type: "Clone", server })}
                          className="hover:text-blue-600 flex items-center gap-1 text-sm"
                        >
                          <Copy className="h-4 w-4" /> Clone
                        </button>
                        <button
                          onClick={() => {
                            setEditName(server.name);
                            setActiveModal({ type: "Edit", server });
                          }}
                          className="hover:text-green-600 flex items-center gap-1 text-sm"
                        >
                          <Edit className="h-4 w-4" /> Edit
                        </button>
                        <button
                          onClick={() => setActiveModal({ type: "Delete", server })}
                          className="hover:text-red-600 flex items-center gap-1 text-sm"
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {activeModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                {activeModal.type === "Edit" ? (
                  <>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      Edit MCP Server
                    </h2>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 mb-4 focus:ring focus:ring-blue-300"
                    />
                    <div className="flex justify-end gap-3">
                      <button
                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
                        onClick={() => setActiveModal(null)}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => handleEdit(activeModal.server)}
                      >
                        Save
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {activeModal.type} MCP Server
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Are you sure you want to{" "}
                      <strong>{activeModal.type.toLowerCase()}</strong>{" "}
                      <span className="font-medium text-gray-800">
                        {activeModal.server.name}
                      </span>
                      ?
                    </p>
                    <div className="flex justify-end gap-3">
                      <button
                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
                        onClick={() => setActiveModal(null)}
                      >
                        Cancel
                      </button>
                      <button
                        className={`px-4 py-2 rounded-lg text-white ${
                          activeModal.type === "Delete"
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                        onClick={() =>
                          activeModal.type === "Clone"
                            ? handleClone(activeModal.server)
                            : handleDelete(activeModal.server)
                        }
                      >
                        {activeModal.type}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MCPServer;
