const fs = require('fs');
const path = require('path');
const { logQueue } = require("../../queue/logQueue");
const { filterLogs } = require('../../utils/filterLogs');

const LOG_FILE = path.join(__dirname, '..', '..', 'logs.json');

const getLogsController = (req, res) => {
    res.send('getLogsController');
}

const ingestLogsController = async (req, res) => {
    try {
        const log = req.body;

        if (!log.timestamp) {
            log.timestamp = new Date().toISOString();
        }

        await logQueue.add('logQueue', log);

        return res.status(201).json({
            error: false,
            message: 'Log successfully saved',
            data: log,
        });

    } catch (err) {
        console.error('[ingestLogsController] Error:', err);
        return res.status(500).json({
            error: true,
            message: `Internal server error: ${err.message}`,
            data: null
        });
    }
}

const searchLogsController = (req, res) => {
  try {
    const data = fs.readFileSync(LOG_FILE, 'utf8');
    const logs = data.trim() ? JSON.parse(data) : [];

    console.log({logs})

    const filtered = filterLogs(logs, req.query);
    console.log({filtered})

    res.status(200).json({error: false, data: filtered, message: 'Logs fetched successfully'});

  } catch (err) {
    console.error('[getLogsController] Failed to read logs.json', err);
    res.status(500).json({ error: 'Failed to read logs' });
  }
};

module.exports = { getLogsController };


module.exports = {
    getLogsController,
    ingestLogsController,
    searchLogsController
}