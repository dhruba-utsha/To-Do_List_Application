
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const clearTasksButton = document.getElementById("clearTasksButton");


document.addEventListener("DOMContentLoaded", loadTasks);


addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTask(taskText);
        saveTaskToLocal(taskText);
        taskInput.value = ""; 
    }
});


clearTasksButton.addEventListener("click", () => {
    taskList.innerHTML = "";
    localStorage.removeItem("tasks");
});


function addTask(taskText, isCompleted = false) {
    const taskItem = document.createElement("li");
    taskItem.className = "task";
    if (isCompleted) taskItem.classList.add("completed");

    const taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    taskCheckbox.checked = isCompleted;
    taskCheckbox.addEventListener("change", () => {
        taskItem.classList.toggle("completed");
        updateLocalTasks();
    });

    const taskContent = document.createElement("span");
    taskContent.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", () => {
        taskItem.remove();
        updateLocalTasks();
    });

    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskContent);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}

function saveTaskToLocal(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function updateLocalTasks() {
    const tasks = [];
    taskList.querySelectorAll(".task").forEach((taskItem) => {
        const text = taskItem.querySelector("span").textContent;
        const completed = taskItem.classList.contains("completed");
        tasks.push({ text, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => addTask(task.text, task.completed));
}
