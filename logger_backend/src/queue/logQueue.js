const { Queue } = require('bullmq');
const IORedis = require('ioredis');

const connection = {
    host: "127.0.0.1",
    port: 6379   
}

const logQueue = new Queue('logQueue', {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 500, 
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});

module.exports = {
  logQueue,
  connection,
};