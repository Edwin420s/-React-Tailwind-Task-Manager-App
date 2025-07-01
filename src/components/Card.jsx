import React from 'react';

const Card = ({ children }) => (
  <div className="p-4 bg-white shadow rounded dark:bg-gray-800">
    {children}
  </div>
);

export default Card;