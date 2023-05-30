const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const fs = require('fs');
const runSensor = require("./ethereum/SensorNode/sensorScript");
const { deploy } = require('./ethereum/deployLocal');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));

app.post("/login", function (req, res) {
  console.log(req.body);
  const inputData = req.body;
  const jsonData = fs.readFileSync('data.json', 'utf-8');
  let data = JSON.parse(jsonData);
  console.log(data);

  let matchFound = false;
  data.map((info) => {
    console.log(info);
    if (info.username === inputData.username) {
      if (info.password === inputData.password) {
        res.send("success");
        matchFound = true;
        return;
      } else {
        res.send("password doesn't match");
        matchFound = true;
        return;
      }
    }
  })
  if (!matchFound) {
    res.send("credentials don't match");
  }
})


app.post("/signup", function (req, res) {
  console.log(req.body);
  

  // // Read the contents of the JSON file into a JavaScript object
  const jsonData = fs.readFileSync('data.json', 'utf-8');
  const data = JSON.parse(jsonData);

  // check if the username already exists
  data.map((info) => {
    if(info.username===req.body.username){
      res.send("Username already exists");
      return
    }
  })

  // // Modify the JavaScript object by adding new data
  const newEntry = req.body;
  data.push(newEntry);

  // // Write the modified JavaScript object back to the JSON file
  fs.writeFile('data.json', JSON.stringify(data), 'utf-8', (err) => {
    if (err) throw err;
    console.log('Data appended to JSON file');
  });

  res.send(req.body)

})

app.post('/sensorStart', async function (req, res) {
  console.log(req.body);
  try {
    fs.writeFileSync('sensorStartFile.json', JSON.stringify(req.body));
    runSensor(req.body.city, req.body.sensorAddress, req.body.farmManagerAddress);
    res.send("sensor start success");

  } catch (error) {
    console.log("sensor start error", error)
  }

});

app.get("/deploy", async function (req, res) {

  // deploy button once pressed should run deployLocal.js
  try {
    const data = await deploy();
    console.log("deploy data", data);
    res.send(data);
  } catch (error) {
    console.log("deploy error", error)
  }
});

app.post("/fileSetup", function (req, res) {
  console.log(req.body);

  try {
    fs.writeFileSync('file.json', JSON.stringify(req.body));
    res.send("success")
  } catch (error) {
    console.log("file error", error)
  }
});

app.post("/bidderFileSetup", function (req, res) {
  console.log(req.body);

  try {
    fs.writeFileSync('bidderFile.json', JSON.stringify(req.body));
    res.send("success")
  } catch (error) {
    console.log("file error", error)
  }
});



app.listen(5000, function () {
  console.log('Server listening on port 5000');
});
