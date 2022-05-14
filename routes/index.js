const express = require("express");
const Router = express.Router();

Router.get("/", async (req, res, next) => {
    res.send("<h1>Welcome to ArkBox Backend.</h1>");
});

module.exports = Router;