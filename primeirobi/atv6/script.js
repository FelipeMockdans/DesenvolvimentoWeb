const taskInput = document.getElementById('taskInput');
const addBtn    = document.getElementById('addBtn');
const taskList  = document.getElementById('taskList');
const countEl   = document.getElementById('count');
const clearBtn  = document.getElementById('clearDone');

const STORAGE_KEY = 'todo_tasks_v1';

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveTasks() {
  const tasks = Array.from(taskList.querySelectorAll('.task-item')).map(li => ({
    text: li.querySelector('.task-text').textContent,
    done: li.classList.contains('done'),
  }));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {}
}

function updateMeta() {
  const items = taskList.querySelectorAll('.task-item');
  const done  = taskList.querySelectorAll('.task-item.done');
  countEl.textContent = items.length ? `${done.length}/${items.length} concluídas` : '';
  clearBtn.classList.toggle('visible', done.length > 0);
  renderEmpty();
  saveTasks();
}

function renderEmpty() {
  const existing = taskList.querySelector('.task-empty');
  const hasItems = taskList.querySelectorAll('.task-item').length > 0;
  if (!hasItems && !existing) {
    const li = document.createElement('li');
    li.className = 'task-empty';
    li.textContent = 'Nenhuma tarefa ainda.';
    taskList.appendChild(li);
  } else if (hasItems && existing) {
    existing.remove();
  }
}

function createItem(text, done = false) {
  const li = document.createElement('li');
  li.className = 'task-item' + (done ? ' done' : '');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = done;
  checkbox.setAttribute('aria-label', 'Marcar como concluída');
  checkbox.addEventListener('change', () => {
    li.classList.toggle('done', checkbox.checked);
    updateMeta();
  });

  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = text;

  const removeBtn = document.createElement('button');
  removeBtn.className = 'task-remove';
  removeBtn.setAttribute('aria-label', 'Remover tarefa');
  removeBtn.innerHTML = `
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    </svg>`;

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(removeBtn);
  return li;
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) {
    taskInput.focus();
    return;
  }
  taskList.appendChild(createItem(text));
  taskInput.value = '';
  taskInput.focus();
  updateMeta();
}

taskList.addEventListener('click', (e) => {
  const li = e.target.closest('.task-item');
  if (!li) return;

  if (e.target.closest('.task-remove')) {
    li.style.transition = 'opacity 0.15s';
    li.style.opacity = '0';
    setTimeout(() => {
      li.remove();
      updateMeta();
    }, 150);
  }
});

clearBtn.addEventListener('click', () => {
  taskList.querySelectorAll('.task-item.done').forEach(li => li.remove());
  updateMeta();
});

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

const saved = loadTasks();
saved.forEach(t => taskList.appendChild(createItem(t.text, t.done)));
updateMeta();