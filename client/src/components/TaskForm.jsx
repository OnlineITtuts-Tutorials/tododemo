import React from "react";
import { Plus, X } from "lucide-react";

function TaskForm({ newTask, setNewTask, onAdd, onCancel }) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-8">
      {/* Header with Close */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Add New Task</h2>
        {onCancel && (
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-red-500 transition"
          >
            <X size={26} />
          </button>
        )}
      </div>

      {/* Inputs */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Task title..."
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <textarea
          placeholder="Task description (optional)..."
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
          rows="4"
        />

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onAdd}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:from-green-500 hover:to-emerald-500 transition"
          >
            <Plus size={20} />
            Add Task
          </button>
          {onCancel && (
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-700 text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
