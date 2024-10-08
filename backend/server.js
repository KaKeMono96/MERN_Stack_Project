const express = require('express');
require('dotenv').config();
const morgan = require ('morgan');
const recipesRoutes = require ('./routes/recipes');
const userRoutes = require('./routes/users');
const mongoose = require('mongoose');
const cors = require ('cors');
const cookieParser = require ('cookie-parser');
const AuthMiddleware = require('./middlewares/AuthMiddleware');
const cron = require('node-cron');
const User = require('./models/User');
const sendEmail = require('./helpers/sendEmail');


const app = express();
app.use(express.static('public'));
//const mongoURL = "mongodb+srv://user2:kkmCDZuFS9w1wPeb@mern-cluster.fpos9ft.mongodb.net/?retryWrites=true&w=majority&appName=MERN-cluster";




mongoose.connect(process.env.mongoURL).then(() => {
    console.log('connected to db');

    app.listen(process.env.PORT, () => {
        console.log('app is running on localhost:'+process.env.PORT);
        cron.schedule('*/4 * * * * *',async () => {
            let user = await User.findByIdAndUpdate('662a01dd171f5cda9496d3e',{
                name : "mgmg" + Math.random()
            });
        });
    })
})
.catch(err => {
    console.error('Could not connect to mongodb...', err.message);
    process.exit(1);
})

app.use(cors(
    {
        origin : "http://localhost:5173",
        credentials : true
    }
))
//app.use(cors());// local development-- Warning--
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.set('views','./views');
app.set('view engine','ejs');


app.get('/', (req,res) =>{
    return res.json({hello : 'world'});
})

app.use('/api/recipes',AuthMiddleware,recipesRoutes);
app.use('/api/users', userRoutes);

app.get('/set-cookie', (req,res) => {
    //res.setHeader('Set-Cookie', 'name = KaKeMono');
    res.cookie('name', 'aungaung');
    res.cookie('important-key','value',{httpOnly :true});
    return res.send('cookie already set');
})

app.get('/send-email',async(req,res) => {
    try {
        await sendEmail({
            view :'test',
            data: {
                name : "AungAung"
            },
            from : "mgmg@gmail.com",
            to : "aungaung@gmail.com",
            subject: "Hello AungAung "
        });
        
          return res.send('email already sent');
    }catch(e) {
        return res.status(500).json({
            message : e.message,
            status : 500
        })
    }

    
})

app.get('/get-cookie', (req,res) => {
    let cookies = req.cookies;
    return res.json(cookies);
})



