const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('DealBot API is running');
});

app.listen(3000, () => console.log('API running on port 3000'));