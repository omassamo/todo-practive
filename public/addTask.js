
// Get a reference to the database service
var database = firebase.database();

// get task list from firebase
document.addEventListener("DOMContentLoaded", function(event) { 
 console.log("document ready");
});


// click the button = insert new row with cells.
function addTask (){

var table = document.getElementById("task-table"); 

var row = table.insertRow(1);
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1); 		

cell1.innerHTML = '<input type ="text">' ;
cell2.innerHTML = '<input type ="checkbox">'

};

// save task list to firebase

