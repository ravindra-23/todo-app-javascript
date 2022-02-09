// Declarations

let todos = []


// Selectors

const form = document.querySelector('.form')
const todoInput = document.querySelector('.todo-input')
const todoContainer = document.querySelector('.todo-container')
const todoTemplate = document.getElementById('todo-template')

// Functions

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
}

// Event-Listeners

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const todoName = todoInput.value
    console.log(todoName)
    const todo = createTodo(todoName)
    todos.push(todo)
    console.log(todos)
    todoInput.value = ''
    render()
})