# Pixel-38 Shipment Management Application

A full-stack web application for managing shipments with real-time weather data integration. Built with React + TypeScript on the frontend and Node.js + Express on the backend.

## Features

- User authentication with JWT tokens
- Create, read, update, and delete shipments
- Search shipments by customer name or waybill number
- Filter shipments by status (Created, In Transit, Delivered)
- Update shipment status via modal dialog
- Real-time weather data for destination addresses
- Responsive design with clean, modern UI

## Setup Instructions

### 1. Database Setup

First, create a MySQL database:

```bash
mysql -u root -p
```

Then in MySQL:

```sql
CREATE DATABASE pixel38_db;
EXIT;
```

### 2. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the server directory with  variables as found in `.env.example`.

Sync the database (creates tables):

```bash
npm run sync-db
```

Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:4000`

### 3. Frontend Setup

In a new terminal, navigate to the client directory:

```bash
cd client
npm install
```

Start the React development server:

```bash
npm start
```

The frontend will open at `http://localhost:3000`