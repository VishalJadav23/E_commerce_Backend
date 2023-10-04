import productModel from "./ProductModel.js";

// const productsDetails = [
//     {

//         name: 'Slim Shirt',
//         category: 'Shirts',
//         image: '/images/d1.jpg',
//         description: 'Good Quality Product.',
//         countInStock: 34,
//         price: 60,
//         alias: 'Slim_Shirt',
//         brand: ' Nike',
//         rating: 4.5,
//         numReviews: 10
//     },
//     {

//         name: 'Fit Shirt',
//         category: 'Shirts',
//         image: '/images/d2.jpg',
//         price: 50,
//         alias: 'Fit_Shirt',
//         brand: 'Puma',
//         description: 'Good Quality Product.',
//         countInStock: 3,
//         rating: 3.2,
//         numReviews: 5
//     },
//     {

//         name: 'Best Pants',
//         category: 'Pants',
//         image: '/images/d3.jpg',
//         price: 70,
//         description: 'Good Quality Product.',
//         countInStock: 0,
//         alias: 'Best_pants',
//         brand: 'Zudio',
//         rating: 2.5,
//         numReviews: 8
//     }, {

//         name: 'Best Pants',
//         category: 'Pants',
//         image: '/images/p1.jpg',
//         price: 70,
//         alias: 'Best_Pants',
//         brand: 'Diesel',
//         description: 'Good Quality Product.',
//         countInStock: 5,
//         rating: 4.5,
//         numReviews: 8
//     },
//     {

//         name: 'Best Pants',
//         category: 'Pants',
//         alias: 'Best_Pants',
//         image: '/images/p2.jpg',
//         price: 70,
//         brand: 'Branded',
//         rating: 4.6,
//         description: 'Good Quality Product.',
//         countInStock: 4,
//         numReviews: 7
//     },
// ]

class ProductController {

    //  function to insert productsDetails to mongodb 
    // async insertProducts(req, res) {
    //     try {
    //         const result = await productModel.insertMany(productsDetails)//name of data stored constant
    //         if (result) {
    //             return res.status(200).send({ message: "success", result: result })
    //         }
    //         return res.status(500).send({ message: "Something Went Wrong" })
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(500).send({ message: "Internal Server Error" })

    //     }
    // }

    // async insertProduct (req, res) {
    //     try {
    //         const { name, alias, image, description, brand, releventImg, price, category, countInStock } = req.body;
    //         if (!name || !alias || !image || !description || !brand || !releventImg || !price || !category || !countInStock) {
    //             return res.status(400).send({ message: "Bad Request" });
    //         }
    //         const result = await productModel.create(req.body);
    //         if (result) {
    //             return res.status(200).send({ message: "product data submitted successfully" });
    //         }
    //         return res.status(500).send({ message: "Something Went Wrong" });
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(500).send({ message: "Internal Server Error" });

    //     }
    // }

    // async getProduct (req, res) {
    //     try {
    //         let result = await productModel.find().populate({ path: "image" });

    //         if (!result) {
    //             return res.status(500).send({ message: "Something Went Wrong" });
    //         }
    //         if (result) {
    //             result = result.map((product) => {
    //                 if (product.image) {
    //                     const imageURL = product.image.url = `http://localhost:5000${product.image.path}`;
    //                     return {
    //                         ...product._doc, image: {
    //                             ...product.image._doc,
    //                             url: imageURL
    //                         }
    //                     };

    //                 }
    //                 return product._doc;
    //             });
    //             console.log(result);
    //         }
    //         return res.status(200).send({ message: "Success", product: result });

    //     } catch (error) {
    //         return res.status(500).send({ message: "Internal Server Error" });
    //     }
    // }

    // async getProductBYId (req, res) {
    //     try {
    //         const { id } = req.params;
    //         if (!id) {
    //             return res.status(400).send({ message: "Bad Request" });
    //         }
    //         const result = await productModel.findById({ _id: id });
    //         if (result) {
    //             return res.status(200).send({ message: "Success", products: result });
    //         }
    //         return res.status(500).send({ message: "Something Went Wrong" });
    //     } catch (error) {
    //         return res.status(500).send({ message: "Internal Server Error" });
    //     }
    // }

    // async GetCart (req, res) {
    //     try {
    //         const { products } = req.body;
    //         if (!products) {
    //             return res.status(400).send({ message: "Missing Dependency products" });
    //         }
    //         const result = await productModel.find({ _id: products }).select(["name", "price", "countInStock", "brand", "category", "image", "_id"]);
    //         if (!result) {
    //             return res.status(500).send({ message: "something went wrong" });
    //         }
    //         return res.status(200).send({ message: "success", result: result });
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(500).send({ message: "Internal server error " });

    //     }
    // }
}
const productController = new ProductController();

export default productController;
