//========================================
//                  SERVER
//========================================
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

//config moongoose
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DATABASE, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true,
    useFindAndModify: false
});


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

//Start Listening
const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Server Running at ${port}`)
})


//========================================
//              MIDDLEWARES
//========================================
const { auth } = require('./middleware/auth');


//========================================
//                  MODELS
//========================================
const { User } = require('./models/user');


//========================================
//                  USERS
//========================================

app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        isAdmin : req.user.role === 0 ? false : true,
        isAuth: true,
        email : req.user.email,
        name : req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart : req.user.cart,
        history : req.user.history
    })
})


app.post('/api/users/register', (req, res) => {
    //create new User
    const user = new User(req.body);

    //save user
    user.save((err, doc) => {
        if(err)
            return res.json({success: false, err});
        res.status(200).json({
            success : true,
        });
    });
})

app.post('/api/users/login', (req, res) => {

    //find the email for the user
    User.findOne({'email' : req.body.email} , (err, user) =>{
        if(!user)
            return res.json({loginSuccess : false, message : 'Authentication failed, email not found'});

        //check the password
        user.comparePassword(req.body.password, (error, isMatch) => {
            if(!isMatch)
                return res.json({loginSuccess : false, message : 'Wrong password'});

            //generate token
            user.generateToken((err, user) => {
                // console.log('generateToken', err, user);
                if(err)
                    return res.status(400).send(err);
                
                //store token as a cookie
                res.cookie('w_auth', user.token).status(200).json({
                        loginSuccess : true
                })
            })
            
        })
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    
    //update user record
    User.findOneAndUpdate(
        { _id : req.user._id},
        { token : ''},
        (err, doc) => {
            if(err)
                return res.json({
                    success: false, 
                    err
                });
            
            return res.status(200).send({
                success : true
            });
        }
    )
});