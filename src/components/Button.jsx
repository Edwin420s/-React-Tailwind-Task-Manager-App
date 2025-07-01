// src/components/Button.jsx
import React from 'react';

const variantClasses = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
};

const Button = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => (
  <button 
    className={`
      px-4 py-2 
      rounded-lg 
      transition-colors duration-200 
      font-medium 
      ${variantClasses[variant]} 
      ${className}
    `} 
    {...props}
  >
    {children}
  </button>
);

export default Button;