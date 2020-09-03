//express module and initialise a new instance
const express = require('express');
const app = express();

//port for the web server to listen to and a base url
const port = process.env.PORT || 3000;
const base = `${__dirname}/public`;

//middleware to server static files
app.use(express.static('public'));
app.use(express.static('public'));

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

//route middleware for the root URI path
app.get('/', function (req, res) {
	res.sendFile(`${base}/landing.html`);
});

//start the web server and listen to requests on the specified port
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});

app.get('*', (req, res) => {
	res.sendFile(`${base}/404.html`);
});
