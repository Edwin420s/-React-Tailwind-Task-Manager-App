// src/pages/Posts.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import Button from '../components/Button';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // Show 6 posts per page

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch posts');
        setLoading(false);
      });
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <input
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="text-gray-600 dark:text-gray-300 whitespace-nowrap">
          {filteredPosts.length} posts found
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-8 animate-pulse">
          <p className="text-gray-600 dark:text-gray-400">Loading posts...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg dark:bg-red-900 dark:text-red-100">
          {error}
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentPosts.map(post => (
              <Card key={post.id} className="h-full">
                <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {post.body}
                </p>
              </Card>
            ))}
          </div>
          
          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
              <Button 
                variant="secondary"
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="w-full sm:w-auto"
              >
                Previous
              </Button>
              
              <div className="text-gray-700 dark:text-gray-300">
                Page {currentPage} of {totalPages}
              </div>
              
              <Button 
                variant="secondary"
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-full sm:w-auto"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Posts;