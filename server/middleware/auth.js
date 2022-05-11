const { User } = require('../models/user');
const jwt = require('jsonwebtoken');

let auth = async(req, res, next) => {
  console.log('inside auth');
    try {
      console.log('inside auth');
      if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
    
        let decodedData;
    
        if (token && isCustomAuth) {      
          decodedData = jwt.verify(token, process.env.SECRET);
    
          if(decodedData.id)
            req.userId = decodedData.id;
        } else {
          decodedData = jwt.decode(token);
    
          if(decodedData.sub)
          req.userId = decodedData.sub;
        }
          next();
      }   else {
        console.log('failed auth');
              res.status(401).json({
              authenticated: false,
              message: "API Call Failed, Unauthorized"
          })
      }
       
      } catch (error) {
        console.log(error);
        
      }
}

module.exports = { auth };