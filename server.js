const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Ciao mamma");
});


const port = process.env.port || 5000;
app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});