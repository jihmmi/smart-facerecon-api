const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
//const knex = require('knex');
const db = require('./knex/knex.js');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image.js');


const PORT = process.env.PORT || 3002;

// console.log(`environment ${process.env.ENVIRONMENT}`);

//  db.select('*').from('users').then(data => {
//        console.log(data)
//    });

const app = express();


//app.use(express.urlencoded);
app.use(express.json());
app.use(cors());

app.get('/',(req,res) => {
    res.json('success');

})

app.post('/signin',(req,res) => { signin.handleSignin(req,res,db,bcrypt) });

app.post('/register',(req,res) => { register.handleRegister(req,res,db,bcrypt) });

app.get('/profile/:id',(req,res) =>{ profile.handleProfileGet(req,res,db) });

app.put('/image',(req,res) =>{ image.handleImage(req,res,db)});

app.post('/imageurl',(req,res) =>{ image.handleApiCall(req,res)});

app.listen(PORT,()=>{
    // console.log(`app is running on port ${PORT} HOST ${process.env.DB_HOST} ${process.env.DB_USER_NAME}`);
    console.log(`app is running on port ${PORT} `);
    //console.log(`app is running on port ${JSON.stringify(process.env,null,4)} `);
});

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


/*
with post use body
with put use body
with get use params , if /profile/:id or /route/:param1
*/