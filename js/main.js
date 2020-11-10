window.onload = function() {
    
    let todoForm = document.querySelector('.todo-form');
    let filter = document.querySelector("#filter");
    let todoList = document.querySelector('.todo-items');
    let clearButton = document.querySelector("#clear-button");
    
    todoForm.addEventListener('submit', todo);
    filter.addEventListener("keyup", filterTask);
    todoList.addEventListener('click', clearTask);
    clearButton.addEventListener("click", clearAll);

    getFromLocalStorage();
} 

let todos = [];
let filterText = "";

function todo(e) {
    let newTask = document.querySelector('.todo-input');
    
    e.preventDefault();
    addTodo(newTask.value); 
    
    function addTodo() {
        let item = newTask.value;
        if (item !== '') {
            let todo = {
                id: Date.now(),
                name: item,
                completed: false
            };
            
            todos.push(todo);
            addToLocalStorage(todos);
            
            newTask.value = '';
        }
        else {
            alert("Please add a task!");
        } 
    }
}

function renderTodos() {
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
    
    renderTodos();
}


function getFromLocalStorage() {
    let reference = localStorage.getItem('todos');
    if (reference) {
        
        todos = JSON.parse(reference);
        renderTodos();
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


function clearTask(e) {
    
    if (e.target.type === 'checkbox') {
        
        toggle(e.target.parentElement.getAttribute('data-key'));
    }
    
    if (e.target.classList.contains('delete-button')) {
        
        deleteTodo(e.target.parentElement.getAttribute('data-key'));
    }
}

function filterTask(e) {
    filterText = e.target.value.toLowerCase();
    renderTodos();
    
}

