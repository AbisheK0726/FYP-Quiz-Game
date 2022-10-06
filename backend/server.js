const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/questions', require('./routes/questionRoutes'));
app.use('/api/subjects', require('./routes/subjectRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/rooms', require('./routes/roomRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server on port ${port}`));
