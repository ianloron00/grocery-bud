// https://www.vanillajavascriptprojects.com/
// https://github.com/john-smilga/javascript-basic-projects/tree/master/07-questions
"use strict";
// ****** SELECT ITEMS **********
const submit = document.querySelector(".submit-btn");
const clear = document.querySelector(".clear-btn");
const list = document.querySelector(".grocery-list");
const grocery = document.getElementById("grocery");
const container = document.querySelector(".grocery-container");

// ****** EVENT LISTENERS **********

submit.addEventListener("click", addItem);
clear.addEventListener("click", clearItems);

// ****** FUNCTIONS **********
function addItem(e) {
    e.preventDefault();
    let newGrocery = grocery.value;
    grocery.value = "";
    if (newGrocery !== "" ) {
        let elem = document.createElement("article");
        let attr = document.createAttribute("data-id");
        attr.value = new Date().getTime().toString();
        
        elem.setAttributeNode( attr );
        elem.classList.add("grocery-item");
        elem.innerHTML = `
        <p class="title">${newGrocery}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        `
        const editBtn = elem.querySelector(".edit-btn");
        const deleteBtn = elem.querySelector(".delete-btn");
        
        editBtn.addEventListener("click", editItem);
        deleteBtn.addEventListener("click", deleteItem);

        list.appendChild( elem );
        container.classList.add("show-container");


    } 
}

function editItem(e) {

} 

function deleteItem(e) {
    
}

function clearItems() {
    const items = document.querySelectorAll(".grocery-item");
    if (items.length > 0) {
        items.forEach( (item) => list.removeChild(item) );
        container.classList.remove("show-container");
    }
}

// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********
