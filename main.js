window.onload = function() {
    
    const todoForm = document.querySelector('.todo-form');
    const todoInput = document.querySelector('.todo-input');
    const todoItemsList = document.querySelector('.todo-items');
    const filter = document.querySelector("#filter");
    const clearButton = document.querySelector("#clear-button");
    
    let todos = [];
    let filterText = "";
    
    
    todoForm.addEventListener('submit', todo);
    filter.addEventListener("keyup", filterTask);
    todoItemsList.addEventListener('click', clearTask);
    clearButton.addEventListener("click", clearAll);
    
    function todo(e) {
        e.preventDefault();
        addTodo(todoInput.value); 
    }
    
    function addTodo(item) {
        if (item !== '') {
            const todo = {
                id: Date.now(),
                name: item,
                completed: false
            };
            
            todos.push(todo);
            addToLocalStorage(todos);
            
            todoInput.value = '';
        }
        else {
            alert("Please add a task!");
        } 
    }
    
    function renderTodos() {
        
        todoItemsList.innerHTML = '';
        
        todos.forEach(function(item) {
            const checked = item.completed ? 'checked': null;
            
            const li = document.createElement('li');
            
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
            
            todoItemsList.appendChild(li);
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
        const reference = localStorage.getItem('todos');
        // if reference exists
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
    
    
    getFromLocalStorage();
    
    function clearAll() {
        todoItemsList.innerHTML = " ";
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
    
} 