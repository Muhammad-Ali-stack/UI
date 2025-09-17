import React, { useState } from 'react';
import { AuthState } from './types/auth';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import User from './components/User';
import UserGrps from './components/UserGrps';
import MCPServer from './components/MCPServer';
import AddMCPServer from './components/AddMCPServer';
import CJEnvList from './components/CJEnvList';
import AddCJEnvList from './components/AddCJEnvList';

function App() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    currentUser: null,
    currentPage: 'login',
    forgotPasswordStep: 1,
    tempUser: null
  });

  const renderCurrentPage = () => {
    if (authState.isAuthenticated && authState.currentPage === 'dashboard') {
      return <Dashboard authState={authState} setAuthState={setAuthState} />;
    }
    
    if (authState.isAuthenticated && authState.currentPage === 'user-management') {
      return (
        <UserManagement
          authState={authState}
          setAuthState={setAuthState}
          onNavigateToUsers={() => setAuthState({ ...authState, currentPage: 'user' })}
          onNavigateToUserGroups={() => setAuthState({ ...authState, currentPage: 'user-grps' })}
          onBackToDashboard={() => setAuthState({ ...authState, currentPage: 'dashboard' })}
        />
      );
    }
    
    if (authState.isAuthenticated && authState.currentPage === 'user') {
      return (
        <User
          authState={authState}
          setAuthState={setAuthState}
          onBackToUserManagement={() => setAuthState({ ...authState, currentPage: 'user-management' })}
        />
      );
    }
    
    if (authState.isAuthenticated && authState.currentPage === 'user-grps') {
      return (
        <UserGrps
          authState={authState}
          setAuthState={setAuthState}
          onBackToUserManagement={() => setAuthState({ ...authState, currentPage: 'user-management' })}
        />
      );
    }
    
    if (authState.isAuthenticated && authState.currentPage === 'mcp-server') {
      return <MCPServer authState={authState} setAuthState={setAuthState} />;
    }
    
    if (authState.isAuthenticated && authState.currentPage === 'add-mcp-server') {
      return <AddMCPServer authState={authState} setAuthState={setAuthState} />;
    }
    
    if (authState.isAuthenticated && authState.currentPage === 'cj-env-list') {
      return <CJEnvList authState={authState} setAuthState={setAuthState} />;
    }
    
    if (authState.isAuthenticated && authState.currentPage === 'add-cj-env') {
      return <AddCJEnvList authState={authState} setAuthState={setAuthState} />;
    }

    switch (authState.currentPage) {
      case 'signup':
        return <SignUpPage authState={authState} setAuthState={setAuthState} />;
      case 'forgot-password':
        return <ForgotPasswordPage authState={authState} setAuthState={setAuthState} />;
      case 'login':
      default:
        return <LoginPage authState={authState} setAuthState={setAuthState} />;
    }
  };

  return (
    <div className="App">
      {renderCurrentPage()}
    </div>
  );
}

export default App;