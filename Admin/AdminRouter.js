import express from "express";
import media_controller from "./Media/AdminMediaController.js";
import user_Controller from "./Admin_User/AdminUserController.js";
import Admin_ProductRouter from "./Admin_Product/Admin_ProductRouter.js";

const AdminRouter = express.Router();
//media Api
AdminRouter.post("/upload/file", media_controller.createMedia);
AdminRouter.get("/fetch/media", media_controller.getmedia);

//User Api
AdminRouter.post("/user/create", user_Controller.regiUser);
AdminRouter.get("/user/delete/:id", user_Controller.deleteUser);
AdminRouter.post("/user/login", user_Controller.loginUser);
AdminRouter.get("/user/read", user_Controller.getUser);
AdminRouter.put("/user/update/:id", user_Controller.updateUser);

AdminRouter.use("/product", Admin_ProductRouter);

export default AdminRouter;
