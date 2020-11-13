window.onload = function() {
    let todoForm = document.querySelector('.todo-form');
    let search = document.querySelector('#search-input');
    let todoList = document.querySelector('.todo-items');
    let clearButton = document.querySelector('#clear-button');
    
    todoForm.addEventListener('submit', todo);
    search.addEventListener('keyup', searchTodo);
    todoList.addEventListener('click', clearTodo);
    clearButton.addEventListener('click', clearAll);
    
    getFromLocalStorage();
} 

let todos = [];
let searchText = "";

function todo(e) {
    let newTodo = document.querySelector('#todo-input');
    
    e.preventDefault();
    addTodo(newTodo.value); 
    
    function addTodo() {
        let item = newTodo.value;
        
        if (item !== "") {
            let todo = {
                id: Date.now(),
                name: item,
                completed: false
            };
            todos.push(todo);
            addToLocalStorage(todos);
            newTodo.value = "";
        }
        else {
            alert("Please add a task!");
        } 
    }
}

function generateHTML() {
    let todoItems = document.querySelector('.todo-items');
    
    todoItems.innerHTML = "";

    for (let i = 0; i < todos.length; i++) {
        let checked = todos[i].completed ? 'checked' : null;
        let li = document.createElement('li');
        
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', todos[i].id);

        if (todos[i].completed ===true) {
            li.classList.add('checked');
        }
        li.innerHTML = `
        <input type= 'checkbox' class= 'checkbox'${checked}>
        ${todos[i].name}
        <i class='fas fa-trash-alt delete-icon'></i>
        `;

        todoItems.appendChild(li);
    }
    
    searchCondition();   
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
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            todos[i].completed =!todos[i].completed;
        }
    }
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
    if (e.target.classList.contains('delete-icon')) {
        deleteTodo(e.target.parentElement.getAttribute('data-key'));
    }
}

function searchTodo(e) {
    searchText = e.target.value.toLowerCase();
    
    searchCondition();       
}

function searchCondition(){
    let allTask = document.querySelectorAll('.item');
    
    for (let task of allTask) {
        let item = task.textContent;
        if (item.toLowerCase().indexOf(searchText) != -1) {
            task.style.display = 'block';   
        } else {
            task.style.display = 'none';
        }
    } 
}

