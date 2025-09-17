import React, { useState } from 'react';
import { AuthState } from '../types/auth';

interface SignUpPageProps {
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ authState, setAuthState }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    retypePassword: '',
    securityQuestion: '',
    securityAnswer: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const securityQuestions = [
    'What was the name of your first pet?',
    'What city were you born in?',
    'What was your high school mascot?',
    'What is your mother\'s maiden name?',
    'What was the name of your first school?',
    'What is your favorite movie?'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.retypePassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    if (!formData.securityQuestion) {
      setError('Please select a security question');
      return;
    }
    
    if (!formData.securityAnswer.trim()) {
      setError('Please provide an answer to the security question');
      return;
    }
    
    setSuccess('Account created successfully! Redirecting to login...');
    
    setTimeout(() => {
      setAuthState({
        ...authState,
        currentPage: 'login'
      });
    }, 2000);
  };

  const goToLogin = () => {
    setAuthState({
      ...authState,
      currentPage: 'login'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign up for a new account
          </p>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
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
            
            <div>
              <label htmlFor="retypePassword" className="block text-sm font-medium text-gray-700 mb-2">
                Retype Password
              </label>
              <input
                id="retypePassword"
                name="retypePassword"
                type="password"
                required
                value={formData.retypePassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Retype your password"
              />
            </div>
            
            <div>
              <label htmlFor="securityQuestion" className="block text-sm font-medium text-gray-700 mb-2">
                Security Question
              </label>
              <select
                id="securityQuestion"
                name="securityQuestion"
                required
                value={formData.securityQuestion}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="">Select a security question</option>
                {securityQuestions.map((question, index) => (
                  <option key={index} value={question}>
                    {question}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="securityAnswer" className="block text-sm font-medium text-gray-700 mb-2">
                Security Answer
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
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Create Account
            </button>
            
            <div className="text-center">
              <button
                type="button"
                onClick={goToLogin}
                className="text-blue-600 text-sm hover:text-blue-700 font-medium"
              >
                Already have an account? Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;