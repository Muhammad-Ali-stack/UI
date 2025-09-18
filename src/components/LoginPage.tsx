import React, { useState } from 'react';
import { AuthState, User } from '../types/auth';
import { findUserByEmail } from '../data/users';

interface LoginPageProps {
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

const securityQuestions = [
  "What is your mother's maiden name?",
  "What was your first pet's name?",
  "What city were you born in?"
];

const LoginPage: React.FC<LoginPageProps> = ({ authState, setAuthState }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    securityQuestion: securityQuestions[0],
    securityAnswer: ''
  });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [step, setStep] = useState<'credentials' | 'security'>('credentials');
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = findUserByEmail(formData.email);
    
    if (!user) {
      setError('User not found');
      return;
    }
    
    if (user.password !== formData.password) {
      setError('Invalid password');
      return;
    }
    
    setCurrentUser(user);
    setStep('security');
  };

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    // ✅ Accept any security answer for now
    setAuthState({
      ...authState,
      isAuthenticated: true,
      currentUser,
      currentPage: 'dashboard'
    });
  };

  const goToForgotPassword = () => {
    setAuthState({
      ...authState,
      currentPage: 'forgot-password',
      forgotPasswordStep: 1
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Sign in</h2>
          <p className="mt-2 text-sm text-gray-600">
            {step === 'credentials' ? 'Enter your credentials' : 'Verify your identity'}
          </p>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-8">
          {step === 'credentials' ? (
            <form onSubmit={handleCredentialsSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
              
              {error && (
                <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Continue
              </button>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={goToForgotPassword}
                  className="text-blue-600 text-sm hover:text-blue-700 font-medium"
                >
                  Forgot your password?
                </button>
                <br />
                <button
                  type="button"
                  onClick={() => setAuthState({ ...authState, currentPage: 'signup' })}
                  className="text-blue-600 text-sm hover:text-blue-700 font-medium mt-2"
                >
                  Don't have an account? Sign up
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSecuritySubmit} className="space-y-6">
              <div>
                <label htmlFor="securityQuestion" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Security Question
                </label>
                <select
                  id="securityQuestion"
                  name="securityQuestion"
                  value={formData.securityQuestion}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  {securityQuestions.map((q) => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="securityAnswer" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Answer
                </label>
                <input
                  id="securityAnswer"
                  name="securityAnswer"
                  type="text"
                  required
                  value={formData.securityAnswer}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter your answer"
                />
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep('credentials')}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md font-semibold hover:bg-gray-300 transition-colors duration-200"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-200"
                >
                  Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
