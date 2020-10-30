const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()

// insert a mongo db connection to a locally-running mongo instance

const app = express();
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

const chatRouter = require('./routes/chat');

app.use('/chat', chatRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});