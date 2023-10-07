import { createClient } from 'redis';
import 'dotenv/config';

const password = process.env.REDIS_PASSWORD;
const host = process.env.REDIS_HOST;
const port = process.env.REDIS_PORT;

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