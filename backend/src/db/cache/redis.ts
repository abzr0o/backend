import { createClient } from "redis";

const redisclient = createClient((process.env as any).REDIS);

export default redisclient;
