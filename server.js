const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const ObjRoute = require("./Routes/");

app.use("/api/obj", ObjRoute);

app.listen(5000, () => {
  console.log("OBJ Service start on PORT 5000");
});
