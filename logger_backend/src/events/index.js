const fs = require('fs');
const path = require('path');
const { filterLogs } = require('../utils/filterLogs');

const clients = [];
const LOG_FILE = path.join(__dirname, '..', 'logs.json');

function registerSSE(req, res) {
    res.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
    });
    res.flushHeaders();

    const filters = {
        level: req.query.level,
        resourceId: req.query.resourceId,
        start: req.query.start,
        end: req.query.end,
    };

    try {
        const data = fs.readFileSync(LOG_FILE, 'utf8');
        const logs = JSON.parse(data);
        const filtered = filterLogs(logs, filters);

        for (const log of filtered) {
            res.write(`data: ${JSON.stringify(log)}\n\n`);
        }
    } catch (err) {
        console.error('[SSE] ❌ Failed to read old logs:', err);
    }

    const client = { res, filters };
    clients.push(client);

    console.log(`[SSE] 🔗 Client connected. Total clients: ${clients.length}`);

    req.on('close', () => {
        const index = clients.indexOf(client);
        if (index !== -1) clients.splice(index, 1);
        console.log(`[SSE] ❌ Client disconnected. Remaining: ${clients.length}`);
    });
}

function broadcastLog(log) {
    console.log('[SSE] Broadcasting to clients:', clients.length);
    for (const client of clients) {
        const result = filterLogs([log], client.filters);
        if (result.length > 0) {
            client.res.write(`data: ${JSON.stringify(log)}\n\n`);
        }
    }
}

module.exports = {
    registerSSE,
    broadcastLog,
};
