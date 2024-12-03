// Initialize LocalForage
localforage.config({
  name: "ToDoApp",
  storeName: "todo_store",
  description: "Offline storage for To-Do List",
});

// DOM Elements
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");

// Render To-Do List
function renderTodos() {
  todoList.innerHTML = "";

  localforage
    .getItem("todos")
    .then((todos) => {
      if (!todos) todos = [];

      todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.textContent = todo;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteTodo(index));

        li.appendChild(deleteButton);
        todoList.appendChild(li);
      });
    })
    .catch((err) => console.error("Error fetching todos:", err));
}

// Add To-Do
function addTodo() {
  const task = todoInput.value.trim();
  if (!task) return alert("Task cannot be empty!");

  localforage
    .getItem("todos")
    .then((todos) => {
      if (!todos) todos = [];
      todos.push(task);

      localforage.setItem("todos", todos).then(() => {
        todoInput.value = "";
        renderTodos();
      });
    })
    .catch((err) => console.error("Error adding todo:", err));
}

// Delete To-Do
function deleteTodo(index) {
  localforage
    .getItem("todos")
    .then((todos) => {
      if (!todos) todos = [];
      todos.splice(index, 1);

      localforage.setItem("todos", todos).then(() => {
        renderTodos();
      });
    })
    .catch((err) => console.error("Error deleting todo:", err));
}

// Event Listeners
addButton.addEventListener("click", addTodo);

// Initial Render
renderTodos();
