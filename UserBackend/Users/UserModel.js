import mongoose from "mongoose"

class UserModel {
    constructor() {
        this.Schema = mongoose.Schema({
            firstName: { type: String, length: 20, require: true },
            lastName: { type: String, length: 20, require: true },
            email: { type: String, unique: true, require: true },
            phone: { type: String, default: null, length: 10, require: true },
            password: { type: String, require: true },
            isAdmin: { type: Boolean, require: true, default: false }
        }, {
            timestamp: true
        })
    }
}
const user = new UserModel()
const userModel = mongoose.model("tbl_users", user.Schema)
export default userModel