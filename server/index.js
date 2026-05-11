import express from 'express';

const app = express();
const PORT = 5005;

app.get('/', (req, res) => {
  res.send('Vastralaya Server is Running with ES Modules!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});