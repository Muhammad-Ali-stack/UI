import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { AuthState } from '../types/auth';

interface MCPServerProps {
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

const MCPServer: React.FC<MCPServerProps> = ({ authState, setAuthState }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar authState={authState} setAuthState={setAuthState} />
      <div className="flex">
        <Sidebar authState={authState} setAuthState={setAuthState} />
        <div className="flex-1 ml-64 pt-16 p-6">
          <h1 className="text-2xl font-bold text-gray-900">MCP Server Management</h1>
          <p className="text-gray-600 mt-2">Hello World - MCP Server Component</p>
        </div>
      </div>
    </div>
  );
};

export default MCPServer;