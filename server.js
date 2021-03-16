require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
// path setup for diployment production
const path =require('path');


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true,
}));


// Routes
app.use('/user', require('./routes/userRouter'));
app.use('/api', require('./routes/categoryRouter'));
app.use('/api', require('./routes/upload'));
app.use('/api', require('./routes/productRouter'));

// payment api
app.use('/api', require('./routes/paymentRouter'));





// connect to mongoo
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log('Connected mongodb name "ecommerce"');
});

// path setup for diployment & production
// rule of client & server start by one 
if(process.env.NODE_END === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}


app.get('/', (req, res) => {
    res.json({
        msg: 'Node is running, its good'
    })
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port->', PORT);
});

