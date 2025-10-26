const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAllBtn");

// Load saved tasks
document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);
clearAllBtn.addEventListener("click", clearAllTasks);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText}</span>
    <button class="delete">❌</button>
  `;

  li.addEventListener("click", toggleComplete);
  li.querySelector(".delete").addEventListener("click", deleteTask);

  taskList.appendChild(li);
  saveTasks();

  taskInput.value = "";
}

function toggleComplete(e) {
  if (e.target.tagName === "SPAN") {
    e.target.parentElement.classList.toggle("completed");
    saveTasks();
  }
}

function deleteTask(e) {
  e.stopPropagation();
  e.target.parentElement.remove();
  saveTasks();
}

function clearAllTasks() {
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task.text}</span>
      <button class="delete">❌</button>
    `;
    if (task.completed) li.classList.add("completed");

    li.addEventListener("click", toggleComplete);
    li.querySelector(".delete").addEventListener("click", deleteTask);

    taskList.appendChild(li);
  });
}
