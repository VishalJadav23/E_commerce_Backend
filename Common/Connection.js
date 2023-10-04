import mongoose from "mongoose";

const connectDB=()=>{
    try {
        mongoose.connect("mongodb://127.0.0.1:27017/amazon")
        console.log("DB Connected Success");
    } catch (error) {
        console.log(error)
        console.log("DB Connection Loss");
        
    }
}

export default connectDB
