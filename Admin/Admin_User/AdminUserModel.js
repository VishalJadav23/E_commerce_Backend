import mongoose from "mongoose";

class UserModel {
  constructor() {
    this.schema = new mongoose.Schema(
      {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, required: true },
      },
      { timestamps: { type: String, required: true } }
    );
    this.user = mongoose.model("admin_Users", this.schema);
  }
  async createUser(user) {
    return await this.user.create(user);
  }

  async findUser() {
    return await this.user.find();
  }

  async deleteUser(id) {
    return await this.user.deleteOne({ _id: id });
  }

  async editUser(id, data) {
    return await this.user.updateOne({ _id: id }, data);
  }

  async loginUser(email) {
    return await this.user.findOne({ email });
  }
}
const Admin_user_Model = new UserModel();
export default Admin_user_Model;
