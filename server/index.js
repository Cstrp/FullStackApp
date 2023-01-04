const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'I"m work',
  });
});

app.listen(5000, () => console.log('Server has been started'));
