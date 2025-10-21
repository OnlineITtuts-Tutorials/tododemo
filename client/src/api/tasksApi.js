// const API_BASE_URL = "http://localhost:3000";
const API_BASE_URL = "";

// Fetch all tasks
export const fetchTasksApi = async () => {
  const res = await fetch(`${API_BASE_URL}/api/v1/todos`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
};

// Create new task
export const createTaskApi = async (task) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
};

// Update task
export const updateTaskApi = async (id, updates) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
};

// Delete task
export const deleteTaskApi = async (id) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/todos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete task");
  return true;
};

// Toggle task completion
export const toggleTaskApi = async (id) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/todos/${id}/toggle`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Failed to toggle task");
  return res.json();
};
