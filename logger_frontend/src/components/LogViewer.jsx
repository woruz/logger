import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { API_ENDPOINTS } from "../utils/CONST";

const LogViewer = () => {
    const [mode, setMode] = useState("sse");
    const [level, setLevel] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [resourceId, setResourceId] = useState("");
    const [logs, setLogs] = useState([]);
    const [newLog, setNewLog] = useState({
        message: "",
        level: "info",
        resourceId: "",
        traceId: "",
        spanId: "",
        commit: "",
        metadata: { userId: "", ip: "" },
    });

    const eventSourceRef = useRef(null);

    const fetchLogs = () => {
        setLogs([]);

        const params = new URLSearchParams();
        if (level) params.append("level", level);
        if (resourceId) params.append("resourceId", resourceId);
        if (start) params.append("start", new Date(start).toISOString());
        if (end) params.append("end", new Date(end).toISOString());

        if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
        }

        if (mode === "sse") {
            const es = new EventSource(`${API_ENDPOINTS.STREAM_LOGS}?${params.toString()}`);
            eventSourceRef.current = es;

            es.onmessage = (event) => {
                const log = JSON.parse(event.data);
                setLogs((prev) => [...prev, log]);
            };

            es.onerror = (err) => {
                console.error("SSE error", err);
                es.close();
            };
        } else {
            fetch(`${API_ENDPOINTS.SEARCH_LOGS}?${params.toString()}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log({data})
                    if(!data?.error){
                        setLogs(data?.data);
                    }
                })
                .catch((err) => console.error("Search error", err));
        }
    };


    const submitLog = async () => {
        try {
            const res = await fetch(API_ENDPOINTS.POST_LOG, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newLog),
            });

            const data = await res.json();

            if (!res.ok) {
                alert("❌ Failed to submit log: " + data.message);
                return;
            }

            alert("✅ Log submitted successfully");
        } catch (err) {
            console.error("❌ Submit error", err);
            alert("❌ Network or server error");
        }
    };

    useEffect(() => {
        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
            }
        };
    }, []);

    return (
        <div className="log-viewer">
            <h2>📄 Log Viewer</h2>

            <section className="filters">
                <label>
                    Mode:
                    <select value={mode} onChange={(e) => setMode(e.target.value)}>
                        <option value="sse">Live Stream (SSE)</option>
                        <option value="search">Single Search</option>
                    </select>
                </label>

                <label>
                    Level:
                    <select value={level} onChange={(e) => setLevel(e.target.value)}>
                        <option value="">All</option>
                        <option value="info">info</option>
                        <option value="warn">warn</option>
                        <option value="error">error</option>
                        <option value="success">success</option>
                    </select>
                </label>

                <label>
                    Resource ID:
                    <input
                        type="text"
                        value={resourceId}
                        onChange={(e) => setResourceId(e.target.value)}
                        placeholder="e.g., auth-service"
                    />
                </label>

                <label>
                    Start Time:
                    <input
                        type="datetime-local"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                    />
                </label>

                <label>
                    End Time:
                    <input
                        type="datetime-local"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                    />
                </label>


                <button onClick={fetchLogs}>🔍 Load Logs</button>
            </section>

            <section className="log-display">
                {logs.map((log, idx) => (
                    <pre key={idx}>{JSON.stringify(log, null, 2)}</pre>
                ))}
            </section>

            <h3>📝 Submit New Log</h3>
            <section className="log-form">
                <input
                    placeholder="Message"
                    value={newLog.message}
                    onChange={(e) => setNewLog({ ...newLog, message: e.target.value })}
                />
                <select
                    value={newLog.level}
                    onChange={(e) => setNewLog({ ...newLog, level: e.target.value })}
                >
                    <option value="info">info</option>
                    <option value="warn">warn</option>
                    <option value="error">error</option>
                    <option value="success">success</option>
                </select>
                <input
                    placeholder="Resource ID"
                    value={newLog.resourceId}
                    onChange={(e) => setNewLog({ ...newLog, resourceId: e.target.value })}
                />
                <input
                    placeholder="Trace ID"
                    value={newLog.traceId}
                    onChange={(e) => setNewLog({ ...newLog, traceId: e.target.value })}
                />
                <input
                    placeholder="Span ID"
                    value={newLog.spanId}
                    onChange={(e) => setNewLog({ ...newLog, spanId: e.target.value })}
                />
                <input
                    placeholder="Commit"
                    value={newLog.commit}
                    onChange={(e) => setNewLog({ ...newLog, commit: e.target.value })}
                />
                <input
                    placeholder="User ID"
                    value={newLog.metadata.userId}
                    onChange={(e) =>
                        setNewLog({
                            ...newLog,
                            metadata: { ...newLog.metadata, userId: e.target.value },
                        })
                    }
                />
                <input
                    placeholder="IP"
                    value={newLog.metadata.ip}
                    onChange={(e) =>
                        setNewLog({
                            ...newLog,
                            metadata: { ...newLog.metadata, ip: e.target.value },
                        })
                    }
                />
                <button onClick={submitLog}>🚀 Submit Log</button>
            </section>
        </div>
    );
};

export default LogViewer;
