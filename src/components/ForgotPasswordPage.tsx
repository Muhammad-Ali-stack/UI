import React, { useState } from 'react';
import { AuthState, User } from '../types/auth';
import { findUserByEmail, updateUserPassword } from '../data/users';
import ProgressIndicator from './ProgressIndicator';

interface ForgotPasswordPageProps {
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ authState, setAuthState }) => {
  const [formData, setFormData] = useState({
    email: '',
    securityAnswer: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = findUserByEmail(formData.email);
    
    if (!user) {
      setError('User not found');
      return;
    }
    
    if (user.securityAnswer.toLowerCase() !== formData.securityAnswer.toLowerCase()) {
      setError('Incorrect security answer');
      return;
    }
    
    setAuthState({
      ...authState,
      forgotPasswordStep: 2,
      tempUser: user
    });
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authState.tempUser) return;
    
    if (authState.tempUser.password !== formData.oldPassword) {
      setError('Current password is incorrect');
      return;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    updateUserPassword(authState.tempUser.email, formData.newPassword);
    setSuccess('Password updated successfully! Redirecting to login...');
    
    setTimeout(() => {
      setAuthState({
        ...authState,
        currentPage: 'login',
        forgotPasswordStep: 1,
        tempUser: null
      });
    }, 2000);
  };

  const goBackToLogin = () => {
    setAuthState({
      ...authState,
      currentPage: 'login',
      forgotPasswordStep: 1,
      tempUser: null
    });
  };

  const goBackToStep1 = () => {
    setAuthState({
      ...authState,
      forgotPasswordStep: 1,
      tempUser: null
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
          <p className="mt-2 text-sm text-gray-600">
            {authState.forgotPasswordStep === 1 
              ? 'Verify your identity to reset your password'
              : 'Create your new password'
            }
          </p>
        </div>
        
        <ProgressIndicator currentStep={authState.forgotPasswordStep} />
        
        <div className="bg-white shadow-lg rounded-lg p-8">
          {authState.forgotPasswordStep === 1 ? (
            <form onSubmit={handleStep1Submit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email or Username
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
              
              {formData.email && (() => {
                const user = findUserByEmail(formData.email);
                return user ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Security Question
                      </label>
                      <div className="p-3 bg-gray-50 rounded-md border text-gray-800">
                        {user.securityQuestion}
                      </div>
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
                  </>
                ) : null;
              })()}
              
              {error && (
                <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">
                  {error}
                </div>
              )}
              
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={goBackToLogin}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md font-semibold hover:bg-gray-300 transition-colors duration-200"
                >
                  Back to Login
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-200"
                >
                  Continue
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleStep2Submit} className="space-y-6">
              <div>
                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  required
                  value={formData.oldPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter your current password"
                />
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter your new password"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Confirm your new password"
                />
              </div>
              
              {error && (
                <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="text-green-600 text-sm text-center bg-green-50 p-3 rounded-md">
                  {success}
                </div>
              )}
              
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={goBackToStep1}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md font-semibold hover:bg-gray-300 transition-colors duration-200"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-200"
                >
                  Update Password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;