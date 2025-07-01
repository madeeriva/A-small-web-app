// Get references to HTML elements
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

// Function to load todos from local storage
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => addTodoToDOM(todo.text, todo.completed));
}

// Function to save todos to local storage
function saveTodos() {
    const todos = [];
    todoList.querySelectorAll('li').forEach(li => {
        todos.push({
            text: li.querySelector('.task-text').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to add a new todo item to the DOM
function addTodoToDOM(taskText, isCompleted = false) {
    if (taskText.trim() === "") {
        alert("Task cannot be empty!");
        return;
    }

    const listItem = document.createElement('li');
    if (isCompleted) {
        listItem.classList.add('completed');
    }

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    taskSpan.classList.add('task-text');
    taskSpan.addEventListener('click', () => {
        listItem.classList.toggle('completed'); // Toggle 'completed' class
        saveTodos(); // Save after state change
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
        todoList.removeChild(listItem); // Remove the list item
        saveTodos(); // Save after deletion
    });

    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);
}

// Event listener for the Add Task button
addButton.addEventListener('click', () => {
    const taskText = todoInput.value;
    addTodoToDOM(taskText);
    todoInput.value = ''; // Clear the input field
    saveTodos(); // Save after adding a new task
});

// Optional: Allow adding tasks by pressing Enter key in the input field
todoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addButton.click(); // Simulate a click on the add button
    }
});

// Load todos when the page loads
document.addEventListener('DOMContentLoaded', loadTodos);
