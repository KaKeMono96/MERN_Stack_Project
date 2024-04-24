const express = require('express');
require('dotenv').config()
const morgan = require ('morgan')
const recipesRoutes = require ('./routes/recipes');
const userRoutes = require('./routes/users');
const mongoose = require('mongoose');
const cors = require ('cors');
const cookieParser = require ('cookie-parser');

const app = express();
const mongoURL = "mongodb+srv://yuki:test123@mern-cluster.fpos9ft.mongodb.net/?retryWrites=true&w=majority&appName=MERN-cluster"

mongoose.connect(mongoURL).then(() => {
    console.log('connected to db');
    app.listen(process.env.PORT, () => {
        console.log('app is running on localhost:'+process.env.PORT);
    })
})

app.use(cors(
    {
        origin : "http://localhost:5173",
        credentials : true
    }
))
//app.use(cors());// local development-- Warning--
app.use(express.json());
app.use(morgan('dev'))
app.use(cookieParser())

app.get('/', (req,res) =>{
    return res.json({hello : 'world'});
})

app.use('/api/recipes',recipesRoutes)
app.use('/api/users', userRoutes)

app.get('/set-cookie', (req,res) => {
    //res.setHeader('Set-Cookie', 'name = KaKeMono');
    res.cookie('name', 'aungaung');
    return res.send('cookie already set');
})

app.get('/get-cookie', (req,res) => {
    let cookies = req.cookies;
    return res.json(cookies);
})

