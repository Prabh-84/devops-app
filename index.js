const express = require('express');
const client = require('prom-client');

const app = express();
const collectDefaultMetrics = client.collectDefaultMetrics;

// Collect default system metrics (CPU, Memory, Event Loop, etc.)
collectDefaultMetrics();

// Custom counter metric to count homepage hits
const httpRequests = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
});

app.get('/', (req, res) => {
  httpRequests.inc(); // Increment counter
  res.json({ message: 'App running successfully! , Hello Prabh w/ Monitoring ✅' });
});

// Metrics endpoint (Prometheus scrapes this)
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Dynamic PORT for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
