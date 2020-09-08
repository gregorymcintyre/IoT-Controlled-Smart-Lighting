const { URL, UNAME, PASSWORD } = process.env;

const mqtt = require('mqtt');
const express = require('express');

const app = express();

const port = process.env.PORT || 5001;

const client = mqtt.connect(URL, {
	username: UNAME,
	password: PASSWORD
});

client.on('connect', () => {
	console.log('mqtt connected');
});
