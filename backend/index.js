import {mongoQueryOne, mongoInsertOne, mongoQueryMultiple, mongoUpdateOne} from "./mongo.js";
import {redis_set, redis_get} from "./redisdb.js";
import express from 'express';
const app = express();
import bodyParser from "body-parser";
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res, next) {
    res.send("Try calling our API endpoints");
});

app.post('/api/request', async function (req, res) {
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
                result = await mongoQueryOne("uid", uid);
            }
            catch(err) {
                console.log(err.message);
            }
            break;
        case("set"):
            try {
                const uid = req.body.uid;
                const ingredients = req.body.ingredients;
                result = await mongoInsertOne(data);
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

app.post('/api/auth', async function (req, res) {
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
                const pwd = req.body.pwd;
                result = await redis_get(uid);
                if (result == pwd) {
                    result = "Authenticated";
                }
                else {
                    result = "Invalid";
                }
            }
            catch(err) {
                console.log(err.message);
            }
            break;
        case("set"):
            try {
                const uid = req.body.uid;
                const pwd = req.body.pwd;
                result = await redis_set(uid, pwd);
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