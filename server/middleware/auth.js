import jwt from "../utils/jwt.js";

const auth = (req,res,next) =>{
   const cookie = req.headers.cookie;
   if (!cookie) return res.status(401).send("User not authenticated");

  const token = cookie.split("=")[1];
 // console.log(token);
 if(!token) {
   return res.status(401).send("User not authenticated");
 }

 try{
const data = jwt.verifyToken(token);

req.user = data; // Attach user data to the request object for later use
 } catch(error){
   return res.status(401).send("User not authenticated");
 }
 next();
}
export default auth;