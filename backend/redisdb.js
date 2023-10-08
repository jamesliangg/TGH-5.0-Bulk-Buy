import { createClient } from 'redis';
import 'dotenv/config';

// https://redis.io/commands/get/
export async function redis_get(key, password, host, port) {
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
export async function redis_set(key, value, password, host, port) {
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
export async function redis_hGet(key, field, password, host, port) {
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
export async function redis_hSet(key, value, password, host, port) {
    const client = await createClient({
        password: password,
        socket: {
            host: host,
            port: port
        }
    });
    await client.connect();
    const response = await client.hSet(key, value);
    await client.disconnect();
    return response;
}

// https://redis.io/commands/hgetall/
export async function redis_hGetAll(key, password, host, port) {
    const client = createClient({
        password: password,
        socket: {
            host: host,
            port: port
        }
    });
    await client.connect();
    const value = await client.hGetAll(key);
    await client.disconnect();
    return value;
}

// https://redis.io/commands/hgetall/
export async function redis_zAdd(key, value, password, host, port) {
    const client = createClient({
        password: password,
        socket: {
            host: host,
            port: port
        }
    });
    const numOfKeys = Object.keys(value).length
    await client.connect();
    const response = await client.zAdd(key, numOfKeys, value);
    await client.disconnect();
    return response;
}

// https://redis.io/commands/mset/
export async function redis_mSet(value, password, host, port) {
    const client = await createClient({
        password: password,
        socket: {
            host: host,
            port: port
        }
    });
    await client.connect();
    const response = await client.mSet(value);
    await client.disconnect();
    return response;
}