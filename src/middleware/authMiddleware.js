import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';
export const auth = async (req, res, next) => {
    try{
        const accessToken= req.cookies.accesstoken

        if(!accessToken){
            const error = new Error('Invalid authorization header');
            error.status = 400;
            throw error;
        }

        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        const user = await UserModel.findById({_id: decoded.userId});


        if(!user){
            const error = new Error('User not found');
            error.status = 400;
            throw error;
        }
        if (!user.isVerified){
            const error = new Error("Please verify your Email")
            error.status = 400;
            throw error;
        }
        req.user = user;

        next();

    } catch(error) {
        res.status(401).json({message: 'Unauthorized'});
    }

}