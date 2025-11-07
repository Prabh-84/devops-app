const express = require('express');
const client = require('prom-client');
const app = express();

// Prometheus Metrics Registry
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    message: 'Service is healthy',
    timestamp: new Date().toISOString(),
  });
});

// Metrics Endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Home Page
app.get('/', (req, res) => {
  res.json({ message: 'App Running Successfully with CI/CD + Monitoring ✅' });
});

// Use dynamic port for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
