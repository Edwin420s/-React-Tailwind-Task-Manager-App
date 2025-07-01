import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 p-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;