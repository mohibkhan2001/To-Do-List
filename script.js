const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

function tickAllTasks() {
    const listItems = document.querySelectorAll("#list-container li");
    let allChecked = true;
    // Check if all items are already checked
    listItems.forEach(item => {
        if (!item.classList.contains("checked")) {
            allChecked = false;
        }
    });
    
    // Toggle check state based on current state
    listItems.forEach(item => {
        if (allChecked) {
            item.classList.remove("checked"); // Uncheck all items
        } else {
            item.classList.add("checked"); // Check all items
        }
    });
    saveData();
}

function deleteAllTasks() {
    listContainer.innerHTML = ""; // Clear the entire list
    saveData(); // Update the localStorage
}

showTask();
