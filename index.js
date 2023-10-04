import express, { json } from "express";
import cors from "cors";
import { } from "dotenv/config.js";
import connectDB from "./Common/Connection.js";
import fileUpload from "express-fileupload";
import userRouter from "./UserBackend/Users/UserRouter.js";
import AdminRouter from "./Admin/AdminRouter.js";
import orderRouter from "./UserBackend/Order/OrderRouter.js";

const app = express()
connectDB()

app.use(cors())
app.use(json())
app.use(fileUpload());
app.use("/Admin/Media/uploads",express.static("./Admin/Media/uploads"))

app.get("/", (req, res) => {
    return res.status(200).send({ message: "success!" })
})

app.use("/user",userRouter)
app.use("/admin",AdminRouter)
app.use("/order",orderRouter)

app.listen(process.env.PORT, () => {
    console.log("backend server started!");
})
