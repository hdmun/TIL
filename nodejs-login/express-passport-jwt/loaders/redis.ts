import Redis from 'ioredis'

const redisClient = new Redis(6379, 'localhost');

export default redisClient;
