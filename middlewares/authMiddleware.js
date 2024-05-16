// middleware for token compare if token is showed then only show that route
import JWT, { decode } from 'jsonwebtoken';
import userModel from '../models/userModel.js';

//protected route token base
const JWT_SECRET="duwegiud9324@@";// it is random selected by me
//we have written code for logincontroller such that when user login a token is generated
export const requireSignIN=async(req,res,next)=>{
    // ..jb request milega next validate krenge fir response send hoga
    try {
        const decode=JWT.verify(req.headers.authorization,JWT_SECRET);
        req.user=decode;
        next();
    } catch (error) {
        console.log(error);
    }

};

export const isAdmin=async(req,res,next)=>{
    try {
        // const user=await userModel.findById(req.user._id);
        const user=await userModel.findById(req.user._id);
        if(user.role!==1){
            return res.status(401).send({
                success:false,
                message:'unauthorized access',
            })
        }
        else{
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success:'false',
            error,
            message:'error in admin middleware',
        })
    }
}