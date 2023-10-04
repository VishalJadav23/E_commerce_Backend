import order_Model from "./OrderModel.js";
import Razorpay from "razorpay";

function CreateRazorpayOrder(options) {
  return new Promise((resolve, reject) => {
    var instance = new Razorpay({
      key_id: process.env.API_KEY_ID,
      key_secret: process.env.API_KEY_SECRET_,
    });

    instance.orders.create(options, (err, order) => {
      if (err) return reject(err);
      resolve(order);
    });
  });
}

class paymentHandler {
  createOrder = async (req, res) => {
    try {
      const { products, userInfo, shippingAddress, paymentMethod, totalPrice } =
        req.body;

      if (!products || products.length <= 0) {
        return res.status(400).send({ Message: "Missing Dependency Product" });
      }

      if (!userInfo) {
        return res.status(400).send({ Message: "Missing Dependency user" });
      }
      if (!shippingAddress) {
        return res.status(400).send({ Message: "Missing Dependency address" });
      }

      let deliveryIn = new Date();
      deliveryIn.setDate(deliveryIn.getDate() + 5);

      let orderDetails = {
        products: products,
        user: userInfo,
        paymentMethod: paymentMethod,
        price: totalPrice,
        totalPrice: totalPrice,
        address: shippingAddress,
        deliverdIn: deliveryIn,
      };

      let order = await order_Model.create(orderDetails);

      order = { ...order._doc, RazorpayDetails: null };
      if (paymentMethod === "cod") {
        if (!order)
          return res.status(500).send({ message: "Something went wrong" });
        return res.status(200).send({ message: "success", order });
      } else {
        const options = {
          amount: totalPrice * 100,
          currency: "INR",
          receipt: "receipt_id_" + order._id,
        };
        const RazorpayResult = await CreateRazorpayOrder(options);
        if (!RazorpayResult)
          return res.status(500).send({ message: "something went wrong" });
        order = {
          ...order,
          RazorpayDetails: {
            ...RazorpayResult,
            apikey: process.env.API_KEY_ID,
          },
        };
        return res.status(200).send({ message: "success", order });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ Message: "internal Server Error" });
    }
  };

  // async orderS(req, res) {
  //   try {
  //     const result = await order_Model.find({
  //       "user._id": req.body.userInfo._id,
  //     });
  //     if (result) {
  //       return res.status(200).send({ message: "Sucess", products: result });
  //     }
  //     return res.status(500).send({ message: "Something went wrong" });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).send({ message: "Internal server error" });
  //   }
  // }

  async orderItembyId(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).send({ message: "Bad Request" });
      }
      const result = await order_Model.findById({ _id: id });
      if (result) {
        return res.status(200).send({ message: "success", product: result });
      }
      return res.status(500).send({ message: "something went wrong" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal server error" });
    }
  }

  async verifyPayment(req, res) {
    try {
      const { orderId, RazorpayOrderId, paymentId } = req.body;
      const instance = new Razorpay({
        key_id: process.env.API_KEY_ID,
        key_secret: process.env.API_KEY_SECRET_,
      });
      const result = await instance.payments.fetch(paymentId);

      if (result.status === "authorized" || result.status === "captured") {
        let update = await order_Model.updateOne(
          { _id: orderId },
          { paymentStatus: "verify" }
        );
        if (!update || update.modifiedCount <= 0)
          return res.status(500).send({ message: "something went wrong" });
        return res.status(200).send({ message: "success", orderId: orderId,RazorpayOrderId:RazorpayOrderId });
      }

      const update = await order_Model.findOne(
        { _id: orderId },
        { paymentStatus: "Rejected" }
      );
      if (!update || update.matchedCount <= 0) {
        return res.status(500).send({ message: "Something Went wrong" });
      }
      return res.status(400).send({ message: "Payment verification Failed" });
    } catch (error) {
      return res.status(500).send({ message: "Internal server Error" });
    }
  }
}

const OrderController = new paymentHandler();
export default OrderController;
