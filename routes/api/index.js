const express = require("express");
const Router = express.Router();

Router.get("/", async (req, res, next) => {
    res.send("<h1>Welcome to ArkBox Backend Api.</h1>");
});

Router.get("/:test", async (req, res, next) => {
    res.send(`<h1>Welcome to ArkBox Backend Api. \n Testing: ${req.params.test}</h1>`);
});

module.exports = Router;