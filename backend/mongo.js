import {MongoClient} from "mongodb";
import 'dotenv/config'

const uri = process.env.MONGO_CONNECT_STRING;
const mongoDatabase = process.env.MONGO_DATABASE;
const mongoCollection = process.env.MONGO_COLLECTION;

export async function mongoQueryOne(queryKey, queryValue) {
    const client = new MongoClient(uri);
    let queryResult = "Error in query";
    try {
        const database = client.db(mongoDatabase);
        const collection = database.collection(mongoCollection);

        const query = { [queryKey]: queryValue };
        queryResult = await collection.findOne(query);

        // console.log(queryResult);
    } catch(err) {
        queryResult = err.message;
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
        return queryResult;
    }
}

export async function mongoQueryMultiple(queryArray) {
    const client = new MongoClient(uri);
    let queryResult = "Error in query";
    try {
        const database = client.db(mongoDatabase);

        let queryObject = {};
        for (const i in queryArray) {
            Object.assign(queryObject, {[queryArray[i][0]]: {$gte : queryArray[i][1], $lte : queryArray[i][2]}});
        }

        const collection = database.collection(mongoCollection);
        queryResult = await collection.find(queryObject).toArray();

        // console.log(queryResult);
    } catch(err) {
        queryResult = err.message;
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
        return queryResult;
    }
}

export async function mongoInsertOne(input) {
    const client = new MongoClient(uri);
    let insertResult = "Error in insert";
    try {
        const database = client.db(mongoDatabase);
        const collection = database.collection(mongoCollection);

        let insert = {};
        Object.assign(insert, input);

        insertResult = await collection.insertOne(insert);

        // console.log(insertResult);
    } catch(err) {
        insertResult = err.message;
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
        return insertResult;
    }
}

export async function mongoUpdateOne(queryKey, queryValue, input) {
    const client = new MongoClient(uri);
    let updateResult = "Error in update";
    try {
        const database = client.db(mongoDatabase);
        const collection = database.collection(mongoCollection);

        let insert = {};
        Object.assign(insert, input);

        updateResult = await collection.updateOne(
            {[queryKey]: queryValue},
            {$set: insert}
        );

        // console.log(updateResult);
    } catch(err) {
        updateResult = err.message;
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
        return updateResult;
    }
}