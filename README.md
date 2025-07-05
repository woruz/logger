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
git clone https://github.com/yourusername/log-streamer.git
cd log-streamer
