# 📄 Log Ingestion and Real-Time Streaming System

A production-grade log ingestion and querying system built using **Node.js**, **Express**, **BullMQ**, **Redis**, **React (Vite)**, and **Server-Sent Events (SSE)**.

---

## 🚀 Features

- ✅ **Log Ingestion API** (`POST /logs`)
- 📂 **Persistent Storage** of logs in `logs.json`
- 🔁 **Job Queue with BullMQ** for decoupled log processing
- 🔍 **Search Logs** via filters (`GET /logs/search`)
- 📡 **Real-Time Log Streaming** via SSE (`GET /logs`)
- 🧪 **Validation** using `Joi`
- ⚛️ **React Frontend** (Vite) with:
  - Live streaming via SSE
  - On-demand search
  - Log submission UI
  - Filter by level, resourceId, start time, end time
- 🌐 **CORS-enabled API** for frontend-backend communication
- 📁 Structured folder architecture

---

## 🏗️ Architecture

```
+---------------------------+
|       React Frontend     |
|---------------------------|
| - Mode toggle (SSE/Search)|
| - Log filters + form UI   |
| - Fetch API + EventSource |
+---------------------------+
           │
           ▼
+---------------------------+
|       Express Backend     |
|---------------------------|
| - POST /logs              |
| - GET /logs/search        |
| - GET /logs (SSE)         |
| - Joi validation          |
| - In-memory SSE clients   |
+---------------------------+
           │
           ▼
+---------------------------+
|      BullMQ Queue (Redis) |
|---------------------------|
| - Log queue               |
| - Worker handles writes   |
| - Broadcasts via SSE      |
+---------------------------+
           │
           ▼
+---------------------------+
|     logs.json File        |
|---------------------------|
| - Persistent log store    |
+---------------------------+
```

---

## 🧰 Technology Stack

### Backend
- **Node.js + Express** – Core API and SSE server
- **BullMQ + Redis** – Job queuing and async log ingestion
- **fs** – Log persistence in JSON format
- **Joi** – Schema validation for request body
- **Server-Sent Events (SSE)** – Real-time log streaming to the client
- **CORS + dotenv + nodemon + concurrently** – Development utilities

### Frontend
- **React + Vite** – Lightweight modern frontend
- **Fetch API + EventSource** – API communication and SSE handling
- **CSS Flexbox** – Responsive and user-friendly layout

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/woruz/logger.git
cd logger
```

### 2. Install dependencies

```bash
# Backend
cd logger_backend
npm install

# Frontend
cd ../logger_frontend
npm install
```

### 3. Run Redis (if not running)

```bash
# Linux (Snap-based)
sudo snap install redis
sudo snap set redis service.start=true
```

### 4. Start the application

```bash
# Start both frontend and backend
# Terminal 1
cd logger_backend
npm start

# Terminal 2
cd logger_frontend
npm run dev
```

---

## ✅ API Reference

### `POST /logs`

Submit a new log entry.

```json
{
  "message": "User login successful",
  "level": "info",
  "resourceId": "auth-service",
  "traceId": "abc123",
  "spanId": "xyz456",
  "commit": "7f23d9a",
  "metadata": {
    "userId": "u001",
    "ip": "127.0.0.1"
  }
}
```

### `GET /logs/search`

Filter logs by:

- `level` (info, warn, error, success)
- `resourceId`
- `start` (ISO timestamp)
- `end` (ISO timestamp)

Example:

```
/logs/search?level=warn&resourceId=auth-service
```

### `GET /logs` (SSE)

Stream logs in real time, with optional filters.

Example:

```
/logs?level=info&resourceId=auth-service
```

---

## 📁 Folder Structure

```
logger/
├── logger_backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── queue/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── events/
│   ├── logs.json
│   ├── server.js
│   └── package.json
├── logger_frontend/
│   ├── src/
│   │   ├── components/LogViewer.jsx
│   │   ├── utils/constants.js
│   │  
│   └── package.json
└── README.md
```

---

## 🧠 Future Enhancements

- ✅ Migrate log storage from file (`logs.json`) to database (PostgreSQL, MongoDB, etc.)
- ✅ Add authentication to protect endpoints
- ✅ Use WebSockets for full-duplex streaming
- ✅ Add pagination for search results
- ✅ Create admin dashboard for log insights

---

## 👨‍💻 Author

Made with ❤️ by [Woruz](https://github.com/woruz)