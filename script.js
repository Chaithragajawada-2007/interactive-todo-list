const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const li = document.createElement("li");
        li.classList.add("task");

        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        taskText.classList.add("task-text");

        if (task.completed) {
            taskText.classList.add("completed");
        }

        taskText.addEventListener("click", function() {

            tasks[index].completed = !tasks[index].completed;

            saveTasks();
            displayTasks();

        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");

        deleteButton.addEventListener("click", function() {

            tasks.splice(index, 1);

            saveTasks();
            displayTasks();

        });

        li.appendChild(taskText);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}


function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        return;
    }

    const newTask = {
        text: text,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    taskInput.value = "";

    displayTasks();
}


function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}


addButton.addEventListener("click", addTask);


taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});


displayTasks();