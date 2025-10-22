// API Configuration
const API_BASE = window.location.origin;
const API_URL = `${API_BASE}/api/todos`;

// State
let todos = [];
let currentFilter = 'all';

// DOM Elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const emptyState = document.getElementById('emptyState');
const totalCount = document.getElementById('totalCount');
const completedCount = document.getElementById('completedCount');
const filterTabs = document.querySelectorAll('.tab');

// Initialize
init();

function init() {
  addBtn.addEventListener('click', handleAddTodo);
  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleAddTodo();
  });

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      currentFilter = tab.dataset.filter;
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderTodos();
    });
  });

  loadTodos();
}

// API Functions
async function loadTodos() {
  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      todos = await response.json();
      renderTodos();
      updateStats();
    }
  } catch (error) {
    console.error('Error loading todos:', error);
    showNotification('Failed to load todos', 'error');
  }
}

async function createTodo(title) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, completed: false }),
    });

    if (response.ok) {
      const newTodo = await response.json();
      todos.push(newTodo);
      renderTodos();
      updateStats();
      showNotification('Task added successfully');
    }
  } catch (error) {
    console.error('Error creating todo:', error);
    showNotification('Failed to add task', 'error');
  }
}

async function updateTodo(id, updates) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (response.ok) {
      const updatedTodo = await response.json();
      const index = todos.findIndex(t => t.id === id);
      if (index !== -1) {
        todos[index] = updatedTodo;
        renderTodos();
        updateStats();
      }
    }
  } catch (error) {
    console.error('Error updating todo:', error);
    showNotification('Failed to update task', 'error');
  }
}

async function deleteTodo(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      todos = todos.filter(t => t.id !== id);
      renderTodos();
      updateStats();
      showNotification('Task deleted');
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
    showNotification('Failed to delete task', 'error');
  }
}

// UI Functions
function handleAddTodo() {
  const title = todoInput.value.trim();
  if (!title) {
    todoInput.focus();
    return;
  }

  createTodo(title);
  todoInput.value = '';
  todoInput.focus();
}

function renderTodos() {
  const filteredTodos = getFilteredTodos();

  if (filteredTodos.length === 0) {
    todoList.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  todoList.innerHTML = filteredTodos.map(todo => `
    <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
      <div class="checkbox ${todo.completed ? 'checked' : ''}" onclick="toggleTodo('${todo.id}')"></div>
      <span class="todo-text">${escapeHtml(todo.title)}</span>
      <button class="delete-btn" onclick="confirmDelete('${todo.id}')">Delete</button>
    </li>
  `).join('');
}

function getFilteredTodos() {
  switch (currentFilter) {
    case 'active':
      return todos.filter(t => !t.completed);
    case 'completed':
      return todos.filter(t => t.completed);
    default:
      return todos;
  }
}

function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    updateTodo(id, { completed: !todo.completed });
  }
}

function confirmDelete(id) {
  if (confirm('Are you sure you want to delete this task?')) {
    deleteTodo(id);
  }
}

function updateStats() {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;

  totalCount.textContent = `${total} ${total === 1 ? 'task' : 'tasks'}`;
  completedCount.textContent = `${completed} completed`;
}

function showNotification(message, type = 'success') {
  // Simple console notification for now
  // Can be enhanced with a toast notification system
  console.log(`[${type.toUpperCase()}] ${message}`);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
