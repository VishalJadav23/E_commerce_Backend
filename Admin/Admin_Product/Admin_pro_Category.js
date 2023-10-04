import mongoose from "mongoose";

class category_Product_model {
    constructor() {
        this.schema = mongoose.Schema({
            name: { type: String, required: true },
            alias: { type: String, required: true, unique: true },
        });
    }
}

const pro_cat=new category_Product_model()
const admin_product_category_model=mongoose.model("tbl_product_category",pro_cat.schema)
export default admin_product_category_model
