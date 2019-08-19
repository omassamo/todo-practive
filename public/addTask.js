// wait for DOM to load and load tasks
document.addEventListener("DOMContentLoaded", () => {
	console.log("Ready");

// Intitial -> Get tasks from firebase and update when child added - sorting is not really workingter
// Add a lister for child_removed
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
	
	// // get info about removed node
	// tasksJSON.on('child_removed', function(snapshot){
	// 	var removedChild = (snapshot.val());
	// 	console.log(removedChild);	
	// 	removedChildKey = snapshot.key;
	// 	console.log(removedChildKey);
	// 	updateList();
	// });


	});

	// make a var which contains the list - update that on either ch

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

	//clear new task input field and checkmark - NOT working for some reason ?? ❌
	document.getElementById("taskName").value = "";
	$("#taskStatus").prop('checked', false);

};

// Update status of task when user checks & unchecks checkbox - dirty trick with the id ✅
function updateStatus (status) {

	var parentId = status.parentNode.parentNode.id;
	var elementId = "status-" + parentId;
	var x = document.getElementById(elementId).checked;
	console.log(x);

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
	var elementId = "text-" + parentId;
	//update the var task name
	var taskName = document.getElementById(elementId).value;
	
	//update firebase with task name
	return firebase.database().ref('/tasks/' + parentId).update({"name": taskName})

};

//delete task from firebase and remove table row ✅
function deleteTask (task) {
	var parentId = task.parentNode.parentNode.id;
	var parentElement = document.getElementById(parentId);
	$(parentElement).remove();
	return firebase.database().ref('/tasks/' + parentId).remove();
};
