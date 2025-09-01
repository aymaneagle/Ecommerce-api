import jwt from 'jsonwebtoken';

export const verifyOTP = (otp,user) => {
    const isMatch = user.otp?.toString() === otp?.toString()
    const notExpired = user.otpExpires && user.otpExpires > new Date();
    return isMatch && notExpired;
}





export const generateTokens = (userId) => {
    const accessToken = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '1d'});

const refreshToken = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '30d'});

const refreshTokenExpires = new Date(Date.now() + 30*24*60*60*1000);

return{ accessToken, refreshToken, refreshTokenExpires };
}
