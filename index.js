import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();

app.use(
  express.json({
    extended: false,
  })
);

app.get('/', (req, res) => {
  res.send('Welcome to the Express server!');
});

app.post('/create-payment-intend', async (req, res) => {
  try {
    const data = req.body;

    const config = {
      headers: {
        'x-api-key': `${process.env.key}`,
        'Content-Type': 'application/json',
      },
    };

    const createdIntend = await axios.post(
      `${process.env.API_URL}/payment`,
      data,
      config
    );

    console.log(createdIntend.data);

    res.status(200).json({
      msg: 'data received',
      intend: createdIntend,
    });
  } catch (error) {
    res.status(400).json({
      msg: 'something went wrong',
    });
  }
});

app.post('/check-payment-status', async (req, res) => {
  try {
    const data = req.body;
    console.log(data.payment_id);

    const config = {
      headers: {
        'x-api-key': `${process.env.key}`,
      },
    };

    const paymentStatus = await axios.get(
      `${process.env.API_URL}/payment/${data.payment_id}`,
      config
    );

    res.status(200).json({
      msg: 'resolved successfully',
      data: paymentStatus.data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: 'something went wrong',
    });
  }
});

app.listen(5000, () => {
  console.log('Express server is listening on port 5000!');
});
