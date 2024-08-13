// checking if itemsArray is in localStorage, else defining it as []
const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
const completedArray = localStorage.getItem('completed') ? JSON.parse(localStorage.getItem('completed')) : [];

// on pressing ENTER to add an element
document.querySelector("#enter").addEventListener("click", () => {
  const item = document.querySelector("#item")
  createItem(item)
})

// on pressing the ENTER key on keyboard
document.querySelector("#item").addEventListener("keypress", (e) => {
  if(e.key === "Enter"){
    const item = document.querySelector("#item")
    createItem(item)
  }
})

// to display the current date
function displayDate(){
  let date = new Date()
  date = date.toString().split(" ")
  date = date[2] + " " + date[1] + " " + date[3] 
  document.querySelector("#date").innerHTML = date 
}

// displaying each element in the array
function displayItems(){
  let items = ""
  for(let i = 0; i < itemsArray.length; i++){
    items += `<div class="item">
                <div class="input-controller">
                  <textarea disabled>${itemsArray[i]}</textarea>
                  <div class="edit-controller">
                    <i class="fa-solid fa-check deleteBtn"></i>
                    <i class="fa-solid fa-pen-to-square editBtn"></i>
                  </div>
                </div>
                <div class="update-controller">
                  <button class="saveBtn">Save</button>
                  <button class="cancelBtn">Cancel</button>
                </div>
              </div>`
  }
  items += `<div class='completedtitle'>
              <div class='completedHeading'>Completed</div>
              <div class="delete-button">
                
              </div>
            </div>`
  
  if(completedArray.length === 0){
    items += `<div class='emptybox'>
        <h3>The list is empty</h3>
      </div>`
  }
  for(let j = completedArray.length - 1; j >= 0; j--){
    items += `<div class='completedbox'>
                  <div class = 'completedtask'>
                    <h3>${completedArray[j]}</h3>
                  </div>
                  <div class="delete-button">
                    <i class="fa-solid fa-trash-can delBtn"></i>
                  </div>
                </div>`
  }

  document.querySelector(".to-do-list").innerHTML = items
  activateDeleteListeners()
  activateEditListeners()
  activateSaveListeners()
  activateCancelListeners()
  activateDeleteCompletedListeners()
  // activateClearAllListeners()
}

function displayEmpty(){
  let data = `<div class='emptybox'>
      <h3>The list is empty</h3>
    </div>`
  data += `<div class='completedtitle'>
            <div class='completedHeading'>Completed</div>
            <div class="delete-button">
              
            </div>
          </div>`
  if(completedArray.length === 0){
    data += `<div class='emptybox'>
        <h3>The list is empty</h3>
      </div>`
  }
  for(let j = completedArray.length - 1; j >= 0; j--){
    data += `<div class='completedbox'>
                  <div class = 'completedtask'>
                    <h3>${completedArray[j]}</h3>
                  </div>
                  <div class="delete-button">
                    <i class="fa-solid fa-trash-can delBtn"></i>
                  </div>
                </div>`
  }
  
  document.querySelector(".to-do-list").innerHTML = data
  activateDeleteCompletedListeners()
  // activateClearAllListeners()
}

// when the user presses the 'checkmark' button -> delete the element from array
function activateDeleteListeners(){
  let deleteBtn = document.querySelectorAll(".deleteBtn")
  deleteBtn.forEach((dB, i) => {
    dB.addEventListener("click", () => { deleteItem(i) })
  })
}

// when the user presses on the edit button
function activateEditListeners(){
  const editBtn = document.querySelectorAll(".editBtn")
  const updateController = document.querySelectorAll(".update-controller")
  const inputs = document.querySelectorAll(".input-controller textarea")
  editBtn.forEach((eB, i) => {
    eB.addEventListener("click", () => { 
      updateController[i].style.display = "block"
      inputs[i].disabled = false })
  })
}

// when the user presses the save button
function activateSaveListeners(){
  const saveBtn = document.querySelectorAll(".saveBtn")
  const inputs = document.querySelectorAll(".input-controller textarea")
  saveBtn.forEach((sB, i) => {
    sB.addEventListener("click", () => {
      updateItem(inputs[i].value, i)
    })
  })
}

// when the user presses the cancel button
function activateCancelListeners(){
  const cancelBtn = document.querySelectorAll(".cancelBtn")
  const updateController = document.querySelectorAll(".update-controller")
  const inputs = document.querySelectorAll(".input-controller textarea")
  cancelBtn.forEach((cB, i) => {
    cB.addEventListener("click", () => {
      updateController[i].style.display = "none"
      inputs[i].disabled = true
      inputs[i].style.border = "none"
    })
  })
}

// when the user wants to delete the completed task
function activateDeleteCompletedListeners(){
  let delBtn = document.querySelectorAll(".delBtn")
  delBtn.forEach((db, i) => {
    db.addEventListener("click", () => { deleteCompleted(i) })
  })
}

// function activateClearAllListeners(){
//   let clearallBtn = document.querySelectorAll(".clearallBtn")
//   clearallBtn.forEach((db, i) => {
//     db.addEventListener("click", clearall())
//   })
// }

// adding a element to itemsArray and saving it to local storage
function createItem(item){
  itemsArray.push(item.value)
  localStorage.setItem('items', JSON.stringify(itemsArray))
  location.reload()
}

// deleting an element from itemsArray and saving it to local storage
function deleteItem(i){
  completedArray.push(itemsArray[i])
  if(completedArray.length > 10){
    completedArray.splice(0, 1)
  }
  localStorage.setItem('completed', JSON.stringify(completedArray))
  
  itemsArray.splice(i,1)
  localStorage.setItem('items', JSON.stringify(itemsArray))
  location.reload()
}

function deleteCompleted(i){
  completedArray.splice(completedArray.length - 1 - i,1)
  localStorage.setItem('completed', JSON.stringify(completedArray))
  location.reload()
}

// function clearall(){
//   completedArray.splice(0, completedArray.length)
//   localStorage.setItem('completed', JSON.stringify(completedArray))
// }

// updating an element from itemsArray and saving it to local storage
function updateItem(text, i){
  itemsArray[i] = text
  localStorage.setItem('items', JSON.stringify(itemsArray))
  location.reload()
}

// fuction calls required at opening of the webpage
window.onload = function() {
  displayDate()
  if(itemsArray.length === 0){
    displayEmpty()
  }
  else{
    displayItems()
  }
};