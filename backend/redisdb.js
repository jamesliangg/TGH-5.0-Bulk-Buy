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
export async function redis_set(key, array, password, host, port) {
    const client = await createClient({
        password: password,
        socket: {
            host: host,
            port: port
        }
    });
    await client.connect();
    const response = await client.set(key, array);
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
export async function redis_hSet(key, array, password, host, port) {
    const client = await createClient({
        password: password,
        socket: {
            host: host,
            port: port
        }
    });
    await client.connect();
    const response = await client.hSet(key, array);
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
export async function redis_sAdd(key, array, password, host, port) {
    const client = createClient({
        password: password,
        socket: {
            host: host,
            port: port
        }
    });
    await client.connect();
    const response = await client.sAdd(key, array);
    await client.disconnect();
    return response;
}

// https://redis.io/commands/mset/
export async function redis_mSet(array, password, host, port) {
    const client = await createClient({
        password: password,
        socket: {
            host: host,
            port: port
        }
    });
    await client.connect();
    const response = await client.mSet(array);
    await client.disconnect();
    return response;
}

// https://redis.io/commands/lpush/
export async function redis_lPush(key, array, password, host, port) {
    const client = createClient({
        password: password,
        socket: {
            host: host,
            port: port
        }
    });
    await client.connect();
    const response = await client.lPush(key, array);
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

// https://redis.io/commands/mget/
export async function redis_mGet(array, password, host, port) {
    const client = createClient({
        password: password,
        socket: {
            host: host,
            port: port
        }
    });
    await client.connect();
    const response = await client.mGet(array);
    await client.disconnect();
    return response;
}

// https://redis.io/commands/smembers/
export async function redis_sMembers(key, password, host, port) {
    const client = createClient({
        password: password,
        socket: {
            host: host,
            port: port
        }
    });
    await client.connect();
    const response = await client.sMembers(key);
    await client.disconnect();
    return response;
}