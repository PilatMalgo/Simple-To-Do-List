//SELECT ELEMENTS AND ASSIGN THEM TO VARS
var newTask = document.querySelector('#new-task');
var addTaskBtn = document.querySelector('#addTask');

var toDoList = document.querySelector(".todo-list ul");
var completeToDoList =  document.querySelector(".complete-list ul");

var counter = 0;
//CREATE FUNCTIONS

//CREATING THE ACTUAL TASK LIST ITEM
var createNewTask = function(task){
  console.log("Creating task...");
  
  //SET UP THE NEW LIST ITEM
  var listItem = document.createElement("li"); //<li>
  var checkBox = document.createElement("input"); //checkbox
  var label = document.createElement("label"); // <label>
  
  
  //PULL THE INPUTED TEXT INTO LABEL
  label.innerText = task;
  
  //ADD PROPERTIES
  checkBox.type = "checkbox";
  
  //ADD ITEMS TO THE LI
  listItem.setAttribute("id", "task"+counter);
  counter++;
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  //EVERYTHING PUT TOGETHER
  return listItem;  
  
};

//ADD THE NEW TASK INTO ACTUAL INCOMPLETE LIST
var addTask = function(){
  console.log("Adding task...");
  //FOR CLARITY, GRAB THE INPUTTED TEXT AND STORE IT IN A VAR
  var listItem = createNewTask(newTask.value);
  //ADD THE NEW LIST ITEM TO LIST
  toDoList.appendChild(listItem); 
  //CLEAR THE INPUT
  newTask.value="";
  
  //BIND THE NEW LIST ITEM TO THE INCOMPLETE LIST
  //bindIncompleteItems(listItem, completeTask);

};

var completeTask = function(element){
  
  //GRAB THE CHECKBOX'S PARENT ELEMENT, THE LI IT'S IN
  //var listItem = this.parentNode;
  var listItem = element.parentNode;
  
  //CREATE AND INSERT THE DELETE BUTTON
  var deleteBtn = document.createElement("button"); // <button>
  deleteBtn.innerText ="Delete"; 
  deleteBtn.className = "delete";
  listItem.appendChild(deleteBtn);
  
  //SELECT THE CHECKBOX FROM THE COMPLETED CHECKBOX AND REMOVE IT
  var checkBox = listItem.querySelector("input[type=checkbox]");
  checkBox.remove();
  
  //PLACE IT INSIDE THE COMPLETED LIST
  completeToDoList.appendChild(listItem); 
  
  //BIND THE NEW COMPLETED LIST
  //bindCompleteItems(listItem, deleteTask);
  
};

//DELETE TASK FUNCTIONS
var deleteTask = function(element){
  console.log("Deleting task...");
  
  var listItem = element.parentNode;
  var ul = listItem.parentNode;
  
  ul.removeChild(listItem);
  
};

// locate your element and add the Click Event Listener
document.getElementById("todo").addEventListener("click",function(e) {
    // e.target is our targetted element.
                    // try doing console.log(e.target.nodeName), it will result LI4
    if(e.target && e.target.nodeName == "INPUT") {
        console.log(e.target.id + " was clicked");
		completeTask(e.target);
    }
});

document.getElementById("complete").addEventListener("click",function(e) {
    // e.target is our targetted element.
                    // try doing console.log(e.target.nodeName), it will result LI
					
    if(e.target && e.target.nodeName == "BUTTON") {
        console.log(e.target.id + " was clicked");
		deleteTask(e.target);
    }
});


//A FUNCTION THAT BINDS EACH OF THE ELEMENTS THE INCOMPLETE LIST

/* var bindIncompleteItems = function(taskItem, checkBoxClick){  
  console.log("Binding the incomplete list...");
  
  //BIND THE CHECKBOX TO A VAR
  var checkBox = taskItem.querySelector("input[type=checkbox]");
  
  //SETUP EVENT LISTENER FOR THE CHECKBOX
  checkBox.onchange = checkBoxClick;  
}; 
 */

//A FUNCTIONM THAT BINDS EACH OF THE ELEMTS IN THE COMPLETE LIST
/* var bindCompleteItems = function(taskItem, deleteButtonPress){
  console.log("Binding the complete list...");
  
  //BIND THE DELETE BUTTON
  var deleteButton = taskItem.querySelector(".delete");
   
  //WHEN THE DELETE BUTTON IS PRESSED, RUN THE deleteTask function
  deleteButton.onclick = deleteButtonPress;
    
}; */


/* for(var i=0; i < toDoUl.children.length; i++) {
  bindIncompleteItems(toDoUl.children[i], completeTask);
}

for(var i=0; i < completeUl.children.length; i++) {
  bindCompleteItems(completeUl.children[i], deleteTask);
} */


addTaskBtn.addEventListener("click", addTask);

