// wait for DOM to load and load tasks
document.addEventListener("DOMContentLoaded", () => {
	console.log("Ready");

// Intitial -> Get tasks from firebase and update when child added - sorting is not really workingter
// Add a lister for child_removed
	var tasksJSON = firebase.database().ref('tasks').orderByChild('timestamp');
	tasksJSON.on('child_added', function(snapshot) {
	var taskList = (snapshot.val());
	taskKey = snapshot.key;
	console.log(taskList);
	if (taskList.status == true) {
		$("#task-table").append("<tr><td>" + "<input oninput='updateName(this.id)' id='" + taskKey + "' value='" + taskList.name + "'>" + "</input>" + "</td>" + "<td><input onclick='updateStatus(this.id)' type='checkbox' id='" + taskKey + "' checked></td><td><button onclick='deleteTask(this.id)' id='" + taskKey + "'>❌</button></td></tr>");
		} else {
		$("#task-table").append("<tr><td>" + "<input oninput='updateName(this.id)' id='" + taskKey + "' value='" + taskList.name + "'>" + "</input>" + "</td>" + "<td><input onclick='updateStatus(this.id)' type='checkbox' id='" + taskKey + "'></td><td><button onclick='deleteTask(this.id)' id='" + taskKey + "'>❌</button></td></tr>");
		};
	});

});

// post new task with firebase command
function addTask(name, status) {
	
	var taskName = document.getElementById("taskName").value;
	var taskStatus = document.getElementById("taskStatus").checked;

	var postData = {
		name: taskName,
		status: taskStatus,
		timestamp: Date.now()
	};

	console.log(postData);	

	// Get a key for the task
	var newTaskKey = firebase.database().ref().child('tasks').push().key;
	console.log(newTaskKey);

	//define path to update
	var updates = {};
	updates['/tasks/' + newTaskKey] = postData;

	//write the new taskdata
	return firebase.database().ref().update(updates);

	//clear new task input field and checkmark
	document.getElementById("taskName").value = "";
	$("#taskStatus").prop('checked', false);

};

// Update status of task when user checks & unchecks checkbox
function updateStatus (clicked_id) {

	console.log(clicked_id);

	var x = document.getElementById(clicked_id).checked;
	console.log(x);

	if (x == true) {
		return firebase.database().ref('/tasks/' + clicked_id).update({"status": true});
		} else {
		return firebase.database().ref('/tasks/' + clicked_id).update({"status": false});
	}; 

};

// Update task name when user types a new name
function updateName (focus_id) {
	console.log(focus_id);
	
	//update the var task name
	var taskName = document.getElementById(focus_id).value;
	
	//update firebase with task name
	return firebase.database().ref('/tasks/' + focus_id).update({"name": taskName})

};

// delete task when user hits cross ✅
// TODO: Update list with child removed
function deleteTask (delete_id) {
	console.log(delete_id);

	return firebase.database().ref('/tasks/' + delete_id).remove();
};

