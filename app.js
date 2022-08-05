// https://www.vanillajavascriptprojects.com/
// https://github.com/john-smilga/javascript-basic-projects/tree/master/07-questions
"use strict";
// ****** SELECT ITEMS **********
const submit = document.querySelector(".submit-btn");
const clear = document.querySelector(".clear-btn");
const list = document.querySelector(".grocery-list");
const grocery = document.getElementById("grocery");
const container = document.querySelector(".grocery-container");
const submitBtn = document.querySelector(".submit-btn");
let editFlag = false;
let editID = "";
let editElement = null;

// ****** EVENT LISTENERS **********

submit.addEventListener("click", addItem);
clear.addEventListener("click", clearItems);

// ****** FUNCTIONS **********
function addItem(e) {
    e.preventDefault();
    let newGrocery = grocery.value;
    grocery.value = "";
    if (newGrocery !== "" ) {

        if (editFlag) {
            editElement.innerHTML = newGrocery;
            editLocalStorage( editID, newGrocery );
            setBackToDefault();
        }

        else {
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
            
            addToLocalStorage( attr.value, newGrocery );
        }
    } 
}

function editItem(e) {
    // we want the <p>
    const element = e.currentTarget.parentElement.parentElement;
    editID = element.dataset.id;
    editFlag = true;
    editElement = e.currentTarget.parentElement.previousElementSibling;

    grocery.value = editElement.innerHTML;
    submit.textContent = "edit";
}

function deleteItem(e) {
    // button -> btn-container ->grocery-item
    let element = e.currentTarget.parentElement.parentElement;
    list.removeChild(element);
    if (list.children.length === 0) {
        container.classList.remove("show-container");
    }
}

function clearItems() {
    const items = document.querySelectorAll(".grocery-item");
    if (items.length > 0) {
        items.forEach( (item) => list.removeChild(item) );
        container.classList.remove("show-container");
    }
}

function setBackToDefault() {
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
}
// ****** LOCAL STORAGE **********
function getLocalStorage() {
    return localStorage.getItem("list") ?
    JSON.parse( localStorage.getItem("list") ) :
    [];
}

function getItemFromLocalStorage( id ) {
    const items = getLocalStorage();
    items.forEach((item) => {
        if (item.id === id)
            return item;
    });
}

function addToLocalStorage(id, value) {
    const newGrocery = {id, value};
    let items = getLocalStorage();
    items.push( newGrocery );
    localStorage.setItem("list", JSON.stringify( items ) ); 
}

function removeFromLocalStorage( id ) {
    let items = getLocalStorage();
    items.filter( (item) => {
        return ( item.id !== id )
    } );
    console.log("removeFromLocalStorage: ", items);
    localStorage.setItem("list", JSON.stringify( items ) );
}

function editLocalStorage( id, value ) {
    let items = getLocalStorage();

    items = items.map((item) => {
        if (item.id === id) {
            item.value = value;
        }
        return item;
    });
    localStorage.setItem("list", JSON.stringify(items) );
}
// ****** SETUP ITEMS **********
