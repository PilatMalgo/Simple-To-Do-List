//SELECT ELEMENTS AND ASSIGN THEM TO VARS
var newTask = document.querySelector('#new-task');
var addTaskBtn = document.querySelector('#addTask');

var toDoList = document.querySelector(".todo-list ul");
var completeToDoList =  document.querySelector(".complete-list ul");

var authorName = "Gosia";

var counter = 0;
//CREATE FUNCTIONS

//CREATING THE ACTUAL TASK LIST ITEM
var createNewTask = function(task, authorName, taskId){
  console.log("Creating task...");
  
  //SET UP THE NEW LIST ITEM
  var listItem = document.createElement("li"); //<li>
  var checkBox = document.createElement("input"); //checkbox
  var label = document.createElement("label"); // <label>
  var author = document.createElement("span");
  
  
  //PULL THE INPUTED TEXT INTO LABEL
  label.innerText = task;
  author.innerHTML = " by:"+authorName;
  
  
  //ADD PROPERTIES
  checkBox.type = "checkbox";
  
  //ADD ITEMS TO THE LI
  listItem.setAttribute("id", taskId);
  counter++;
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(author);
  //EVERYTHING PUT TOGETHER
  return listItem;  
  
};

//ADD THE NEW TASK INTO ACTUAL INCOMPLETE LIST
var addTask = function(){
  console.log("Adding task...");
  
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://195.181.210.249:3000/todo", true);
  xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhttp.send("title="+newTask.value+"&author=Gosia");
  xhttp.onreadystatechange = function () { 
    if (xhttp.readyState == 4 && xhttp.status == 200) {
         // do something with response
         console.log(xhttp.responseText);
    }
}
  //FOR CLARITY, GRAB THE INPUTTED TEXT AND STORE IT IN A VAR
  var listItem = createNewTask(newTask.value, "Gosia");
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
  
  console.log("http://195.181.210.249:3000/todo/"+listItem.id);
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://195.181.210.249:3000/todo/"+listItem.id, true);
  xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhttp.send("extra=notActive");
};

var jsonMoveCompleteTask = function(element){
  
  //GRAB THE CHECKBOX'S PARENT ELEMENT, THE LI IT'S IN
  //var listItem = this.parentNode;
  var listItem = element;
  
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
};

var addJsonTask = function(taskValue, authorName, taskId, status){
  console.log("Adding task...");
  //FOR CLARITY, GRAB THE INPUTTED TEXT AND STORE IT IN A VAR
  var listItem = createNewTask(taskValue, authorName, taskId);
  //ADD THE NEW LIST ITEM TO LIST
  toDoList.appendChild(listItem); 
  //CLEAR THE INPUT
  newTask.value="";
  
  //BIND THE NEW LIST ITEM TO THE INCOMPLETE LIST
  //bindIncompleteItems(listItem, completeTask);
  if (status === "notActive"){
	console.log(document.getElementById(taskId));
	jsonMoveCompleteTask(document.getElementById(taskId));
  }
  
};



//DELETE TASK FUNCTIONS
var deleteTask = function(element){
  console.log("Deleting task...");
  
  var listItem = element.parentNode;
  var ul = listItem.parentNode;
  
  ul.removeChild(listItem);
  
   var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://195.181.210.249:3000/todo/"+listItem.id, true);
  xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhttp.send();
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


addTaskBtn.addEventListener("click", addTask);

let url = 'http://195.181.210.249:3000/todo';

fetch(url)
.then(res => res.json())
.then((tasks) => {
	tasks.forEach(function(task) {
		addJsonTask(task.title, task.author, task.id, task.extra);
		console.log(task.extra);
	});
})
.catch(err => { throw err });

