import React from "react";
import { Edit2, Trash2, Check } from "lucide-react";
import EditTaskForm from "./EditTaskForm";

function TaskItem({ task, editingTask, setEditingTask, updateTask, deleteTask, toggleTask }) {
  return (
    <div
      className={`bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 transition duration-200 hover:shadow-xl hover:border-gray-600 ${
        task.completed ? "opacity-75" : ""
      }`}
    >
      {editingTask === task._id ? (
        // If task is in edit mode → show edit form
        <EditTaskForm
          task={task}
          onSave={(updates) => updateTask(task._id, updates)}
          onCancel={() => setEditingTask(null)}
        />
      ) : (
        <div className="flex items-start justify-between">
          {/* Left side: checkbox + details */}
          <div className="flex items-start space-x-3 flex-1">
            {/* Toggle completion */}
            <button
              onClick={() => toggleTask(task._id)}
              className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition duration-200 ${
                task.completed
                  ? "bg-green-500 border-green-500 text-white shadow-lg"
                  : "border-gray-500 hover:border-green-500 hover:bg-green-500/10"
              }`}
            >
              {task.completed && <Check size={16} />}
            </button>

            {/* Task info */}
            <div className="flex-1">
              <h3 className={`text-lg font-medium ${task.completed ? "text-gray-400 line-through" : "text-white"}`}>
                {task.title}
              </h3>

              {task.description && (
                <p className={`mt-1 ${task.completed ? "text-gray-500" : "text-gray-300"}`}>{task.description}</p>
              )}

              {/* Created & Updated timestamps */}
              <p className="text-sm text-gray-500 mt-2">
                Created: {new Date(task.createdAt).toLocaleDateString()}
                {task.updatedAt !== task.createdAt && (
                  <span> • Updated: {new Date(task.updatedAt).toLocaleDateString()}</span>
                )}
              </p>
            </div>
          </div>

          {/* Right side: actions */}
          <div className="flex items-center space-x-2 ml-4">
            {/* Edit button */}
            <button
              onClick={() => setEditingTask(task._id)}
              className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition duration-200"
            >
              <Edit2 size={18} />
            </button>

            {/* Delete button */}
            <button
              onClick={() => deleteTask(task._id)}
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition duration-200"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskItem;
