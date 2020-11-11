window.onload = function() {
    
    let todoForm = document.querySelector('.todo-form');
    let filter = document.querySelector("#filter");
    let todoList = document.querySelector('.todo-items');
    let clearButton = document.querySelector("#clear-button");
    
    todoForm.addEventListener('submit', todo);
    filter.addEventListener("keyup", filterTodo);
    todoList.addEventListener('click', clearTodo);
    clearButton.addEventListener("click", clearAll);

    getFromLocalStorage();
} 

let todos = [];
let filterText = "";

function todo(e) {
    let newTodo = document.querySelector('.todo-input');
    
    e.preventDefault();
    addTodo(newTodo.value); 
    
    function addTodo() {
        let item = newTodo.value;
        if (item !== '') {
            let todo = {
                id: Date.now(),
                name: item,
                completed: false
            };
            
            todos.push(todo);
            addToLocalStorage(todos);
            
            newTodo.value = '';
        }
        else {
            alert("Please add a Todo!");
        } 
    }
}

function generateHTML() {
    let todoList = document.querySelector('.todo-items');
    todoList.innerHTML = '';
    
    todos.forEach(function(item) {
        let checked = item.completed ? 'checked': null;
        
        let li = document.createElement('li');
        
        li.setAttribute('class', 'item');
        
        li.setAttribute('data-key', item.id);
        
        if (item.completed === true) {
            li.classList.add('checked');
        }
        
        li.innerHTML = `
        <input type="checkbox" class="checkbox" ${checked}>
        ${item.name}
        <button class="delete-button">X</button>
        `;
        
        todoList.appendChild(li);
    });
    
    let allTask = document.querySelectorAll(".item");
    
    for (let task of allTask) {
        let item = task.textContent;
        
        if (item.toLowerCase().indexOf(filterText) != -1) {
            task.style.display = "block";
            
        } else {
            task.style.display = "none";
        }
    };
    
}

function addToLocalStorage(todos) {
    
    localStorage.setItem('todos', JSON.stringify(todos));
    
    generateHTML();
}

function getFromLocalStorage() {
    let reference = localStorage.getItem('todos');
    if (reference) {
        
        todos = JSON.parse(reference);
        generateHTML();
    }
}

function toggle(id) {
    todos.forEach(function(item) {
        
        if (item.id == id) {
            
            item.completed = !item.completed;
        }
    });
    
    addToLocalStorage(todos);
}

function deleteTodo(id) {
    
    todos = todos.filter(function(item) {
        
        return item.id != id;
    });
    
    
    addToLocalStorage(todos);
}

function clearAll() {
    let todoList = document.querySelector('.todo-items');
    todoList.innerHTML = " ";
    localStorage.clear(todos);
    todos = [];
}

function clearTodo(e) {
    
    if (e.target.type === 'checkbox') {
        
        toggle(e.target.parentElement.getAttribute('data-key'));
    }
    
    if (e.target.classList.contains('delete-button')) {
        
        deleteTodo(e.target.parentElement.getAttribute('data-key'));
    }
}

function filterTodo(e) {
    filterText = e.target.value.toLowerCase();
    generateHTML();
    
}

