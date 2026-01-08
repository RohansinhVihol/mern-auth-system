import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verifyOtp: {
        type: String,
        default: ''
    },
    verifyOtpExpireAt: {
        type: Number,
        default: 0
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    resetOtp: {
        type: String,
        default: ''
    },
    resetOtpExpireAt: {
        type: Number,
        default: 0
    }
},{timestamps: true})

// 'next' ko nikal diya gaya hai
userSchema.pre("save", async function() {

    if (!this.isModified("password")) return; // return karke function exit kar dein

    this.password = await bcrypt.hash(this.password, 10);
    
    // next() ki zaroorat nahi hai, async function apne aap complete ho jayega
});

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateJwtToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.JWT_TOKEN_SECRET,
        {
            expiresIn: process.env.JWT_TOKEN_EXPIRY
        }

    )
}

export const User = mongoose.model("User", userSchema)