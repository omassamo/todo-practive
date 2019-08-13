// wait for DOM to load and load tasks
document.addEventListener("DOMContentLoaded", () => {
	console.log("Ready");

	// // Intitial -> Get tasks from firebase with value - gets all tasks in 1 object, but fetches all tasks again on update
	var tasksJSON = firebase.database().ref('/tasks/');
	tasksJSON.on('child_added', function(snapshot) {
	var taskList = (snapshot.val());
	console.log(taskList);
	if (taskList.status = true) {
		$("#task-table").append("<tr><td>" + "<input id='" + taskList.name + "' value='" + taskList.name + "'>" + "</input>" + "</td>" + "<td><input type='checkbox' checked></td></tr>");
		} else {
		$("#task-table").append("<tr><td>" + "<input id='" + taskList.name + "' value='" + taskList.name + "'>" + "</input>" + "</td>" + "<td><input type='checkbox'></td></tr>");
		};
	});

});

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

	//write the new taskdata
	var updates = {};
	updates['/tasks/' + newTaskKey] = postdata;

	document.getElementById("taskName").value = "";
	$("#taskStatus").prop('checked', false);

	return firebase.database().ref().update(updates);


};

// // click the button = insert new row with cells.
// function addTask (){

// var table = document.getElementById("task-table"); 

// var row = table.insertRow(1);
// var cell1 = row.insertCell(0);
// var cell2 = row.insertCell(1); 		
