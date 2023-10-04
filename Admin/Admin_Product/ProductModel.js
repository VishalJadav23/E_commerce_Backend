import mongoose from "mongoose";

class ProductModel {

    constructor() {
        this.schema = new mongoose.Schema({
            name: { type: String, required: true },
            alias: { type: String, required: true, unique: true },
            brand: { type: String, required: true },
            description: { type: String, required: true },
            releventImg: { type: Array, required: true },
            price: { type: Number, required: true },
            totalPrice: { type: Number, required: true },
            discount: { type: Number, default: null },
            category: { type:mongoose.Types.ObjectId, ref:"tbl_product_category", required: true },
            image: { type: mongoose.Schema.Types.ObjectId, ref: "tbl_medias", required: true },
            countInStock: { type: Number, required: true },
            // numReviews: { type: Number, require: true },
            rating: { type: Number, default: null },

        });

    }
}
const product = new ProductModel();
const productModel = mongoose.model("tbl_products", product.schema);//create folder (tbl_product) in mongodb and insert data in this formate 
export default productModel;
