// Path and JSON variables
var mainPath = "/tasks/";
var mainRef = "tasks";
var name = "name";
var status = "status";

// wait for DOM to load and load tasks
document.addEventListener("DOMContentLoaded", () => {
	console.log("Ready");
	document.getElementById("newTaskName").focus();

// Intitial -> Get tasks from firebase and update when child added - sorting is not really working
// I should have event_listeners updating the list on child_removed and child_updated instead of using Javscript to update the DOM
	var tasksJSON = firebase.database().ref(mainRef).orderByChild('timestamp');
	tasksJSON.on('child_added', function updateList (snapshot) {
		var taskList = (snapshot.val());
		taskKey = snapshot.key;
		console.log(taskList);
		if (taskList.status == true) {
			$("#task-table").append("<tr id='" + taskKey + "'><td><input class='' onclick='updateStatus(this)' id='status-" + taskKey + "' type='checkbox' checked></td><td><textarea style='text-decoration: line-through' rows='1' cols='50' oninput='updateName(this)' id='text-" + taskKey  + "'>" + taskList.name + "</textarea></td><td><div onclick='deleteTask(this)'>❌</div></td></tr>");
			} else {
			$("#task-table").append("<tr id='" + taskKey + "'><td><input onclick='updateStatus(this)' id='status-" + taskKey + "' type='checkbox'></td><td><textarea rows='1' cols='50' oninput='updateName(this)' id='text-" + taskKey  + "'>" + taskList.name + "</textarea></td>" + "<td><div onclick='deleteTask(this)'>❌</div></td></tr>");
		};
	});

});

// post new task with firebase command
function addTask(name, status) {
	
	var taskName = document.getElementById("newTaskName").value;
	//clear new task input field
	document.getElementById("newTaskName").value = "";

	var postData = {
		name: taskName,
		timestamp: Date.now()
	};

	console.log(postData);	

	// Get a key for the task
	var newTaskKey = firebase.database().ref().child(mainRef).push().key;
	console.log(newTaskKey);

	//define path to update
	var updates = {};
	updates[mainPath + newTaskKey] = postData;

	//write the new taskdata
	return firebase.database().ref().update(updates);
}

// addTask on return 
function keyUpTask () {
	if (event.keyCode === 13) {
		document.getElementById("addTask").click();
		console.log("keyUp");
	};
}	


// Update status of task when user checks & unchecks checkbox - dirty trick with the id ✅
function updateStatus (status) {
	//get parent id
	statusParentId = status.parentNode.parentNode.id;
	// the id of the checkbox
	var elementId = "status-" + statusParentId;
	// is the checkbox checked?
	x = document.getElementById(elementId).checked;
	console.log(x);
	// // call  strikethrough 
	strikeThrough();
	// update status in firebase
	return firebase.database().ref(mainPath + statusParentId).update({status: x});
}	

// Toggle strikethrough based in toggle of task status
function strikeThrough () {
	console.log("strikeThrough");
	// the id of the textarea 
	var textAreaId = "text-" + statusParentId;
	var taskName = document.getElementById(textAreaId);
	console.log(textAreaId);
	console.log(x);
	//Strike through the text
	if (x === true) {
	taskName.style.textDecoration = 'line-through';
	} else {
		taskName.style.textDecoration = '';
	};
}
	
// Update task name when user types a new name - dirty trick with the id ✅
function updateName (name) {
	// get parent parent id
	var parentId = name.parentNode.parentNode.id;
	// the id of the input
	var elementId = "text-" + parentId;
	//update the var task name
	var taskName = document.getElementById(elementId).value;
	
	//update firebase with task name
	return firebase.database().ref(mainPath + parentId).update({name: taskName});
}

//delete task from firebase and remove table row - this is cheating as it'll only work if user has only 1 page of list open. Should be a proper firebase update✅
function deleteTask (task) {
	//get parent id
	var parentId = task.parentNode.parentNode.id;
	// the id of the delete button
	var parentElement = document.getElementById(parentId);
	//remove the parent element
	parentElement.remove();
	//remove the element from firebase
	return firebase.database().ref(mainPath + parentId).remove();
}
