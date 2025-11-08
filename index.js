const express = require('express');
const path = require('path');
const client = require('prom-client');

const app = express();

// Serve frontend static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Prometheus Metrics Registry
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// API Home Endpoint (JSON)
app.get('/api', (req, res) => {
  res.json({ message: 'App Running Successfully with CI/CD + Monitoring ✅' });
});

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    message: 'Service is healthy',
    timestamp: new Date().toISOString(),
  });
});

// Metrics Endpoint (Prometheus)
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Dynamic Port (Render support)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
