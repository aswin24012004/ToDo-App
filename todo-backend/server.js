const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todos');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = 5000 || process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/todos', todoRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
