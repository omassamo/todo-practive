// wait for DOM to load and load tasks
document.addEventListener("DOMContentLoaded", () => {
	console.log("Ready");

// Intitial -> Get tasks from firebase and update when child added - sorting is not really workingter
// I should have event_listeners updating the list on child_removed and child_updated
	var tasksJSON = firebase.database().ref('tasks').orderByChild('timestamp');
	tasksJSON.on('child_added', function updateList (snapshot) {
		var taskList = (snapshot.val());
		taskKey = snapshot.key;
		console.log(taskList);
		if (taskList.status == true) {
			$("#task-table").append("<tr id='" + taskKey + "'><td>" + "<input oninput='updateName(this)' id='text-" + taskKey + "'value='" + taskList.name + "'>" + "</input>" + "</td>" + "<td><input onclick='updateStatus(this)'  id='status-" + taskKey + "' type='checkbox' checked></td><td><button onclick='deleteTask(this)'>❌</button></td></tr>");
			} else {
			$("#task-table").append("<tr id='" + taskKey + "'><td>" + "<input oninput='updateName(this)' id='text-" + taskKey + "'value='" + taskList.name + "'>" + "</input>" + "</td>" + "<td><input onclick='updateStatus(this)' id='status-" + taskKey + "' type='checkbox'></td><td><button onclick='deleteTask(this)'>❌</button></td></tr>");
			};

	});

});

// post new task with firebase command
function addTask(name, status) {
	
	var taskName = document.getElementById("newTaskName").value;
	var taskStatus = document.getElementById("newTaskStatus").checked;
	//clear new task input field and checkmark 
	document.getElementById("newTaskName").value = "";
	$("#newTaskStatus").prop('checked', false);

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

};

// Update status of task when user checks & unchecks checkbox - dirty trick with the id ✅
function updateStatus (status) {

	//get parent id
	var parentId = status.parentNode.parentNode.id;
	// the id of the checkbox
	var elementId = "status-" + parentId;
	// is the checkbox checked?
	var x = document.getElementById(elementId).checked;
	console.log(x);
	// Define the update based on if checkbox is/ is not checked - should be possible to just add x to the JSON instead of having the if/ else statement
	if (x == true) {
		return firebase.database().ref('/tasks/' + parentId).update({"status": true});
		} else {
		return firebase.database().ref('/tasks/' + parentId).update({"status": false});
	}; 

};	
 
// Update task name when user types a new name - dirty trick with the id ✅
function updateName (name) {
	// get parent parent id
	var parentId = name.parentNode.parentNode.id;
	// the id of the input
	var elementId = "text-" + parentId;
	//update the var task name
	var taskName = document.getElementById(elementId).value;
	
	//update firebase with task name
	return firebase.database().ref('/tasks/' + parentId).update({"name": taskName})

};

//delete task from firebase and remove table row - this is cheating as it'll only work if user has only 1 page of list open. Should be a proper firebase update✅
function deleteTask (task) {
	//get parent id
	var parentId = task.parentNode.parentNode.id;
	// the id of the delete button
	var parentElement = document.getElementById(parentId);
	//remove the parent element
	$(parentElement).remove();
	//remove the element from firebase
	return firebase.database().ref('/tasks/' + parentId).remove();
};
