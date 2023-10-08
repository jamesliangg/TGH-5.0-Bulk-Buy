import {MongoClient} from "mongodb";
import 'dotenv/config';

const uri = process.env.MONGO_CONNECT_STRING;
const mongoDatabase = process.env.MONGO_DATABASE;
// const mongoCollection = process.env.MONGO_COLLECTION;

export async function mongoQueryOne(queryKey, queryValue, requestCollection) {
    const client = new MongoClient(uri);
    let queryResult = "Error in query";
    try {
        const database = client.db(mongoDatabase);
        const collection = database.collection(requestCollection);

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

export async function mongoQueryMultiple(queryArray, requestCollection) {
    const client = new MongoClient(uri);
    let queryResult = "Error in query";
    try {
        const database = client.db(mongoDatabase);

        let queryObject = {};
        for (const i in queryArray) {
            Object.assign(queryObject, {[queryArray[i][0]]: {$gte : queryArray[i][1], $lte : queryArray[i][2]}});
        }

        const collection = database.collection(requestCollection);
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

export async function mongoInsertOne(input, requestCollection) {
    const client = new MongoClient(uri);
    let insertResult = "Error in insert";
    try {
        const database = client.db(mongoDatabase);
        const collection = database.collection(requestCollection);

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

export async function mongoUpdateOne(queryKey, queryValue, input, requestCollection) {
    const client = new MongoClient(uri);
    let updateResult = "Error in update";
    try {
        const database = client.db(mongoDatabase);
        const collection = database.collection(requestCollection);

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
