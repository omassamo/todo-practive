// save 1 task with static content to firebase
function addTask() {
	
	// // Get a reference to the database service
	// var database = firebase.database();

	console.log('addTask');

	var data = JSON.stringify({
	  "taskTest": {
	    "status": true
	  }
	});

	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
	  if (this.readyState === this.DONE) {
	    console.log(this.responseText);
	  }
	});

	xhr.open("POST", "https://to-do-list-4990e.firebaseio.com/tasks.json");
	xhr.setRequestHeader("content-type", "application/json");

	xhr.send(data);

};

// // get task list from firebase - TO DO
// document.addEventListener("DOMContentLoaded", function(event) { 
//  console.log("document ready");
// });


// // click the button = insert new row with cells.
// function addTask (){

// var table = document.getElementById("task-table"); 

// var row = table.insertRow(1);
// var cell1 = row.insertCell(0);
// var cell2 = row.insertCell(1); 		

// cell1.innerHTML = '<input type ="text">' ;
// cell2.innerHTML = '<input type ="checkbox">'

// };
