import { loadTasks, saveTask, deleteTask, toggleComplete, clearAllTasks } from './storage.js';
import { renderTasks, attachEventListeners } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  renderTasks(loadTasks());
  attachEventListeners();
});
