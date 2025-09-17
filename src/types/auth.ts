export interface User {
  email: string;
  password: string;
  securityQuestion: string;
  securityAnswer: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
  currentPage: 'login' | 'signup' | 'forgot-password' | 'dashboard' | 'user-management' | 'user' | 'user-grps' | 'mcp-server' | 'add-mcp-server' | 'cj-env-list' | 'add-cj-env';
  forgotPasswordStep: 1 | 2;
  tempUser: User | null;
}