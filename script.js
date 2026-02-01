const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const filterAll = document.getElementById("filterAll");
const filterActive = document.getElementById("filterActive");
const filterCompleted = document.getElementById("filterCompleted");
const clearAllBtn = document.getElementById("clearAll");
const toggleThemeBtn = document.getElementById("toggleTheme");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load tasks on page load
document.addEventListener("DOMContentLoaded", () => {
    tasks.forEach(t => addTaskToDOM(t.text, t.completed));
});

// Add task
addTaskBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();
    if(task === "") return alert("Please enter a task!");
    tasks.push({text: task, completed: false});
    localStorage.setItem("tasks", JSON.stringify(tasks));
    addTaskToDOM(task);
    taskInput.value = "";
});

// Add task to DOM
function addTaskToDOM(task, completed = false){
    const li = document.createElement("li");
    li.textContent = task;
    if(completed) li.classList.add("completed");

    // Toggle complete
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        updateLocalStorage();
    });

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.classList.add("delete-btn");
    delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        li.remove();
        updateLocalStorage();
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
}

// Update localStorage
function updateLocalStorage(){
    const allTasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        allTasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed")
        });
    });
    tasks = allTasks;
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Filter tasks
filterAll.addEventListener("click", () => filterTasks("all"));
filterActive.addEventListener("click", () => filterTasks("active"));
filterCompleted.addEventListener("click", () => filterTasks("completed"));

function filterTasks(type){
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    if(type === "all") filterAll.classList.add("active");
    if(type === "active") filterActive.classList.add("active");
    if(type === "completed") filterCompleted.classList.add("active");

    document.querySelectorAll("#taskList li").forEach(li => {
        li.style.display = "flex";
        if(type === "active" && li.classList.contains("completed")) li.style.display = "none";
        if(type === "completed" && !li.classList.contains("completed")) li.style.display = "none";
    });
}

// Clear all tasks
clearAllBtn.addEventListener("click", () => {
    if(confirm("Clear all tasks?")){
        tasks = [];
        localStorage.removeItem("tasks");
        taskList.innerHTML = "";
    }
});

// Dark/Light theme toggle
toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});