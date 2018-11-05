const path = require('path');
const express = require('express');
const app = express();
var port = process.env.PORT || 8080;

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on 8080 port`);
});
