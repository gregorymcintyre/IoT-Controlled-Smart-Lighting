$('#navbar').load('navbar.html');
$('#footer').load('footer.html');

const MQTT_URL = 'http://localhost:5001';
var lightSelected;
var clickCount = 0;
var emergencyClickCount = 0;

/*function loadDevices(){
	//console.log("im working?");
	//processLineByLine();
	//$.post(`http://localhost:5002/send-command`, { "deviceID": lightSelected, "status": command, "effect": 1 })
	
};
*/

const response = $.get('http://localhost:5000/api/devices').then(response => {
	console.log("In Get: " + response);
	$('#command').append(
		`<option>`+ response + `</option>`
	);
});



$('#send-command').on('click', function() {
	lightSelected = $('#command').val();
	localStorage.setItem("selectedLight", lightSelected);
	//console.log(lightSelected);
	window.location.href='/control.html'
});

$('#onoffButton').on('click', function() {
	lightSelected = localStorage.getItem("selectedLight");
	console.log("Light ID: " + lightSelected + " On/Off Clicked")
	clickCount++;
	if (clickCount % 2) command = 1;
	else command = 0;
	//console.log(clickCount);
	
	$.post(`${MQTT_URL}/send-command`, { "deviceID": lightSelected, "status": command, "effect": 1 })
	//console.log(`${MQTT_URL}/send-command`, { "status": command, "effect": 1 });
});

$('#emergencyLight').on('click', function() {
	lightSelected = localStorage.getItem("selectedLight");
	console.log("Light ID: " + lightSelected + " Emergency Clicked Clicked")
	emergencyClickCount++;
	if (emergencyClickCount % 2) command = 0;
	else command = 1;
	//console.log(emergencyClickCount);
	
	$.post(`${MQTT_URL}/send-command`, { "deviceID": lightSelected,  "status": command, "effect": 2 })
	//console.log(`${MQTT_URL}/send-command`, { "status": command, "effect": 2 });
});
