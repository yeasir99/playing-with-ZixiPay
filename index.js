import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the Express server!');
});

app.listen(5000, () => {
  console.log('Express server is listening on port 5000!');
});
