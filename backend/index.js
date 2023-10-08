import {mongoQueryOne, mongoInsertOne, mongoQueryMultiple, mongoUpdateOne} from "./mongo.js";
import {redis_get, redis_hSet, redis_hGet, redis_hGetAll, redis_mSet, redis_lPush, redis_lRange} from "./redisdb.js";
import express from 'express';
const app = express();
import bodyParser from "body-parser";
import * as path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const authPassword = process.env.AUTH_REDIS_PASSWORD;
const authHost = process.env.AUTH_REDIS_HOST;
const authPort = process.env.AUTH_REDIS_PORT;

const ingredientsPassword = process.env.INGREDIENTS_REDIS_PASSWORD;
const ingredientsHost = process.env.INGREDIENTS_REDIS_HOST;
const ingredientsPort = process.env.INGREDIENTS_REDIS_PORT;

const quantityPassword = process.env.QUANTITY_REDIS_PASSWORD;
const quantityHost = process.env.QUANTITY_REDIS_HOST;
const quantityPort = process.env.QUANTITY_REDIS_PORT;

const pastOrdersPassword = process.env.PASTORDERS_REDIS_PASSWORD;
const pastOrdersHost = process.env.PASTORDERS_REDIS_HOST;
const pastOrdersPort = process.env.PASTORDERS_REDIS_PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res, next) {
    res.send("Try calling our API endpoints");
});

app.get('/docs', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/api/auth', async function (req, res) {
    const data = req.body;
    let uid = "";
    let pwd = "";
    const action = req.body.action;
    console.log(req.ip);
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    console.log(dateTime);
    console.log('Received data: ', data);
    let response = "No action received.";
    let result = "";
    switch(action) {
        case("get"):
            try {
                uid = req.body.uid;
                pwd = req.body.pwd;
                result = await redis_hGet(uid, "pwd", authPassword, authHost, authPort);
                if (result == pwd) {
                    result = await redis_hGet(uid, "name", authPassword, authHost, authPort);
                }
                else {
                    result = "ERROR: Invalid";
                }
            }
            catch(err) {
                console.log(err.message);
            }
            break;
        case("set"):
            try {
                uid = req.body.uid;
                pwd = req.body.pwd;
                const name = req.body.name;
                const value = {
                    name: name,
                    pwd: pwd
                }
                // https://stackoverflow.com/questions/59352905/how-can-store-a-json-in-redis-with-hashmap-hset
                result = await redis_hSet(uid, value, authPassword, authHost, authPort);
            }
            catch(err) {
                console.log(err.message);
            }
            break;
    }

    response = JSON.stringify({
        "result": result
    });
    console.log(response);
    res.send(response);
});

app.post('/api/ingredients', async function (req, res) {
    const port = "10543";
    const data = req.body;
    const action = req.body.action;
    console.log(req.ip);
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    console.log(dateTime);
    console.log('Received data: ', data);
    let response = "No action received.";
    let result = "";
    switch(action) {
        case("get"):
            try {
                const ingredient = req.body.ingredient;
                result = await redis_hGetAll(ingredient, ingredientsPassword, ingredientsHost, ingredientsPort);
            }
            catch(err) {
                console.log(err.message);
            }
            break;
        case("set"):
            try {
                const ingredient = req.body.ingredient;
                const price = req.body.price;
                const unit = req.body.unit;
                const threshold = req.body.threshold;
                const retailer = req.body.retailer;
                const value = {
                    price: price,
                    unit: unit,
                    threshold: threshold,
                    retailer: retailer
                }
                result = await redis_hSet(ingredient, value, ingredientsPassword, ingredientsHost, ingredientsPort);
            }
            catch(err) {
                console.log(err.message);
            }
            break;
    }

    response = JSON.stringify({
        "result": result
    });
    console.log(response);
    res.send(response);
});

app.post('/api/quantity', async function (req, res) {
    const data = req.body;
    const action = req.body.action;
    console.log(req.ip);
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    console.log(dateTime);
    console.log('Received data: ', data);
    let response = "No action received.";
    let result = "";
    switch(action) {
        case("get"):
            try {
                const item = req.body.item;
                result = await redis_get(item, quantityPassword, quantityHost, quantityPort)
            }
            catch(err) {
                console.log(err.message);
            }
            break;
        case("set"):
            try {
                const item = req.body.item;
                result = await redis_mSet(item, quantityPassword, quantityHost, quantityPort);
            }
            catch(err) {
                console.log(err.message);
            }
            break;
    }

    response = JSON.stringify({
        "result": result
    });
    console.log(response);
    res.send(response);
});

app.post('/api/pastOrders', async function (req, res) {
    const data = req.body;
    const action = req.body.action;
    console.log(req.ip);
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    console.log(dateTime);
    console.log('Received data: ', data);
    let response = "No action received.";
    let result = "";
    switch(action) {
        case("get"):
            try {
                const uid = req.body.uid;
                result = await redis_lRange(uid, pastOrdersPassword, pastOrdersHost, pastOrdersPort)
            }
            catch(err) {
                console.log(err.message);
            }
            break;
        case("set"):
            try {
                const uid = req.body.uid;
                const orders = req.body.orders;
                result = await redis_lPush(uid, orders, pastOrdersPassword, pastOrdersHost, pastOrdersPort)
            }
            catch(err) {
                console.log(err.message);
            }
            break;
    }

    response = JSON.stringify({
        "result": result
    });
    console.log(response);
    res.send(response);
});

app.listen(3000, function() {
    console.log('Server listening at http://CONTAINER_IP_ADDRESS:' + port +'/api/endpoint');
});