import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Stats from "./components/Stats";
import TaskForm from "./components/TaskForm";
import FilterButtons from "./components/FilterButtons";
import TaskList from "./components/TaskList";

import {
  fetchTasksApi,
  createTaskApi,
  updateTaskApi,
  deleteTaskApi,
  toggleTaskApi,
} from "./api/tasksApi";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasksApi();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create task
  const createTask = async () => {
    if (!newTask.title.trim()) return;
    try {
      const task = await createTaskApi(newTask);
      setTasks([task, ...tasks]);
      setNewTask({ title: "", description: "" });
      setShowForm(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Update task
  const updateTask = async (id, updates) => {
    try {
      const updated = await updateTaskApi(id, updates);
      setTasks(tasks.map((t) => (t._id === id ? updated : t)));
      setEditingTask(null);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await deleteTaskApi(id);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  // Toggle task completion
  const toggleTask = async (id) => {
    try {
      const updated = await toggleTaskApi(id);
      setTasks(tasks.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      console.error(err.message);
    }
  };

  // Apply filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  // Stats
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Header />
        <Stats {...stats} />

        {/* Add New Task Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-green-700 text-white rounded-lg shadow-lg hover:bg-green-900 transition"
          >
            + Add New Task
          </button>
        </div>

        <FilterButtons filter={filter} setFilter={setFilter} />

        <TaskList
          tasks={filteredTasks}
          loading={loading}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
        />
      </div>

      {/* Dark Fullscreen Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-[10px] flex items-center justify-center z-50">
          {/* Task Form - Larger */}
          <div className="w-full max-w-3xl px-8">
            <TaskForm
              newTask={newTask}
              setNewTask={setNewTask}
              onAdd={createTask}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
