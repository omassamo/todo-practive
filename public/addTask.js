// wait for DOM to load and load tasks
document.addEventListener("DOMContentLoaded", () => {
	console.log("Ready");

// Intitial -> Get tasks from firebase and update when child added
	var tasksJSON = firebase.database().ref('/tasks/');
	tasksJSON.on('child_added', function(snapshot) {
	var taskList = (snapshot.val());
	taskKey = snapshot.key;
	console.log(taskList);
	if (taskList.status == true) {
		$("#task-table").append("<tr><td>" + "<input id='" + taskList.name + "' value='" + taskList.name + "'>" + "</input>" + "</td>" + "<td><input onclick='updateStatus(this.id)' type='checkbox' id='" + taskKey + "' checked></td></tr>");
		} else {
		$("#task-table").append("<tr><td>" + "<input id='" + taskList.name + "' value='" + taskList.name + "'>" + "</input>" + "</td>" + "<td><input onclick='updateStatus(this.id)' type='checkbox' id='" + taskKey + "'></td></tr>");
		};
	});

});

// post new task with firebase command
function addTask(name, status) {
	
	var taskName = document.getElementById("taskName").value;
	var taskStatus = document.getElementById("taskStatus").checked;

	var postData = {
		name: taskName,
		status: taskStatus
	};

	console.log(postData);	

	// Get a key for the task
	var newTaskKey = firebase.database().ref().child('tasks').push().key;
	console.log(newTaskKey);

	//write the new taskdata
	var updates = {};
	updates['/tasks/' + newTaskKey] = postData;

	//clear new task input field and checkmark
	document.getElementById("taskName").value = "";
	$("#taskStatus").prop('checked', false);

	return firebase.database().ref().update(updates);

};

// Update status of task when user checks & unchecks checkbox
function updateStatus (clicked_id) {

	console.log(clicked_id);

	var x = document.getElementById(clicked_id).checked;
	console.log(x);

	if (x == true) {
	
	//Update specific tasks' status. TODO status get status and key dynamically.
	return firebase.database().ref('/tasks/' + clicked_id).update({"status": true});
	} else {
	return firebase.database().ref('/tasks/' + clicked_id).update({"status": false});
	}; 

};

// Update task name when user types a new name 

