$('#navbar').load('navbar.html');
$('#footer').load('footer.html');

const MQTT_URL = 'http://localhost:5001';

$('#send-command').on('click', function() {
	const deviceID = $('#deviceID').val();
	var command = $('#command').val();
	//console.log($('#command').val())
	if (command == 'On') command = 1;
	else command = 0;
	
	const body = {
	deviceID,
	command
	};
	
	console.log(body);
	
	$.post(`${MQTT_URL}/send-command`, { "deviceID": deviceID, "command": command })

});
