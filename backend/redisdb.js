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
    const response = await client.get(key);
    await client.disconnect();
    return response;
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
    const response = await client.hGet(key, field);
    await client.disconnect();
    return response;
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
    const response = await client.hGetAll(key);
    await client.disconnect();
    return response;
}

// https://redis.io/commands/hgetall/
export async function redis_sAdd(key, value, password, host, port) {
    const client = createClient({
        password: password,
        socket: {
            host: host,
            port: port
        }
    });
    await client.connect();
    const response = await client.sAdd(key, value);
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

// https://redis.io/commands/lpush/
export async function redis_lPush(key, value, password, host, port) {
    const client = createClient({
        password: password,
        socket: {
            host: host,
            port: port
        }
    });
    await client.connect();
    const response = await client.lPush(key, value);
    await client.disconnect();
    return response;
}

// https://redis.io/commands/lrange/
export async function redis_lRange(key, password, host, port) {
    const client = createClient({
        password: password,
        socket: {
            host: host,
            port: port
        }
    });
    await client.connect();
    const response = await client.lRange(key, 0, -1);
    await client.disconnect();
    return response;
}