const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const app = express();
const { errorHandler } = require('./middleware/errorMiddleWare');
const goalRoutes = require('./routes/goalsRoutes');



app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use('/api/goals', goalRoutes)
app.use(errorHandler);


app.listen(PORT, ()=> console.log(`Server started on PORT ${PORT}`));
