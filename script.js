"use strict";

const inputElement = document.querySelector("#new-todo");
const addButtonElement = document.querySelector("#add-button");
const todoListElement = document.querySelector("#todo-list");

let todoList = [];
let updateIndex = null; 

const renderTodoList = () => {
  todoListElement.innerHTML = "";
  todoList.forEach((todo, index) => {
    const todoElement = createTodoElement(todo, index);
    todoListElement.appendChild(todoElement);
  });
};

const addOrUpdateTodo = () => {
  const value = inputElement.value.trim();
  if (value) {
    if (updateIndex !== null) {
      todoList[updateIndex].text = value;
      updateIndex = null;
      addButtonElement.textContent = '追加';
    } else {
      todoList.push({ text: value, completed: false });
    }
    renderTodoList();
    inputElement.value = "";
  }
};

const toggleTodo = (index) => {
  todoList[index].completed = !todoList[index].completed;
  if (todoList[index].completed) {
    Swal.fire({
      icon: 'success',
      title: '完了!',
      text: 'To-Do が完了しました。',
    });
  }
  renderTodoList();
};

const deleteTodo = (index) => {
  todoList.splice(index, 1);
  renderTodoList();
};

const updateTodo = (index) => {
  inputElement.value = todoList[index].text;
  addButtonElement.textContent = '更新';
  updateIndex = index;
};

const createTodoElement = (todo, index) => {
  const li = document.createElement("li");
  li.innerHTML = todo.text;

  const completeButton = document.createElement("button");
  completeButton.textContent = todo.completed ? "Undo" : "Complete";
  completeButton.classList = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mx-2";
  completeButton.addEventListener("click", () => toggleTodo(index));
  li.appendChild(completeButton);

  const updateButton = document.createElement("button");
  updateButton.textContent = "Update";
  updateButton.classList = "bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mx-2";
  updateButton.addEventListener("click", () => updateTodo(index));
  li.appendChild(updateButton);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList = "bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mx-2";
  deleteButton.addEventListener("click", () => deleteTodo(index));
  li.appendChild(deleteButton);

  return li;
};

addButtonElement.addEventListener("click", addOrUpdateTodo);
