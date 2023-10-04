import bcrypt from "bcrypt";
import user_Model from "./AdminUserModel.js";

class userController {
  async regiUser (req, res) {
    try {
      const { firstName, lastName, email, password, role } = req.body;
      if (!firstName)
        return res
          .status(400)
          .send({ message: "Missing Dependency FirstName" });
      if (!lastName)
        return res.status(400).send({ message: "Missing Dependency lastName" });
      if (!email)
        return res.status(400).send({ message: "Missing Dependency email" });
      if (!password)
        return res.status(400).send({ message: "Missing Dependency password" });
      if (!role)
        return res.status(400).send({ message: "Missing Dependency role" });

      let paswd = req.body.password;
      const encodedPassword = bcrypt.hashSync(paswd, 8);
      req.body.password = encodedPassword;
      const result = await user_Model.createUser(req.body);
      if (!result)
        return res.status(500).send({ message: "Something went wrong" });
      let user = result._doc;
      delete user.password;

      return res.status(200).send({ message: "Success", user });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal server Error" });
    }
  }

  async getUser (req, res) {
    try {
      const result = await user_Model.findUser();
      console.log(result)
      if (!result)
        return res.status(500).send({ message: "Something went wrong" });
      return res.status(200).send({ message: "Success", user: result });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal server error" });
    }
  }

  async updateUser (req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(401).send({ message: "Bad request" });
      const result = await user_Model.editUser(id, req.body);
      if (!result)
        return res.status(500).send({ message: "Something went wrong" });
      return res.status(200).send({ message: "Success" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal server Error" });
    }
  }

  async deleteUser (req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).send({ message: "Bad Request" });
      const result = await user_Model.deleteUser(id);
      if (!result)
        return res.status(500).send({ message: "Something went wrong" });
      return res.status(200).send({ message: "Success" });
    } catch (error) {
      return res.status(500).send({ message: "Internal server error" });
    }
  }

  async loginUser (req, res) {
    try {
      const { email, password } = req.body;
      if (!email)
        return res.status(400).send({ message: "missing dependecy email" });
      if (!password)
        return res.status(400).send({ message: "missing dependecy password" });
      const result = await user_Model.loginUser(email);

      if (!result)
        return res.status(500).send({ message: "Something went wrong" });
      if (result && result.password) {
        const verify = bcrypt.compareSync(password, result.password);
        if (verify === true) {
          return res.status(200).send({ message: "Success" ,user:result});

        }
        return res.status(500).send({ message: "User password Does Not match" });
      }
      return res.status(500).send({ message: "User Does Not exist" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal server error" });
    }
  }
}

const admin_user_Controller = new userController();
export default admin_user_Controller;
