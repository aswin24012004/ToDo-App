const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todos');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/todos', todoRoutes);
const url = process.env.MONGO_URI || 'mongodb://localhost:27017/todoapp';
// If you want to use a local MongoDB instance, you can replace the above line with:
// const url = 'mongodb://localhost:27017/todoapp';
// If you want to use a cloud MongoDB instance, you can set the MONGO_URI in your .env file.
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
console.log('Hello');
