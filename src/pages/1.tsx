import React, { useState } from 'react';
import Head from 'next/head';

export default function PageOne() {
  const [count, setCount] = useState(0);
  const [tasks, setTasks] = useState<string[]>([]);
  const [taskInput, setTaskInput] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskInput.trim() !== '') {
      setTasks([...tasks, taskInput]);
      setTaskInput('');
    }
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-8">
      <Head>
        <title>Page 1 - Interactive Features</title>
        <meta name="description" content="A page with interactive functions." />
      </Head>

      <main className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-8">
        <header className="text-center border-b pb-4">
          <h1 className="text-3xl font-bold text-indigo-600">Interactive Page</h1>
          <p className="text-gray-500 mt-2">Welcome to the upgraded page 1!</p>
        </header>

        {/* Counter Section */}
        <section className="bg-indigo-50 p-6 rounded-lg text-center space-y-4">
          <h2 className="text-xl font-semibold text-indigo-800">Counter Function</h2>
          <p className="text-4xl font-mono text-indigo-600">{count}</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setCount(count - 1)}
              className="px-4 py-2 bg-white text-indigo-600 border border-indigo-200 rounded-md hover:bg-indigo-100 transition"
            >
              Decrease
            </button>
            <button
              onClick={() => setCount(0)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
            >
              Reset
            </button>
            <button
              onClick={() => setCount(count + 1)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Increase
            </button>
          </div>
        </section>

        {/* To-Do List Section */}
        <section className="bg-green-50 p-6 rounded-lg space-y-4">
          <h2 className="text-xl font-semibold text-green-800 text-center">To-Do List</h2>
          <form onSubmit={addTask} className="flex space-x-2">
            <input
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Add
            </button>
          </form>

          {tasks.length > 0 ? (
            <ul className="space-y-2 mt-4">
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-green-100"
                >
                  <span className="text-gray-700">{task}</span>
                  <button
                    onClick={() => removeTask(index)}
                    className="text-red-500 hover:text-red-700 focus:outline-none text-sm font-medium"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-green-600/70 mt-4 italic">No tasks yet. Add one above!</p>
          )}
        </section>
      </main>
    </div>
  );
}
