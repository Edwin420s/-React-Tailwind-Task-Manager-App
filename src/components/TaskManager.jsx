// src/components/TaskManager.jsx
import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from './Button';

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('All');

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const filteredTasks = tasks.filter(task =>
    filter === 'All' ? true : filter === 'Active' ? !task.completed : task.completed
  );

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Task Manager</h2>
      
      <div className="flex gap-2 mb-6">
        <input
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a new task..."
        />
        <Button onClick={addTask} className="px-6">Add</Button>
      </div>
      
      <div className="flex gap-2 mb-6">
        {['All', 'Active', 'Completed'].map(f => (
          <Button 
            key={f} 
            variant={filter === f ? 'primary' : 'secondary'} 
            onClick={() => setFilter(f)}
            className="flex-1 text-center"
          >
            {f}
          </Button>
        ))}
      </div>
      
      <ul className="space-y-3">
        {filteredTasks.length === 0 ? (
          <li className="text-center py-6 text-gray-500 dark:text-gray-400">
            {tasks.length === 0 
              ? "No tasks yet. Add your first task!" 
              : `No ${filter.toLowerCase()} tasks`}
          </li>
        ) : (
          filteredTasks.map((task, index) => (
            <li 
              key={index} 
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm dark:bg-gray-700 animate-fadeIn"
            >
              <span
                className={`flex-1 cursor-pointer ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-white'}`}
                onClick={() => toggleComplete(index)}
              >
                {task.text}
              </span>
              <Button 
                variant="danger" 
                onClick={() => deleteTask(index)}
                className="ml-4"
              >
                Delete
              </Button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskManager;