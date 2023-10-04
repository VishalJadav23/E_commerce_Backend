import productModel from "./ProductModel.js";
import admin_product_category_model from "./Admin_pro_Category.js";

class ProductController {

    async insertProduct (req, res) {
        try {
            const { name, alias, image, description, brand, releventImg, price, category, countInStock } = req.body;
            if (!name || !alias || !image || !description || !brand || !releventImg || !price || !category || !countInStock) {
                return res.status(400).send({ message: "Bad Request for new product" });
            }
            const result = await productModel.create(req.body);
            if (result) {
                return res.status(200).send({ message: "product data submitted successfully" });
            }
            return res.status(500).send({ message: "Something Went Wrong" });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal Server Error" });
        }
    }

    async getProduct (req, res) {
        try {
            let result = await productModel.find().populate({ path: "image" }).populate({ path: "category" }).where('category.name');

            if (!result) {
                return res.status(500).send({ message: "Something Went Wrong" });
            }
            if (result) {
                result = result.map((product) => {
                    if (product.image) {
                        const imageURL = product.image.url = `http://localhost:5000${product.image.path}`;
                        return {
                            ...product._doc, image: {
                                ...product.image._doc,
                                url: imageURL
                            }
                        };

                    }
                    return product._doc;
                });
            }
            return res.status(200).send({ message: "Success", products: result });

        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal Server Error" });
        }
    }

    async deleteProduct (req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).send({ message: "Bad Request" });
            }
            const result = await productModel.deleteOne({ _id: id });
            if (result) {
                return res.status(200).send({ message: "Success" });
            }
            return res.status(500).send({ message: "Something Went Wrong" });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal Server Error" });
        }
    }

    async getProductById (req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).send({ message: "Bad Request" });
            }
            let result = await productModel.findById({ _id: id }).populate({ path: "image" });
            if (result) {
                result = result._doc;
                const image = result.image._doc;
                const path = result.image.path;
                const url = image.url = `http://localhost:5000${path}`;
                result.image.url = url;
                return res.status(200).send({ message: "Success", product: result });
            }
            return res.status(500).send({ message: "Something Went Wrong" });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal Server Error" });
        }
    }


    async editProductDetails (req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            if (!id || !data) {
                return res.status(400).send({ message: "Bad Request" });
            }
            const result = await productModel.updateOne({ _id: id }, data);
            if (result) {
                return res.status(200).send({ message: "Success" });
            }
            return res.status(500).send({ message: "Something Went Wrong" });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal Server Error" });
        }
    }

    async GetCart (req, res) {
        try {
            const { products } = req.body;
            if (!products) {
                return res.status(400).send({ message: "Missing Dependency products" });
            }
            let result = await productModel.find({ _id: products }).select(["name", "price","totalPrice", "countInStock","discount" ,"brand", "category", "image", "_id"]).populate({ path: "image" }).populate({path:"category"});
            if (!result) {
                return res.status(500).send({ message: "something went wrong" });
            }
            if (result) {

                result = result.map((product) => {
                    if (product.image) {
                        const imageURL = product.image.url = `http://localhost:5000${product.image.path}`;
                        return {
                            ...product._doc, image: {
                                ...product.image._doc,
                                url: imageURL
                            }
                        };

                    }
                    return product._doc;
                });
              
            }
            return res.status(200).send({ message: "success", result: result });

        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal server error " });

        }
    }

    async createProductCategory (req, res) {
        try {
            const result = await admin_product_category_model.create(req.body);
            if (!result) return res.status(500).send({ message: "Something went wrong" });
            return res.status(200).send({ message: "Success" });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server error" });
        }
    }

    async getProductCategory (req, res) {
        try {
            const result = await admin_product_category_model.find();
            if (!result) return res.status(500).send({ message: "Something went wrong" });
            return res.status(200).send({ message: "Success", data: result });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server error" });
        }
    }

    async deleteProductCategory (req, res) {
        try {
            const { id } = req.params;
            const result = await admin_product_category_model.deleteOne({ _id: id });
            if (!result) return res.status(500).send({ message: "Something went wrong" });
            return res.status(200).send({ message: "Success" });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal server error" });
        }
    }
    async updateProductCategory (req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const result = await admin_product_category_model.updateOne({ _id: id }, data);
            if (!result) return res.status(500).send({ message: "Something went wrong" });
            return res.status(200).send({ message: "Success" });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal server error" });
        }
    }
    async findProductCategoryById (req, res) {
        try {
            const { id } = req.params;
            const result = await admin_product_category_model.findById({ _id: id });
            if (!result) return res.status(500).send({ message: "Something went wrong" });
            return res.status(200).send({ message: "Success", category: result });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal server error" });
        }
    }


}
const Admin_productController = new ProductController();

export default Admin_productController;
