//express module and initialise a new instance
const express = require('express');
const app = express();
const fs = require("fs");
const readline = require('readline');
var deviceArray = [];

//port for the web server to listen to and a base url
const port = process.env.PORT || 3000;
const base = `${__dirname}/public`;

app.use(express.static('public'));

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

processLineByLine();

//route middleware for the root URI path
app.get('/', function (req, res) {	
	res.sendFile(`${base}/landing.html`);
});

app.get('/send-command', (req, res) => {
	res.sendFile(`${base}/command.html`);
});

//start the web server and listen to requests on the specified port
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});

app.get('*', (req, res) => {
	res.sendFile(`${base}/404.html`);
});

async function processLineByLine() {
  const fileStream = fs.createReadStream('deviceList.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  for await (const line of rl) {
    deviceArray.push(`${line}`);
  }
  console.log(deviceArray);
}
