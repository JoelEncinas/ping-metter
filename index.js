const express = require("express");
const app = express();
const port = 5500;
const cors = require("cors");
const summonerData = require("./utils/summoner");

// middleware
app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/summoner", (req, res) => {
  const summoner = req.query.name;

  if (!summoner) {
    return res.send("enter summoner");
  }

  summonerData(summoner, (error, result) => {
    if (error) {
      return res.send({
        error,
      });
    }

    res.send(result);
  });
});

app.get("/about", (req, res) => {
  res.send("about end point");
});

app.get("*", (req, res) => {
  res.send("404 Page not found");
});

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});
