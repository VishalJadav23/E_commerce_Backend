import userModel from "./UserModel.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import validation from "./Validation.js";

class UserController {

    async registerUser (req, res) {
        try {
            const validationResult = validation(req.body, "register");
            if (validationResult.length > 0) {
                return res.status(400).send({ message: "validation Error", validationResult: validationResult });
            }

            const { password } = req.body;
            const EncodePassword = bcrypt.hashSync(password, 8);
            if (!EncodePassword) {
                return res.status(500).send({ message: "Somthing went wrong" });
            }

            req.body.password = EncodePassword;

            const result = await userModel.create(req.body);
            if (!result) {
                return res.status(500).send({ message: "Somthing went wrong" });
            }

            let user = result._doc;
            delete user.password;
            const token = Jwt.sign(user, process.env.JWT_SECRETE, { expiresIn: "30d" });
            if (!token) {
                return res.status(500).send({ message: "Something Went Wrong" });
            }
            user.token = token;
            // delete user.confirmPasword;
            return res.status(200).send({ message: "Success", user });

        } catch (error) {
            console.log(error);
            if (error && error.message && error.message.includes("E11000")) {
                return res.status(400).send({ message: "validation Error", validationResult: [{ key: "email", message: "Email is Already exist" }] });
            }
            return res.status(400).send({ message: "Internel Server Error" });
        }
    }
    async UserLogin (req, res) {
        try {
            const { email, password } = req.body;
            if (!email) return res.status(400).send({ message: "Missing Dependency Email" });
            if (!password) return res.status(400).send({ message: "Missing Dependency password" });
            const validationResult = validation(req.body, "login");
            if (validationResult.length > 0) {
                return res.status(400).send({ message: "Validation Error", validationResult: validationResult });

            }

            const result = await userModel.findOne({ email: email });
            if (!result) {
                return res.status(400).send({ message: "validation Error", validationResult: [{ key: "email", message: "Email Not Found" }] });

            }

            const user = result._doc;

            if (!(bcrypt.compareSync(password, user.password))) {
                return res.status(400).send({ message: "validation Error", validationResult: [{ key: "password", message: "Email and password Not Found" }] });

            }//when password miss match


            delete user.password;

            const token = Jwt.sign(user, process.env.JWT_SECRETE, { expiresIn: "30d" });
            if (!token) {
                return res.status(500).send({ message: "Something Went Wrong in Token" });
            }

            user.token = token;

            return res.status(200).send({ message: "Success", user: user });

        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "internal server Error" });
        }
    }
}
const userController = new UserController();
export default userController;
