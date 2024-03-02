
let elForm = document.querySelector(".wrapper__form")
let elInput = document.querySelector(".wrapper__input")
let elList = document.querySelector(".wrapper__tasklist")

let elmodalWrapper = document.querySelector(".wrapper__modal")
let elModal = document.querySelector(".modal")

let elAll = document.querySelector(".all")
let elCompleted = document.querySelector(".Complete")
let elUncompleted = document.querySelector(".unComplete")

let elAllcount = document.querySelector(".all-count")
let elCompletecount = document.querySelector(".complete-count")
let elUncompletecount = document.querySelector(".uncomplete-count")


let elBody = document.querySelector("body")
let elBtnMode = document.querySelector(".modebtn")

elBtnMode.addEventListener("click", function(){
 elBody.classList.toggle("mode")
})

let todo =[]
elForm.addEventListener("submit", function(evt){
    evt.preventDefault()
    let inputValue = elInput.value
    let data = {
        id: todo.length +1,
        value: inputValue,
        iscomplete: false
    }
    todo.push(data)
    renderList(todo, elList)
    allCountbtn();
    evt.target.reset()
})


function renderList(arr, list){
    list.innerHTML = ""
    arr.map(item =>{
        let elItem = document.createElement("li")
        elItem.classList.add("item")
        list.appendChild(elItem)
        elItem.innerHTML = `
        <div class="item__warpper ${item.iscomplete ? "complete" : ""}">
        <div  class="item__demo">
        <label>
        <input class="item__input visually-hidden" type="checkbox">
        <span id="${item.id}" class="item__line"></span>
        </label> 
        <span class="item__bold"  >${item.id}.</span>
        <strong class="item__bold">${item.textContent = item.value}</strong>
        </div>
        <div class="item__card">       
        <button class="update" onclick="updateClick(${item.id})">Update</button>
        <button onclick="deleteClick(${item.id})" class="delete">Delete</button>
        </div>
        </div>
        `
    })
}

function countFilter(todo){
    return elAllcount.textContent = todo.length
}

// ----------------------Update start ------------------

function updateClick(id){
    elmodalWrapper.classList.add("open-modal")
    const data = todo.find(item => item.id === id)
    elModal.innerHTML = `
   nju  <div class="modal-card">
    <button onclick="modalexit(${id.id})" class="modal-exit">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
    </svg>
    </button>
    <strong class="modal-bold">Update your todo</strong>
    <input required value="${data.value}" class="modal-input" type="text" placeholder="Enter new todo">
    <button onclick="updateBtnClick(${id})" class=modal-update>Update</button>
    </div>
    `
}


function updateBtnClick(id){
    let  elIpnutvalue = document.querySelector(".modal-input").value
    const data = todo.find(item => item.id === id)
    data.value = elIpnutvalue;
    elmodalWrapper.classList.remove("open-modal")
    renderList(todo, elList)
}

// ----------------------Update end ------------------

// ------Delete start------------

function deleteClick(id){
    elmodalWrapper.classList.add("open-modal")
    elModal.innerHTML = `
    <div class="delete-card">
    <h2>Are you sure you want to delete it?</h2>
    <div>
    <button onclick="cancelClick()">Cancel</button>
    <button onclick="deleteBtnClick(${id})">Delete</button>
    </div>
    </div>
    `
}

function cancelClick(){
    elmodalWrapper.classList.remove("open-modal")
}

function deleteBtnClick(id){
    elmodalWrapper.classList.add("open-modal")
    const data = todo.findIndex(item => item.id == id)
    todo.splice(data , 1)
    elmodalWrapper.classList.remove("open-modal")
    renderList(todo, elList)
}

// ------Delete end------------

// -------------Modal start-------------

elmodalWrapper.addEventListener("click", function(evt){
    if(evt.target.id == "wrapper__modal"){
        elmodalWrapper.classList.remove("open-modal")
    }
})

function  modalexit(evt){
    elmodalWrapper.classList.remove("open-modal")
}

// -------------Modal end-------------

// --------------Checkbox start -------------------



elList.addEventListener("click", function(evt){
    if(evt.target.matches(".item__line")){
        const data = todo.find(item => item.id == evt.target.id)
        data.iscomplete = !data.iscomplete
        renderList(todo, elList)
    }
    const result = todo.filter(item=> item.iscomplete == true)  //-----------Completed count-----------
    elCompletecount.textContent = result.length
    renderList(todo, elList)
    
    elCompleted.addEventListener("click", function(){
        renderList(result, elList)
    })                                                           //-----------Completed count-end----------
})

// ---------------------Uncompleted-----------


elList.addEventListener("click", function(evt){
    if(evt.target.matches(".item__line")){
        const res = todo.filter(item => item.iscomplete == false)
        elUncompletecount.textContent = res.length
         renderList(todo, elList)

         elUncompleted.addEventListener("click", function(){
            renderList(res, elList)
        })
    }
})

// ---------------------Uncompleted- end----------

// ----------------All-count-----

function allCountbtn(){
    elAllcount.textContent = todo.length;
    elUncompletecount.textContent = todo.length
    elAll.addEventListener("click", function(){
        renderList(todo, elList)
    })
}

// ----------------All-count-end----

// --------------Checkbox end -------------------

