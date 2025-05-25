const STORAGE_KEY = 'dailyTasks';

export function loadTasks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveTask(task) {
  const tasks = loadTasks();
  tasks.push(task);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function deleteTask(id) {
  const tasks = loadTasks().filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function toggleComplete(id) {
  const tasks = loadTasks().map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function clearAllTasks() {
  localStorage.removeItem(STORAGE_KEY);
}
