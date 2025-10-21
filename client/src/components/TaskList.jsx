import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, loading, editingTask, setEditingTask, updateTask, deleteTask, toggleTask }) {
  if (loading) {
    return (
      <div className="text-center py-8">
        {/* Loading Spinner */}
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        <p className="mt-2 text-gray-300">Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 text-lg">No tasks found. Try adding one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
