const STORAGE_KEY = 'habitTracker';

const form = document.getElementById('add-form');
const input = document.getElementById('habit-name');
const list = document.getElementById('habit-list');
const emptyMessage = document.getElementById('empty-message');
const themeToggle = document.getElementById('theme-toggle');

// Local date (not UTC) so "today" matches the user's calendar, not Greenwich's.
function todayString() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

function loadData() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (data && Array.isArray(data.habits)) return data;
  } catch (error) {
    // Corrupt or unavailable storage: start fresh rather than crash the page.
  }
  return { habits: [] };
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// crypto.randomUUID is not available on file:// in every browser, so build a simple unique id.
function createId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function render() {
  const { habits } = loadData();
  const today = todayString();

  list.replaceChildren();
  emptyMessage.hidden = habits.length > 0;

  habits.forEach((habit) => {
    const isDone = habit.doneDate === today;

    const item = document.createElement('li');
    item.className = 'habit-item' + (isDone ? ' is-done' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'habit-checkbox';
    checkbox.id = 'habit-' + habit.id;
    checkbox.checked = isDone;
    checkbox.addEventListener('change', () => toggleHabit(habit.id, checkbox.checked));

    const label = document.createElement('label');
    label.className = 'habit-name';
    label.htmlFor = checkbox.id;
    label.textContent = habit.name;

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'remove-button';
    removeButton.textContent = 'Remove';
    removeButton.setAttribute('aria-label', 'Remove ' + habit.name);
    removeButton.addEventListener('click', () => removeHabit(habit.id));

    item.append(checkbox, label, removeButton);
    list.append(item);
  });
}

function addHabit(name) {
  const data = loadData();
  data.habits.push({ id: createId(), name, doneDate: null });
  saveData(data);
  render();
}

// Storing the date it was done (not just true/false) means "done" only counts for today.
function toggleHabit(id, isDone) {
  const data = loadData();
  const habit = data.habits.find((h) => h.id === id);
  if (!habit) return;
  habit.doneDate = isDone ? todayString() : null;
  saveData(data);
  render();
}

function removeHabit(id) {
  const data = loadData();
  data.habits = data.habits.filter((h) => h.id !== id);
  saveData(data);
  render();
}

// The theme lives in the same habitTracker object so localStorage keeps a single key.
function applyTheme() {
  const isDark = loadData().theme === 'dark';
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.textContent = isDark ? 'Light mode' : 'Dark mode';
}

function toggleTheme() {
  const data = loadData();
  data.theme = data.theme === 'dark' ? 'light' : 'dark';
  saveData(data);
  applyTheme();
}

themeToggle.addEventListener('click', toggleTheme);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = input.value.trim();
  if (!name) return;
  addHabit(name);
  input.value = '';
  input.focus();
});

applyTheme();
render();
