import {mongoQueryOne, mongoInsertOne, mongoUpdateOne} from "./mongo.js";
import {
    redis_get,
    redis_hSet,
    redis_hGet,
    redis_hGetAll,
    redis_mSet,
    redis_mGet, redis_sAdd, redis_sMembers
} from "./redisdb.js";
import express from 'express';
import bodyParser from "body-parser";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();

const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res, next) {
    res.send("Try calling our API endpoints");
});

app.get('/docs', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/api/auth', async function (req, res) {
    const authPassword = process.env.AUTH_REDIS_PASSWORD;
    const authHost = process.env.AUTH_REDIS_HOST;
    const authPort = process.env.AUTH_REDIS_PORT;
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
                    // result = uid;
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
    const ingredientsPassword = process.env.INGREDIENTS_REDIS_PASSWORD;
    const ingredientsHost = process.env.INGREDIENTS_REDIS_HOST;
    const ingredientsPort = process.env.INGREDIENTS_REDIS_PORT;
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
    const quantityPassword = process.env.QUANTITY_REDIS_PASSWORD;
    const quantityHost = process.env.QUANTITY_REDIS_HOST;
    const quantityPort = process.env.QUANTITY_REDIS_PORT;
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
                let item = req.body.item;
                const itemArr = Object.keys(item);
                const existingItems = await redis_mGet(itemArr, quantityPassword, quantityHost, quantityPort);
                // console.log(existingItems);
                // add quantity to existing items
                for (let i = 0; i < itemArr.length - 1; i++) {
                    if (existingItems[i] != null) {
                        item[itemArr[i]] = (parseInt(item[itemArr[i]]) + parseInt(await redis_get(itemArr[i],quantityPassword, quantityHost, quantityPort))).toString();
                    }
                }
                // console.log(item);
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
    const pastOrdersPassword = process.env.PASTORDERS_REDIS_PASSWORD;
    const pastOrdersHost = process.env.PASTORDERS_REDIS_HOST;
    const pastOrdersPort = process.env.PASTORDERS_REDIS_PORT;
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
                result = await redis_sMembers(uid, pastOrdersPassword, pastOrdersHost, pastOrdersPort);
            }
            catch(err) {
                console.log(err.message);
            }
            break;
        case("set"):
            try {
                const uid = req.body.uid;
                let orders = req.body.orders;
                result = await redis_sAdd(uid, orders, pastOrdersPassword, pastOrdersHost, pastOrdersPort);
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

app.post("/api/request", async function (req, res) {
    const requestCollection = process.env.MONGO_COLLECTION_REQUEST;
    const data = req.body;
    const action = req.body.action;
    console.log(req.ip);
    let today = new Date();
    let date =
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    let time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;
    console.log(dateTime);
    console.log("Received data: ", data);
    let response = "No action received.";
    let result = "";
    switch (action) {
        case "get":
            try {
                const uid = req.body.uid;
                result = await mongoQueryOne("uid", uid, requestCollection);
            } catch (err) {
                console.log(err.message);
            }
            break;
        case "set":
            try {
                const uid = req.body.uid;
                const duplicate = await mongoQueryOne("uid", uid, requestCollection);
                if (duplicate != null) {
                    result = await mongoUpdateOne("uid", uid, data, requestCollection);
                }
                else {
                    result = await mongoInsertOne(data, requestCollection);
                }
            } catch (err) {
                console.log(err.message);
            }
            break;
    }

    response = JSON.stringify({
        result: result,
    });
    console.log(response);
    res.send(response);
});

app.post("/api/order", async function (req, res) {
    const orderCollection = process.env.MONGO_COLLECTION_ORDER;
    const data = req.body;
    const action = req.body.action;
    console.log(req.ip);
    let today = new Date();
    let date =
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    let time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;
    console.log(dateTime);
    console.log("Received data: ", data);
    let response = "No action received.";
    let result = "";
    switch (action) {
        case "get":
            try {
                const uid = req.body.uid;
                result = await mongoQueryOne("uid", uid, orderCollection);
            } catch (err) {
                console.log(err.message);
            }
            break;
        case "set":
            try {
                const oid = req.body.oid;
                const duplicate = await mongoQueryOne("oid", oid, orderCollection);
                if (duplicate != null) {
                    result = await mongoUpdateOne("oid", oid, data, orderCollection);
                }
                else {
                    result = await mongoInsertOne(data, requestCollection);
                }
            } catch (err) {
                console.log(err.message);
            }
            break;
    }

    response = JSON.stringify({
        result: result,
    });
    console.log(response);
    res.send(response);
});


app.listen(3000, function() {
    console.log('Server listening at http://CONTAINER_IP_ADDRESS:' + port +'/api/endpoint');
});