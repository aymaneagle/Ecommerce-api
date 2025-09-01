import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import {sendOTPtoEmail} from "../utility/mailer.js";
import {generateTokens, verifyOTP} from "../utility/helper.js";
import jwt from "jsonwebtoken";

export const registerUserService = async (email, password) => {
    if (!email || !password) {
        const error = new Error('Email and password is required');
        error.status = 400;
        throw error;
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        const error = new Error('User already exists');
        error.status = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const otp = Math.floor(100000 + Math.random() * 90000);
    const otpExpires = new Date(Date.now() + 10*60*1000);

    const newUser = new UserModel({
        email,
        password: hashedPassword,
        otp,
        otpExpires,
    })

    await newUser.save();

    await sendOTPtoEmail(email, otp);

    return {message: 'registration successful'};
}

export const verifyUserService = async (email, otp) => {
    const user = await UserModel.findOne({email})
    if (!user) {
        const error = new Error('User not found');
        error.status = 400;
        throw error;
    }
    if (!verifyOTP(otp,user)){
        const error = new Error("Invalid or OTP Expired")
        error.statusCode = 400;
        throw error;
    }
    user.otp = undefined;
    user.otpExpires = undefined;
    //////////////
    user.isVerified = true;

    const {accessToken, refreshToken, refreshTokenExpires} = generateTokens(
        user?._id
    );
    user.refreshtokens.push({
        token: refreshToken,
        expiresAt:refreshTokenExpires,
    })
    await user.save()

    return{
        accessToken,
        refreshToken,
        message:"user verified successfully",
    }
}


export const loginUserService = async (email, password) => {
    const user = await UserModel.findOne({email})

    if(!user) {
        const error = new Error('User not found');
        error.status = 400;
        throw error;
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        const error = new Error('Invalid Credentials');
        error.statusCode = 400;
        throw error;
    }
    if(!user.isVerified) {

        const error = new Error ('Please verify your email');
        error.statusCode = 400;
        throw error;
    }
    const {accessToken, refreshToken, refreshTokenExpires} = generateTokens(
        user?._id
    );
    user.refreshtokens.push({
        token: refreshToken,
        expiresAt: refreshTokenExpires,
    });

    await user.save();

    return{
        accessToken,
        refreshToken,
        message:"login successful",
    }
}

// export const refreshAccessTokenService = async (refreshToken) => {
//     if (!refreshToken) {
//         const error = new Error("Refresh Error");
//         error.statusCode = 400;
//         throw error;
//     }
//
//     let decoded;
//     try {
//         decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
//     } catch(err) {
//         const error = new Error('Invalid Credentials');
//         error.statusCode = 400;
//         throw error;
//     }
//
//     const user = await UserModel.findOne({
//         _id: decoded.userId,
//         "refreshtokens.token": refreshToken,
//         "refreshtokens.expiresAt": {$gt: new Date()},
//     });
//
//     if (!user) {
//         const error = new Error('Refresh Expired');
//         error.statusCode = 400;
//         throw error;
//     }
//
//     const {accessToken} = generateTokens(user?._id)
//     return {accessToken};
//
//
//
// }


export const refreshAccessTokenService = async (refreshToken) => {
    let decoded;
    try {
        decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    } catch {
        const error = new Error('Invalid refresh token');
        error.statusCode = 401;
        throw error;
    }
         //console.log(decoded)
    const user = await UserModel.findOne({
        _id: decoded.userId,
        "refreshtokens.token": refreshToken,
        "refreshtokens.expiresAt": { $gt: new Date() },
    });

    if (!user) {
        const error = new Error('Refresh token expired or invalid');
        error.statusCode = 403;
        throw error;
    }

    const { accessToken } = generateTokens(user._id); // only need new access token
    return { accessToken };
};


export const logoutUserService = async (user, refreshToken) => {
    //BUSINESS LOGIC
    //Logout from all devices (global logout)
    //user.refreshtokens = [];
    user.refreshtokens = user.refreshtokens.filter(
        (t) => t.token !== refreshToken
    )

    await user.save();
    return {message: 'logout successfully'};
}