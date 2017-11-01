//initialize Firebase
var config = {
    apiKey: "AIzaSyC9bva6gu4RLNqnnj73djZn9WK5ZgI_90U",
    authDomain: "train-scheduler-c29e9.firebaseapp.com",
    databaseURL: "https://train-scheduler-c29e9.firebaseio.com",
    projectId: "train-scheduler-c29e9",
    storageBucket: "",
    messagingSenderId: "1642065267"
};

firebase.initializeApp(config);

var db = firebase.database();

//button for adding Trains
$("#addEmployee").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrainTime = $("#firstTrainTime").val().trim();
  var frequency = $("#frequency").val().trim();

  var newTrain  = {
  	trainName: trainName,
  	destination: destination,
  	firstTrainTime: firstTrainTime,
  	frequency: frequency
  };

  db.ref().push(newTrain);

  $("#trainForm").trigger("reset");
});

//child listener to display new info from firebase
db.ref().on("child_added", function(snapshot) {

	var trainName = snapshot.val().trainName;
  	var destination = snapshot.val().destination;
  	var firstTrainTime = snapshot.val().firstTrainTime;
  	var frequency = snapshot.val().frequency;

  	//calculations
	var firstTimeConverted = moment(firstTrainTime, "HH:mm");

	var currentTime = moment();

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var remainder = diffTime % frequency;

    var minutesTillTrain = frequency - remainder;

    var nextTrain = moment().add(minutesTillTrain, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");

  	var nextArrival = nextTrain;
  	var minutesAway = minutesTillTrain;

  	$("#trainDetails").prepend("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + 
  		frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});