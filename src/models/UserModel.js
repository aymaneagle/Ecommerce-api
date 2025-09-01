import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema(
    {
    email: {type : String, required : true, unique : true},
        password: {type : String, required : true},
        otp: String,
        otpExpires : Date,
        isVerified : {type: Boolean, default: false},
        refreshtokens : [
            {
                token: {type: String, required: true},
                expiresAt: {type: Date, required: true},
            },
        ],

},
    {
        timestamps: true,
        versionKey: false,
    }
)
const UserModel = mongoose.model('users', DataSchema);
export default UserModel;