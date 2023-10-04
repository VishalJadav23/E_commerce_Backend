import express from "express"
import userController from "./UserController.js";

const userRouter = express.Router()
//User Api
userRouter.post("/login",userController.UserLogin)
userRouter.post("/registration",userController.registerUser)


export default userRouter