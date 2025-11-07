const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'App running successfully! , Tested Automated CI/CD' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
