import React, { useState } from 'react';
import { AuthState } from '../types/auth';
import { LogOut, ChevronDown } from 'lucide-react';

interface NavbarProps {
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

const Navbar: React.FC<NavbarProps> = ({ authState, setAuthState }) => {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    setAuthState({
      isAuthenticated: false,
      currentUser: null,
      currentPage: 'login',
      forgotPasswordStep: 1,
      tempUser: null,
    });
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 h-16 fixed w-full top-0 z-50">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4 ml-4">
  <a href="https://cloudjunction.cloud" target="_blank" rel="noopener noreferrer">
    <img src="/Logo.png" alt="Logo" className="h-10 w-auto cursor-pointer" />
  </a>
</div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 border-l pl-4 relative">
            {/* Avatar */}
            <div
              className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              {authState.currentUser?.email.charAt(0).toUpperCase()}
            </div>

            {/* Dropdown Arrow */}
            <ChevronDown
              className="w-4 h-4 text-gray-600 cursor-pointer"
              onClick={() => setOpen(!open)}
            />

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 top-12 bg-white shadow-lg rounded-md w-40 py-2 border">
                <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                  Option 1
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                  Option 2
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
