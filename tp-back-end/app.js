const express = require("express");
const app = express();
const axios = require("axios");

app.get("/api/getEmployees", (req, res) => {
	let data = [];
	// fetch first 5,000 users (API only allows for this many per call)
	axios.get("https://randomuser.me/api/?results=5000")
	.then((res1) => {
		data = res1.data.results;
		// then get the rest of the 2,000
		axios.get("https://randomuser.me/api/?results=2000")
		.then((res2) => {
			data.push(...res2.data.results);
			res.json(data);
		})
		.catch((res) => {
			console.log(res);
		});
	})
	.catch((res) => {
		console.log(res);
	});

	//res.send("what do you want");
});

app.listen(8080);