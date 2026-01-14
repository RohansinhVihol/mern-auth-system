import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import transporter from "../utils/nodeMailer.js"



const generateJwtTokenForUser = async function (userid) {

    try {
        const user = await User.findById(userid)

        if (!user) {
            throw new ApiError(404, "User not found")
        }

        const token = user.generateJwtToken()

        return token
    }
    catch (error) {
        throw error instanceof ApiError
            ? error
            : new ApiError(500, "Something went wrong while generating token")
    }

}

const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (
        [name, email, password].some((field) => field?.trim === "")) {
        throw new ApiError(400, "All Fields are required ");
    }

    const existedUser = await User.findOne({
        $or: [{ name }, { email }],
    })

    if (existedUser) {
        throw new ApiError(409, "User with this name or email already exist")
    }

    if (password.length < 6) {
        throw new ApiError(400, "Password must be at least 6 characters")
    }

    const registerUser = await User.create({
        name,
        email,
        password
    })

    if (!registerUser) {
        throw new ApiError(500, "Something went wrong while register User")
    }

    const token = await generateJwtTokenForUser(registerUser._id)

    const safeUser = await User.findById(registerUser._id).select("-password")

    const option = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    }



    const mailOption = {
        from: `"Rohan Dev" <${process.env.SENDER_EMAIL}>`,
        to: email,
        subject: 'Welcome to MERN AUTH SITE',
        text: `Welcome to greatstack website. Your account has been created with email id: ${email}`
    }

    try {
        const info = await transporter.sendMail(mailOption);
        console.log("Email sent:", info.response);
    } catch (error) {
        throw new ApiError(500, "Email not sent due to sever issue")
    }


    return res
        .status(201)
        .cookie("token", token, option)
        .json(
            new ApiResponse(201, safeUser, "User register successfully")
        )


})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new ApiError(400, "email and password required")
    }

    const user = await User.findOne({
        email: email.toLowerCase().trim()
    })

    if (!user) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const token = await generateJwtTokenForUser(user._id)

    const option = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    }

    const safeUser = await User.findById(user._id).select("-password")

    return res
        .status(200)
        .cookie("token", token, option)
        .json(
            new ApiResponse(200, safeUser, "User Login Successfully")
        )

})

const logout = asyncHandler(async (req, res) => {

    const option = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/"
    }

    return res
        .status(200)
        .clearCookie("token", option)
        .json(
            new ApiResponse(200, {}, "User Logout successfully")
        )
})

const sendVerifyOtp = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (!user) {
        throw new ApiError(401, "Invalid user credentials")
    }

    if (user.isAccountVerified) {
        throw new ApiError(409, "User Already Verified")
    }

     if (user.verifyOtp && user.verifyOtpExpireAt > Date.now()) {
        throw new ApiError(429, "OTP already sent, please wait")
    }


    const otp = String(Math.floor(100000 + Math.random() * 900000))

    const mailOption = {
        from: `"Rohan Dev" <${process.env.SENDER_EMAIL}>`,
        to: user.email,
        subject: 'Account Verification OTP',
        text: `Your OTP is ${otp}. Verify your account using this OTP.`
    }

    try {
        await transporter.sendMail(mailOption);

   
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000;
        await user.save();

        res.status(200).json(new ApiResponse(200, {}, "Verification OTP Sent on Email"));
    } catch (error) {
        
        throw new ApiError(500, "Failed to send verification email. Please try again.");
    }
});


const verifyEmail = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user?._id)
    const { otp } = req.body

    if (!user) {
        throw new ApiError(404, "Invalid user credentials")
    }

    if (!otp) {
        throw new ApiError(400, "OTP required")
    }

    if (!user.verifyOtp) {
        throw new ApiError(400, "OTP not found")
    }

    
    if (user.verifyOtpExpireAt < Date.now()) {
     
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save();
        throw new ApiError(410, "OTP expired, please request a new one");
    }

    
    user.isAccountVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpireAt = 0;

    await user.save()

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Email Verified successfully")
        )

})

const isAuthenticated = asyncHandler(async (req, res) => {


    return res
        .status(200)
        .json(
            new ApiResponse(200, { user: req.user }, "User Authenticated")
        )
})

const sendPassResetOtp = asyncHandler(async (req, res) => {
    const { email } = req.body

    if (!email) {
        throw new ApiError(400, "Email Required to Send Otp")
    }

    const user = await User.findOne({
        email: email.toLowerCase().trim()
    })

    if (!user) {
        throw new ApiError(404, "User Not Found")
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000))

    const mailOption = {
        from: `"Rohan Dev" <${process.env.SENDER_EMAIL}>`,
        to: user.email,
        subject: 'Password Reset OTP',
        text: `Your OTP for resetting password is ${otp}. Use this OTP to proceed with resetting your password.`
    }

    if (user.resetOtpExpireAt && user.resetOtpExpireAt > Date.now()) {
        throw new ApiError(429, "OTP already sent, please wait")
    }

    try {
        await transporter.sendMail(mailOption)

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000;
        await user.save()

        return res
            .status(200)
            .json(
                new ApiResponse(200, {}, "OTP Sent to your email")
            )

    } catch (error) {
        throw new ApiError(500, "Failed to send verification email. Please try again.");
    }
})

const resetPassword = asyncHandler(async(req, res) => {
    const {email, otp, newPassword} = req.body

    if(!email || !otp || !newPassword){
        throw new ApiError(400, "All Fields are required")
    }

    const user = await User.findOne({
        email: email.toLowerCase().trim()
    })

    if(!user){
        throw new ApiError(404, "User Not Found")
    }

    if (newPassword.length < 6) {
        throw new ApiError(400, "Password must be at least 6 characters")
    }

    if (!user.resetOtp) {
        throw new ApiError(400, "OTP not found")
    }

    
    if (user.resetOtpExpireAt < Date.now()) {
       
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;
        await user.save();
        throw new ApiError(410, "OTP expired, please request a new one");
    }

    if (user.resetOtp !== String(otp)) {
       throw new ApiError(400, "Invalid OTP try again")
    }

    
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    user.password = newPassword;
    await user.save()

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "Passowrd Resetting Sucessfullly Login With New Password")
    )
    
})

export {
    register,
    login,
    logout,
    sendVerifyOtp,
    verifyEmail,
    isAuthenticated,
    sendPassResetOtp,
    resetPassword
}