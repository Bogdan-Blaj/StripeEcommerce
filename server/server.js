//========================================
//                  SERVER
//========================================
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');


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


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Start Listening
const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Server Running at ${port}`)
})


//========================================
//              MIDDLEWARES
//========================================
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');


//========================================
//                  MODELS
//========================================
const { User } = require('./models/user');
const { Category } = require('./models/category');
const { Platform } = require('./models/platform');
const { Product } = require('./models/product');
const { Type } = require('./models/type');

//========================================
//                  USERS
//========================================

app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    })
})

const signUp = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
      const oldUser = await User.findOne({ email });
  
      if (oldUser) return res.status(400).json({ success : false, message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const result = await User.create({ email, password: hashedPassword, firstName: `${firstName}`, lastName: `${lastName}` });
  
      const token = jwt.sign( { email: result.email, id: result._id }, process.env.SECRET, { expiresIn: "7d" } );
  
    //   res.status(201).json({ result, token });
      res.status(201).json({ success : true, result :{ name : result.firstName,
        lastName: result.lastName,
        email: result.email,
        token }});
    } catch (error) {
      res.status(500).json({success : false, message: "Something went wrong" });
      
      console.log(error);
    }
  };

  const signIn = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const oldUser = await User.findOne({ email });

      if (!oldUser) return res.status(404).json({ loginSuccess : false, message: "User doesn't exist" });

      const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
      if (!isPasswordCorrect){ 
          return res.status(400).json({ loginSuccess : false, message: "Invalid credentials" });
        }
  
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, process.env.SECRET, { expiresIn: "7d" });
  
    //   res.status(200).json({ result: oldUser, token });
      res.status(200).json({ loginSuccess : true, 
        result :{
            name : oldUser.firstName, 
            lastName: oldUser.lastName,
            email: oldUser.email,},
        token 
    });
    } catch (err) {
      res.status(500).json({ loginSuccess : false, message: "Something went wrong" });
    }
  };
app.post('/api/users/register', (req, res) => {
    return signUp(req,res);
});

app.post('/api/users/login', (req, res) => {
    return signIn(req,res);
});

app.get('/api/users/testToken', auth, (req, res) => {
    console.log('passed auth');
    const data = req.body;
    try {
        res.status(200).json({
            authenticated: true,
            message: "API Call Succesfull"
        })
    } catch (error) {
        res.status(500).json({
            authenticated: false,
            message: "API Call Failed"
        })
    }
})

app.get('/api/users/logout', auth, (req, res) => {

    //update user record
    User.findOneAndUpdate(
        { _id: req.user._id },
        { token: '' },
        (err, doc) => {
            if (err)
                return res.json({
                    success: false,
                    err
                });

            return res.status(200).send({
                success: true
            });
        }
    )
});


//========================================
//                CATEGORY
//========================================
app.post('/api/product/category', auth, admin, (req, res) => {
    const category = new Category(req.body);

    category.save((err, doc) => {
        if (err)
            return res.json({
                success: false,
                err
            });
        res.status(200).json({
            success: true,
            category: doc
        })
    })
});

app.get('/api/product/category', (req, res) => {
    Category.find({}, (err, category) => {
        if (err)
            return res.status(400).send(err);

        return res.status(200).send(category);
    })
})

//========================================
//               PLATFORM
//========================================
app.post('/api/product/platform', auth, admin, (req, res) => {
    const platform = new Platform(req.body);

    platform.save((err, doc) => {
        if (err)
            return res.json({
                success: false,
                err
            });
        res.status(200).json({
            success: true,
            platform: doc
        })
    })
})


app.get('/api/product/platform', (req, res) => {
    Platform.find({}, (err, platform) => {
        if (err)
            return res.status(400).send(err);

        return res.status(200).send(platform);
    })
})



//========================================
//                  TYPE
//========================================
app.post('/api/product/type', auth, admin, (req, res) => {
    const type = new Type(req.body);

    type.save((err, doc) => {
        if (err)
            return res.json({
                success: false,
                err
            });
        res.status(200).json({
            success: true,
            type: doc
        })
    })
})


app.get('/api/product/type', (req, res) => {
    Type.find({}, (err, type) => {
        if (err)
            return res.status(400).send(err);

        return res.status(200).send(type);
    })
})


//========================================
//                PRODUCTS
//========================================


//edit article
app.patch('/api/product/articles', auth, admin,  (req, res) => {
    let id = req.body._id;
    console.log(req.body);
    Product.findOneAndUpdate({ '_id': id },
        {
            "$set": req.body
        },
        { new: true },
        (err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true,
                data : doc
            })
        }
    );
});

//By Arrival + Sort
// /articles?sortBy=createdAt&order=desc&limit=100

//BY SELL
// /articles?sortBy=sold&order=desc&limit=4
app.get('/api/product/articles', (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Product.
        find().
        populate('category').
        populate('platform').
        populate('type').
        sort([[sortBy, order]]).
        limit(limit).
        exec((err, articles) => {
            if (err)
                return res.status(400).send(err);
            res.send(articles);
        })
});

// /api/product/article?id=something,somethingElse&type=single
app.get('/api/product/articles_by_id', (req, res) => {
    // check if type is array or single (we are searching for 1 or more products)
    //this can be used because we are using bodyParser and have urlencoded
    let type = req.query.type;
    let items = req.query.id;

    if (type === "array") {
        //get the ids
        let ids = req.query.id.split(',');
        //convert to array
        items = [];
        items = ids.map(item => {
            return mongoose.Types.ObjectId(item)
        })
    }

    Product.
        find({ '_id': { $in: items } }).
        populate('category').
        populate('platform').
        populate('type').
        exec((err, docs) => {
            return res.status(200).send(docs)
        })
});

app.post('/api/product/article', auth, admin, (req, res) => {
    const product = new Product(req.body);

    product.save((err, doc) => {
        if (err)
            return res.json({
                success: false,
                err
            });
        res.status(200).json({
            success: true,
            article: doc
        })
    })
})