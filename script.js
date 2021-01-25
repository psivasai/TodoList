//SELECTORS
const userInput = document.querySelector(".inputText")
const addButton = document.querySelector(".addButton")

const todolist = document.querySelector(".todoList")
const check = document.querySelector(".fa-trash")

//EVENT LISTNERS

addButton.addEventListener("click", addTodo)
todolist.addEventListener("click", removeTodo)
//FUNCTION TO ADD TODO

function addTodo() {
  if (userInput.value.length > 0) {
    localStoreSetting()

    const enteredValue = userInput.value
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("newTodo")
    const todoLi = document.createElement("li")
    todoLi.classList.add("todoText")
    todoLi.innerText = enteredValue

    const completeButton = document.createElement("i")
    completeButton.classList.add("fas")
    completeButton.classList.add("fa-check-square")

    const deleteButton = document.createElement("i")
    deleteButton.classList.add("fas")
    deleteButton.classList.add("fa-trash")
    todoDiv.prepend(deleteButton)
    todoDiv.prepend(completeButton)

    todoDiv.prepend(todoLi)
    todolist.prepend(todoDiv)
    userInput.value = ""
  } else alert("please enter the Todo")
}

//FUNCTION TO MARK TODO AND REMOVE TODO

function removeTodo(e) {
  //Removing Todo
  const targetedElement = e.target
  if (targetedElement.classList.contains("fa-trash")) {
    targetedElement.parentElement.remove()

    var removingStorageTodo = JSON.parse(localStorage.getItem("todos"))
    removingStorageTodo.map((todo, index) => {
      if (targetedElement.parentElement.children[0].innerText == todo) {
        removingStorageTodo.splice(index, 1)
        localStorage.setItem("todos", JSON.stringify(removingStorageTodo))
      }
    })
  }
  //Completed Todo

  if (targetedElement.classList.contains("fa-check-square")) {
    targetedElement.parentElement.children[0].classList.toggle("completed")
  }
}

// FUNCTION TO STORE IN LOCAL STORAGE
var todos = []

function localStoreSetting() {
  if (localStorage.getItem("todos") == null) {
    localStorage.setItem("todos", todos)
  }
  todos.push(userInput.value)
  localStorage.setItem("todos", JSON.stringify(todos))
}
// FUNCTION  TO  RETRIVE THE VALUES FROM LOCAL STORAGE
function localStoreGetting() {
  if (localStorage.getItem("todos") == null) {
  } else {
    const getValue = localStorage.getItem("todos")
    JSON.parse(getValue).map((todo) => {
      const enteredValue = todo
      const todoDiv = document.createElement("div")
      todoDiv.classList.add("newTodo")
      const todoLi = document.createElement("li")
      todoLi.classList.add("todoText")
      todoLi.innerText = enteredValue

      const completeButton = document.createElement("i")
      completeButton.classList.add("fas")
      completeButton.classList.add("fa-check-square")

      const deleteButton = document.createElement("i")
      deleteButton.classList.add("fas")
      deleteButton.classList.add("fa-trash")

      todoDiv.prepend(deleteButton)
      todoDiv.prepend(completeButton)

      todoDiv.prepend(todoLi)
      todolist.prepend(todoDiv)
      userInput.value = ""
    })
  }
}
localStoreGetting()
