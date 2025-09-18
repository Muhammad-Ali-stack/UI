import React from 'react';
import { AuthState } from '../types/auth';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import DashboardContent from './DashboardContent';

interface DashboardProps {
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

const Dashboard: React.FC<DashboardProps> = ({ authState, setAuthState }) => {
  const handleNavigateToUsers = () => {
    setAuthState({
      ...authState,
      currentPage: 'user'
    });
  };
  
  const handleNavigateToUserGroups = () => {
    setAuthState({
      ...authState,
      currentPage: 'user-grps'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar authState={authState} setAuthState={setAuthState} />
      <div className="flex">
        <Sidebar authState={authState} setAuthState={setAuthState} />
        <DashboardContent 
          authState={authState} 
          onNavigateToUsers={handleNavigateToUsers}
          onNavigateToUserGroups={handleNavigateToUserGroups}
        />
      </div>
    </div>
  );
};

export default Dashboard;