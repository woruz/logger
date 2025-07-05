const filterLogs = (logs, { level, resourceId, start, end }) => {
    console.log({level,resourceId})
    let value = logs.filter(log => {
        if (level && log.level !== level) return false;
        if (resourceId && log.resourceId !== resourceId) return false;

        const time = new Date(log.timestamp).getTime();
        if (start && time < new Date(start).getTime()) return false;
        if (end && time > new Date(end).getTime()) return false;

        return true;
    });
    console.log({value})
    return value
}

module.exports = { filterLogs };
