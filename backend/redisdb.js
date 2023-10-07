import { createClient } from 'redis';
import 'dotenv/config';

const password = process.env.REDIS_PASSWORD;
const host = process.env.REDIS_HOST;
const port = process.env.REDIS_PORT;

// https://redis.io/commands/get/
export async function redis_get(key) {
    const client = createClient({
        password: password,
        socket: {
            host: host,
            port: port
        }
    });
    await client.connect();
    const value = await client.get(key);
    await client.disconnect();
    return value;
}

// https://redis.io/commands/set/
export async function redis_set(key, value) {
    const client = await createClient({
        password: password,
        socket: {
            host: host,
            port: port
        }
    });
    await client.connect();
    const response = await client.set(key, value);
    await client.disconnect();
    return response;
}

// https://redis.io/commands/hget/
export async function redis_hGet(key, field) {
    const client = createClient({
        password: password,
        socket: {
            host: host,
            port: port
        }
    });
    await client.connect();
    const value = await client.hGet(key, field);
    await client.disconnect();
    return value;
}

// https://redis.io/commands/hset/
export async function redis_hSet(key, value) {
    const client = await createClient({
        password: password,
        socket: {
            host: host,
            port: port
        }
    });
    await client.connect();
    const response = await client.hSet(key, value);
    // const response = await client.hSet('user-session:123', {
    //     name: 'John',
    //     surname: 'Smith',
    //     company: 'Redis',
    //     age: 29
    // });
    await client.disconnect();
    return response;
}