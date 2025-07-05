const { Worker } = require('bullmq');
const fs = require('fs');
const path = require('path');
const { connection } = require('./logQueue');
const { broadcastLog } = require('../events');

const LOG_FILE = path.join(__dirname, '..', 'logs.json');

if (!fs.existsSync(LOG_FILE)) {
  fs.writeFileSync(LOG_FILE, '[]', 'utf8');
}

const logWorker = new Worker(
  'logQueue',
  async job => {
    const log = job.data;

    try {
      const data = fs.readFileSync(LOG_FILE, 'utf8');
      const logs = Array.isArray(JSON.parse(data)) ? JSON.parse(data) : [];

      logs.push(log);

      fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2), 'utf8');

      broadcastLog(log);
    } catch (err) {
      console.error('[Worker] ❌ Failed to write log:', err);
      throw err; 
    }
  },
  {
    connection,
    concurrency: 2,
    lockDuration: 30000,
    limiter: {
      max: 50, 
      duration: 1000,
    },
  }
);

logWorker.on('completed', job => {
  console.log(`[Worker] ✅ Job completed (ID: ${job.id})`);
});

logWorker.on('failed', (job, err) => {
  console.error(`[Worker] ❌ Job failed (ID: ${job.id})`, err);
});

console.log('👷 Worker is running and writing logs to logs.json');
