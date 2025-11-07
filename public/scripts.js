const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const btnHealth = document.getElementById('btn-health');
const outHealth = document.getElementById('health-output');
const badge = document.getElementById('health-badge');

const btnMetrics = document.getElementById('btn-metrics');
const outMetrics = document.getElementById('metrics-output');

// Health check (expects /health => {status:'ok'})
btnHealth?.addEventListener('click', async () => {
  outHealth.textContent = 'Checking...';
  const t0 = performance.now();
  try {
    const res = await fetch('/health', { cache: 'no-store' });
    const t1 = performance.now();
    const data = await res.json();
    outHealth.textContent = JSON.stringify({ ...data, ms: Math.round(t1 - t0) }, null, 2);
    if (data.status === 'ok' || data.healthy === true) {
      badge.className = 'badge ok'; badge.textContent = 'Healthy';
    } else {
      badge.className = 'badge warn'; badge.textContent = 'Degraded';
    }
  } catch (e) {
    badge.className = 'badge bad'; badge.textContent = 'Down';
    outHealth.textContent = String(e);
  }
});

// Metrics snapshot (first 25 lines)
btnMetrics?.addEventListener('click', async () => {
  outMetrics.textContent = 'Fetching metrics...';
  try {
    const res = await fetch('/metrics', { cache: 'no-store' });
    const text = await res.text();
    outMetrics.textContent = text.split('\n').slice(0, 25).join('\n') + '\n...';
  } catch (e) {
    outMetrics.textContent = String(e);
  }
});
