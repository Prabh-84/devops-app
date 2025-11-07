const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'App running successfully! , Hello Ashwinder' });
});

// ✅ Use dynamic PORT for Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
