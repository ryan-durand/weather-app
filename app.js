const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  console.log(req.body.zipCode);
  const query = req.body.zipCode;
  const apiKey = "0d21347247372e83e10132c82cac042e";
  const units = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?zip=" + query + ",us&units=" + units + "&appid=" + apiKey;
  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>The temperature in zip code " + query + " is " + temp + " degrees Fahrenheit.</h1>");
      res.write("<h3>The weather is currently " + desc + "</h3> ");
      res.write("<img src='" + imageURL + "'>");
      res.send();
    });
  });
});



app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
