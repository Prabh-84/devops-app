const express = require('express');
const client = require('prom-client');       // 📊 Prometheus
const app = express();

// collect default metrics
client.collectDefaultMetrics();

// latency histogram (HTTP)
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.005,0.01,0.025,0.05,0.1,0.25,0.5,1,2,5]
});
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on('finish', () => end({ method: req.method, route: req.route?.path || req.path, status_code: res.statusCode }));
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'App running successfully! , Hello Ashwinder' });
});

// expose /metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
