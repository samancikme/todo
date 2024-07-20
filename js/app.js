const todoContent = document.querySelector("#todo-content")
const TodosContainer = document.querySelector("#todos-container")
const ModalAlert = document.querySelector("#edit-todo")
const formTodoEdit = document.querySelector("#form-todo-update")
 



let todos = JSON.parse(localStorage.getItem("todos")) || [
    {
        id : 1,
        title : "new todo1",
        complate : false,
        date : "17.07.2024 16:00"  
    },
    {
        id : 2,
        title : "new todo2",
        complate : false,
        date : "17.07.2024 16:00"  
    },
    {
        id : 3,
        title : "new todo3",
        complate : false,
        date : "17.07.2024 16:00"  
    }
]


if (!localStorage.getItem("todos")){
    localStorage.setItem("todos" , JSON.stringify(todos))
}







function showModal(id) {
    ModalAlert.classList.toggle("hidden")
    ModalAlert.classList.toggle("flex")
    updateId = id
    formTodoEdit["input-todo"].defaultValue = todos.find((item) => item.id === id).title
}

function closeModal() {
    ModalAlert.classList.toggle("flex")
    ModalAlert.classList.toggle("hidden")
}



formTodoEdit.onsubmit = (e) => {
    e.preventDefault()
    const inputValue = e.target["input-todo"].value.trim()
    editTodo(updateId, inputValue, nowDate)
    formTodoEdit.reset()
    closeModal()
}

function editTodo(id, title, date) {
    const newTodo = todos.map((todo) => {
        if (todo.id === id) {
            return {
                ...todo,
                complate: false,
                title: title,
                date: date
            }
            
        }
        return todo
    })
    todos = [...newTodo]
    localStorage.setItem("todos", JSON.stringify(todos))
    renderTodos(JSON.parse(localStorage.getItem("todos")))
}







function complt(id) {
    const compltTodo = todos.map((todo) => {
        if (todo.id === id) {
            let check = todo.complate 
            if (check === true){
                check = false
            } else {
                check = true
            }
            return {
                ...todo,
                complate : check
            }
        }
        return todo
    })
    todos = [...compltTodo]
    localStorage.setItem("todos", JSON.stringify(todos))
    renderTodos(JSON.parse(localStorage.getItem("todos")))
}
















function deleteTodo(id) {
    const theRest = todos.filter((item) => {
        return item.id !== id
    })
    todos = [...theRest]
    localStorage.setItem("todos" , JSON.stringify(todos))    
    renderTodos(JSON.parse(localStorage.getItem("todos")))
}





const fullDate = new Date()
const nowDate = `${fullDate.toLocaleDateString()}  ${fullDate.toLocaleTimeString().slice(0,5)}`



function renderTodos(array){
    TodosContainer.innerHTML = ""
    {todos.length > 0 ? 
        todos.map((todo , index) => {
            TodosContainer.innerHTML +=`
            <div class="flex justify-between sm:py-[10px] sm:px-[20px] p-[5px] bg-teal-300 rounded-xl gap-[20px] items-center w-[100%]">
                <div class="flex flex-row items-center md:gap-6 gap-[10px]">
    
                    <div class="sm:w-[40px] sm:h-[40px] w-[20px] h-[20px] border-[2px] border-black items-center justify-center flex rounded-lg">
                        <span class="sm:text-[28px] text-[14px] font-bold">${index +1}</span>
                    </div>
    
                    <div class="flex flex-col bg-slate-700 w-[160px] md:w-[100%]">
                        <span class="sm:text-[30px] text-[24px] font-bold min-w-[150px] md:w-[100%] overflow-clip  ${todo.complate && "line-through opacity-50"}">${todo.title}</span>
                    <div class="flex flex-col ">
                        <span class="sm:text-[32px] max-w-[250px] text-[24px] font-bold ${todo.complate && "line-through opacity-50"}">${todo.title}</span>
                        <span>${todo.date}</span>
                    </div>
    
                </div>
    
                <div class="flex flex-row md:gap-2 gap-1 text-end ease-in-out duration-300 ">
                    <button onclick="complt(${todo.id})" id="complated" class="sm:text-[50px] text-[40px] hover:text-yellow-50 ease-in-out duration-300 active:scale-90">${todo.complate ? "<i class='bx bx-checkbox-checked'></i>" : "<i class='bx bx-checkbox'></i>"}</button>


                    <button onclick="showModal(${todo.id})" id="etid" class="sm:text-[40px] text-[30px] hover:text-green-800 ease-in-out duration-300 active:scale-90"><i class='bx bxs-edit'></i></button>


                    <button onclick="deleteTodo(${todo.id})" id="delete" class="sm:text-[40px] text-[30px] hover:text-red-500 ease-in-out duration-300 active:scale-90 "><i class='bx bxs-trash-alt'></i></button>
                </div>
                
            </div>
        `}) 
        :
        TodosContainer.innerHTML = `<div class="flex justify-center items-center text-[60px] text-black mt-[100px]"><i class='bx bx-comment-x'></i>
        </div>
        <h1  class="flex justify-center items-center text-[40px] text-black opacity-80">Todo not found</h1>`
    }
}

renderTodos(JSON.parse(localStorage.getItem("todos")))








// get information from input
todoContent.addEventListener("submit" , (e) => {  
    e.preventDefault()
    const inpCont = e.target["todo-input"].value.trim()
    if (inpCont.length > 0){
        e.target["todo-input"].style.borderColor  = "green"
        const newTodo = {
            id : Date.now(),
            title : inpCont , 
            complate : false,
            date : nowDate
        }
        todos.push(newTodo)
        localStorage.setItem("todos" , JSON.stringify(todos))
        todoContent.reset()
        renderTodos(todos)
    }else{
        e.target["todo-input"].style.borderColor  = "red"
        e.target["todo-input"].focus()
    }
    
})


