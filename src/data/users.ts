import { User } from '../types/auth';

// Hardcoded user credentials
export const USERS: User[] = [
  {
    email: 'admin@cloudjunction.com',
    password: 'admin123',
    securityQuestion: 'What was the name of your first pet?',
    securityAnswer: 'buddy'
  },
  {
    email: 'john.doe@salesforce.com',
    password: 'john123',
    securityQuestion: 'What city were you born in?',
    securityAnswer: 'newyork'
  },
  {
    email: 'jane.smith@salesforce.com',
    password: 'jane123',
    securityQuestion: 'What was your high school mascot?',
    securityAnswer: 'eagles'
  }
];

export const findUserByEmail = (email: string): User | undefined => {
  return USERS.find(user => user.email.toLowerCase() === email.toLowerCase());
};

export const updateUserPassword = (email: string, newPassword: string): boolean => {
  const userIndex = USERS.findIndex(user => user.email.toLowerCase() === email.toLowerCase());
  if (userIndex !== -1) {
    USERS[userIndex].password = newPassword;
    return true;
  }
  return false;
};