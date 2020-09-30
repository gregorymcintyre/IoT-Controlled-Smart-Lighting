const port = process.env.PORT || 5000;
const express = require('express');
const app = express();

app.use(express.static('public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-RequestedWith, Content-Type, Accept");
    next();
});

app.get('/api/test', (req, res) => {
	res.send('The API is working!');
    });

app.listen(port, () => {
	console.log(`listening on port ${port}`);
    });
