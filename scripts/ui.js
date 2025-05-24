import { loadTasks, saveTask, deleteTask, toggleComplete, clearAllTasks } from './storage.js';
import { debounce, throttle } from './utils.js';

export function renderTasks(tasks = []) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = tasks.map(task => `
    <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
      <input type="checkbox" ${task.completed ? 'checked' : ''} />
      <span>${task.text}</span>
      <button class="delete-btn">✖</button>
    </div>`).join('');
}

export function attachEventListeners() {
  const input = document.getElementById('taskInput');
  const addBtn = document.getElementById('addTaskBtn');
  const searchInput = document.getElementById('searchInput');
  const clearAllBtn = document.getElementById('clearAllBtn');
  const backToTopBtn = document.getElementById('backToTopBtn');

  addBtn.addEventListener('click', () => {
    const taskText = input.value.trim();
    if (!taskText) return;
    saveTask({ id: Date.now().toString(), text: taskText, completed: false });
    renderTasks(loadTasks());
    input.value = '';
  });

  document.getElementById('taskList').addEventListener('click', e => {
    const taskEl = e.target.closest('.task-item');
    if (!taskEl) return;
    const id = taskEl.dataset.id;

    if (e.target.matches('input[type="checkbox"]')) {
      toggleComplete(id);
    } else if (e.target.matches('.delete-btn')) {
      deleteTask(id);
    }
    renderTasks(loadTasks());
  });

  searchInput.addEventListener('input', debounce(() => {
    const query = searchInput.value.toLowerCase();
    const filtered = loadTasks().filter(task => task.text.toLowerCase().includes(query));
    renderTasks(filtered);
  }, 300));

  clearAllBtn.addEventListener('click', () => {
    clearAllTasks();
    renderTasks([]);
  });

  window.addEventListener('scroll', throttle(() => {
    backToTopBtn.classList.toggle('hidden', window.scrollY < 300);
  }, 200));

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
