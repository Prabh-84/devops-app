const request = require('supertest');
const express = require('express');

const app = express();
app.get('/', (req, res) => {
  res.json({ message: 'App running successfully!' });
});

test('GET / should return success message', async () => {
  const response = await request(app).get('/');
  expect(response.status).toBe(200);
  expect(response.body.message).toBe('App running successfully!');
});
