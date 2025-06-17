import Redis from "ioredis";

// 创建Redis客户端实例
const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD,
});

export default redis;
