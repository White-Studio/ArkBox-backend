const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const data = require("./routes/index")

app.use("/", data);
// app.use("/api", apiIndex);


const port = process.env.PORT || 3001

app.listen(port, () => console.log("App is running on port: "+port))
