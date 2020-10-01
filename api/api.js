const port = process.env.PORT || 5000;
const express = require('express');
const app = express();
const fs = require("fs");
const readline = require('readline');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-RequestedWith, Content-Type, Accept");
    next();
});

app.use(express.static('public'));

app.get('/api/test', (req, res) => {
	res.send('The API is working!');
});
    
app.get('/api/devices', (req, res) => {
	var output = processLineByLine();
	//console.log(output)
	res.send(output);
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
    });
    
async function processLineByLine() {
	var deviceArray = [];
	let deviceObj = {};
 	const fileStream = fs.createReadStream('deviceList.txt');
 	var outputstring;

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});
	for await (const line of rl) {
		deviceArray.push(`${line}`);
		outputstring+=`${line}`;
		
	}
		
	for (var key in deviceArray) {
		deviceObj[key] = deviceArray[key]
	}
		
	//console.log("Array in funtion: " + deviceArray);
	//console.log("Obj in funtion: " + deviceObj);
	//console.log("Obj in funtion: " + deviceObj[0]);
	console.log(outputstring);
	return outputstring;		
}
