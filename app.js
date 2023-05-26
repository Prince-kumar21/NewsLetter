const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("Public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
 
app.post("/", function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us13.api.mailchimp.com/3.0/lists/e5dcb59f39s";
  const options = {
    method: "POST",
    auth: "prince:3073de20a99c2c25d4062e643e0e1adf-us13",
  };

  const request = https.request(url, options, function (response) {
   if (response.statusCode === 200){
    res.sendFile(__dirname + "/succes.html")
   } else{
    res.sendFile(__dirname + "/failure.html")
   }
  });
  
  request.write(jsonData);
  request.end();
});

res.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Started on port 3000");
});


// API KEY 
// 3073de20a99c2c25d4062e643e0e1adf-us13

// Audience ID
// e5dcb59f39.