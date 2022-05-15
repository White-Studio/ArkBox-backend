const express = require("express");
const Router = express.Router();
require("dotenv").config();
const mongodbDatabaseURL = `mongodb+srv://TestUser1:${process.env.MONGODB_PASSWORD}@data.efyht.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const MongoClient = require("mongodb").MongoClient;

const getConnection = async (req, res) => {
    if (!Boolean(process.env.DEV)) {
        if (req.headers.origin !== 'https://white-studio.github.io') {
            return false;
        }
    }
    let reqDatabaseAccess = req.headers.databaseaccess;
    if (reqDatabaseAccess !== undefined) {
        try {
            reqDatabaseAccess = JSON.parse(reqDatabaseAccess)
            const client = await MongoClient.connect(mongodbDatabaseURL);
            const databaseAccess = await client.db("main").collection("dataBaseAccess").findOne({_id: reqDatabaseAccess.id});
            if (databaseAccess !== null) {
                if (databaseAccess.password === reqDatabaseAccess.password) {
                    return client;
                } else {
                    res.json({
                        error: "Database Access password incorrect."
                    })
                    await client.close()
                    return false
                }
            } else {
                res.json({
                    error: "Database Access not exist."
                })
                await client.close()
                return false
            }
        }
        catch (err) {
            res.json({
                error: err.toString()
            })
            return false
        }
    } else {
        res.json({
            error: "Database Access not include."
        });
        return false
    }
}


Router.get("/login", async (req, res, next) => {
    const access = await getConnection(req, res);
    if (access) {
        try {
            const LoginAccess = access.db("main").collection("LoginAccess");
            const data = JSON.parse(req.headers.data)
            const account = await LoginAccess.findOne({"_id": data.id, password: data.password})
            if (account === null || account === undefined) {
                res.json({
                    error: "Access not exist or password incorrect."
                })
                await access.close();
            } else {
                res.json({
                    error: null,
                    res: account
                })
                await access.close();
            }
        }
        catch (err) {
            res.json({
                error: err.toString()
            })
            await access.close();
        }
    }
});

module.exports = Router;
