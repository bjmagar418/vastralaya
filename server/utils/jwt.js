import jwt from 'jsonwebtoken';
import config from '../config/config.js';


const createToken = (data) =>{
  //  console.log(data)
var token = jwt.sign(data , config.jwtSecret,{ expiresIn: '30d' });

return token;
//console.log(data,token);
};

const verifyToken = (token) =>{
 return jwt.verify(token,config.jwtSecret);
}
export  default {createToken,verifyToken};