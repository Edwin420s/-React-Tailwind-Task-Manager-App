import React from 'react';
import Layout from './components/Layout';
import TaskManager from './components/TaskManager';
import { Route, Routes } from 'react-router-dom';
import Posts from './pages/Posts'; 

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<TaskManager />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </Layout>
  );
}

export default App;
// This code defines the main application component for a react application using react router for navigation.