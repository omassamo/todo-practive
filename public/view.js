// wait for DOM to load and load tasks
document.addEventListener("DOMContentLoaded", () => {
	console.log("Ready");

	// // Intitial -> Get tasks from firebase
	// var tasksJSON = firebase.database().ref('/tasks/');
	// tasksJSON.on('value', function(snapshot) {
	// var taskList = (snapshot.val());
	// console.log(taskList);



	// });

	// // Intitial -> Get tasks from firebase with child-added - gets each task as individual object
	var tasksJSON1 = firebase.database().ref('/tasks/');
	tasksJSON1.on('child_added', function(snapshot) {
	addCommentElement('#tasktist', snapshot.key, snapshot.val().name)
	var taskList1 = (snapshot.val());
	console.log(taskList1);

	// 	jQuery loop through taskList and append to table
		// $.each(taskList1, function(i, item){
		// 	$("#tasklist").append("<tr><td>" + "<input " + "value='" + taskList1[i].name + "'>" + "</input>" + "</td>" + "<td><input type='checkbox'></td></tr>");
		// });

	});

	// Get tasks and loop through them to add to a var
	// firebase.database().ref().once('value', function(snapshot) {
	// snapshot.forEach(function(i, childSnapshot) {
	// 	console.log("x");
	// 	});
	// });

	// Update list when task is added 


	// loop through tasks and append to table -> TODO set checkbox value + do it in a nice way with firebase


	// $.each(	x.records, function(i, item){
	// 	alert( x[i].name);
	// 	$("#demotasks").append(
	// 		(x.records[i].fields.name)
	// 		);
	// })

});