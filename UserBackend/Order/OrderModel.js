import mongoose from "mongoose";

class OrderModel{
   constructor(){
    this.schema=new mongoose.Schema({
        user:{type:Object,  required:true},
        address:{type:Object, required:true},
        products:{type:Array,  required:true},
        paymentMethod:{type:String,  required:true, default:"cod"},
        paymentStatus:{type:String,  required:true, default:"pending"},
        delivaryStatus:{type:String,  required:true, default:"pending"},
        totalPrice:{type:Number,  required:true},
        deliverdIn:{type:Date,  required:true}
    },{timestamps:true})
   }
}
const order= new OrderModel();
const order_Model=mongoose.model("tbl_Orders",order.schema)
export default order_Model;
