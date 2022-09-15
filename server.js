const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

// server needs db configurations
require('./server/config/mongoose.config'); 

// get the app (express) to use middlewear and cross origin resource
app.use(cors());
app.use(express.json()); // This is new
app.use(express.urlencoded({ extended: true })); // This is new

// server needs routes/endpoints
require('./server/routes/record.routes')(app);


app.listen(port, () => {
    console.log(`listening at port ${port}`);
})
