// Declarations
const LOCAL_STORAGE_TODOS = 'tasks.todo'

let todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS)) || [
    {
        id: '1',
        name: 'Complete online Javascript Course',
        complete: false
    },

    {
        id: '2',
        name: 'Jog around the park 3x',
        complete: false
    },

    {
        id: '3',
        name: '10 minutes meditation',
        complete: false
    },
]



// Selectors

const form = document.querySelector('.form')
const todoInput = document.querySelector('.todo-input')
const todoContainer = document.querySelector('.todo-container')
const todoTemplate = document.getElementById('todo-template')
const clearCompletedBtn = document.querySelector('.clear-completed')
const todosLeft = document.querySelector('.todos-left')
const actionButtons = document.querySelector('.action-btns')
const themeBtn = document.querySelector('.theme-btn')
const errorMessage = document.querySelector('.error')



// Functions

// Function for submitting todo
function todoSubmit(e) {
    e.preventDefault()
    const todoName = todoInput.value
    if(todoName === null || todoName === '') {
        errorMessage.style.display = 'block'
        setTimeout(() => {
            errorMessage.style.display = 'none'
        }, 2000)
    } else {
        const todo = createTodo(todoName)
        todos.push(todo)
        todoInput.value = ''
        render()
    }
}

// Function to create todo object
function createTodo(text) {
    return {id: Date.now().toString(), name: text, complete: false}
}

// Function to render Todo
function renderTodo() {
    todos.forEach(todo => {
        const todoElement = document.importNode(todoTemplate.content, true)
        const checkbox = todoElement.querySelector('input')
        checkbox.id = todo.id
        checkbox.checked = todo.complete
        const label = todoElement.querySelector('label')
        label.htmlFor = todo.id
        label.append(todo.name)
        const deleteBtn = todoElement.querySelector('button')
        deleteBtn.id = todo.id
        todoContainer.appendChild(todoElement)
    })
    saveToLocalStorage()
}

// Function to clear the existing element from container
function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

// function to clear and render todos
function render() {
    clearElement(todoContainer)
    renderTodo(todos)
    renderTodoCount()
    saveToLocalStorage()
}

// function to check and delete todo
function checkAndDeleteTodo(e) {
    if(e.target.tagName.toLowerCase() === 'input') {
        console.log('checkbox clicked')
        const selectedTodo = todos.find(todo => todo.id === e.target.id)
        console.log(selectedTodo)
        selectedTodo.complete = e.target.checked
        console.log(todos)
        renderTodoCount()
        saveToLocalStorage()
    }

    if(e.target.parentElement.tagName.toLowerCase() === 'button') {
        deleteTodo(e.target.parentElement.id)
    }
}

// Function to delete a todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id)
    render()
    saveToLocalStorage()
}

// Function to clear completed todos
function clearCompleted() {
    todos = todos.filter(todo => !todo.complete)
    render()
}

// Function to render todos left count
function renderTodoCount() {
    const incompleteTodoCount = todos.filter(todo => !todo.complete).length
    const todoString = incompleteTodoCount === 1 ? 'todo' : 'todos'
    todosLeft.innerText = `${incompleteTodoCount} ${todoString} left`
}

function filter(e) {
    if(e.target.tagName.toLowerCase() === 'button') {
        const id = e.target.id
        filterTodos(id)
    }
}

// Functio to filter todos
function filterTodos(id) {

    const allTodos = document.querySelectorAll('.todo')
    console.log(allTodos)
    
    switch(id) {
        case 'All':
            allTodos.forEach(todo => {
                todo.classList.remove('hidden')
            })
            break;

        case 'Active': 
            allTodos.forEach(todo => {
                todo.querySelector('input').checked ? todo.classList.add('hidden') : todo.classList.remove('hidden')
            })   
            break;
            
        case 'Completed': 
            allTodos.forEach(todo => {
                todo.querySelector('input').checked ? todo.classList.remove('hidden') : todo.classList.add('hidden')
            }) 
            break;   
    }

}

// Function to toggle Dark mode
function toggleTheme() {
    document.body.classList.toggle('dark')
}

function saveToLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_TODOS, JSON.stringify(todos))
}



// Event-Listeners

form.addEventListener('submit', todoSubmit)
todoContainer.addEventListener('click', checkAndDeleteTodo)
clearCompletedBtn.addEventListener('click', clearCompleted)
actionButtons.addEventListener('click', filter)
themeBtn.addEventListener('click', toggleTheme)

render()