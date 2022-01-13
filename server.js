const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./login.html'));
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});