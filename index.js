const express = require('express');
const client = require('prom-client');
const path = require('path');

const app = express();

// Prometheus (already installed)
client.collectDefaultMetrics();

// Static UI
app.use(express.static(path.join(__dirname, 'public')));

// API (optional)
app.get('/api', (req, res) => {
  res.json({ message: 'CI/CD working ✅ via Jenkins → Docker → Docker Hub → Render' });
});

// Health endpoint for dashboard
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

// Metrics endpoint (already added earlier, keep as-is)
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
