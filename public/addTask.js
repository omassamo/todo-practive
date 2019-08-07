// wait for DOM to load
// document.addEventListener("DOMContentLoaded", () => {
// 	// Get a reference to the database service
	
// });

// get existing task status firebase command
function getTasks() {

	var taskStatus = firebase.database().ref('/tasks');
	taskStatus.on('value', function(snapshot) {
	console.log(snapshot.val());
	});
};

// post new task with firebase command

function addTask(name, status) {
	
	var taskName = document.getElementById("taskName").value;
	var taskStatus = document.getElementById("taskStatus").checked;

	var postdata = {
		name: taskName,
		status: taskStatus
	};

console.log(postdata);	

// Get a key for the task
var newTaskKey = firebase.database().ref().child('tasks').push().key;
console.log(newTaskKey);

//write the new taskdaata
var updates = {};
updates['/tasks/' + newTaskKey] = postdata;

return firebase.database().ref().update(updates);

};

// // click the button = insert new row with cells.
// function addTask (){

// var table = document.getElementById("task-table"); 

// var row = table.insertRow(1);
// var cell1 = row.insertCell(0);
// var cell2 = row.insertCell(1); 		



// };
