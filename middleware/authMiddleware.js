import jwt from 'jsonwebtoken'
import User from '../models/User.js';


const verifyUser = async (req,res,next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // means jo bearear likhe hai uske baad me jo token hai is liye split likhe h
    if(!token){
      return res.status(404).json({success:false, error : "Token Nhi hai bhai"})
    } 

    const decoded =jwt.verify(token,process.env.JWT_KEY)
    if(!decoded){
       return res
         .status(404)
         .json({ success: false, error: "Token Not valid"});
    }

    const user = await User.findById({_id: decoded._id}).select('-password')
    if(!user){
      return res.status(404).json({ success: false, error: "user not found" });
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(500).json({ success: false, error: "server side error" });
  }
}

export default verifyUser