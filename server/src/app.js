import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";


const app = express();

const allowedOrigins = [process.env.ALLOWED_ORIGIN ] 

app.use(cors({
    origin: allowedOrigins,
    credentials : true,
}))

app.use(express.json({limit :"16kb"}))

app.use(express.urlencoded({
    extended : true,
    limit : "16kb"
}))

app.use(express.static("public"))


app.use(cookieParser())
app.get("/", (req,res)=>{
    res.send("hello")
})

import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"


app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.use(errorHandler);

export {app}