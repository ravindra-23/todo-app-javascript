// Declarations

let todos = [
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



// Functions

// Function for submitting todo
function todoSubmit(e) {
    e.preventDefault()
    const todoName = todoInput.value
    const todo = createTodo(todoName)
    todos.push(todo)
    todoInput.value = ''
    render()
}

// Function to create todo object
function createTodo(text) {
    let id = todos.length + 1;
    return {id: id.toString(), name: text, complete: false}
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
    renderTodoCount()
}

function checkAndDeleteTodo(e) {
    if(e.target.tagName.toLowerCase() === 'input') {
        console.log('checkbox clicked')
        const selectedTodo = todos.find(todo => todo.id === e.target.id)
        console.log(selectedTodo)
        selectedTodo.complete = e.target.checked
        console.log(todos)
        renderTodoCount()
    }

    if(e.target.parentElement.tagName.toLowerCase() === 'button') {
        deleteTodo(e.target.parentElement.id)
    }
}

// Function to delete a todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id)
    render()
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



// Event-Listeners

form.addEventListener('submit', todoSubmit)
todoContainer.addEventListener('click', checkAndDeleteTodo)
clearCompletedBtn.addEventListener('click', clearCompleted)

render()