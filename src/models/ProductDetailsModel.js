import mongoose from "mongoose";

const DataSchema = mongoose.Schema({
    image1: { type: String, required: true },
    image2: { type: String, required: true },
    image3: { type: String, required: true },
    image4: { type: String, required: true },
    image5: { type: String},
    image6: { type: String},
    image7: { type: String},
    desc: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    productID: { type: mongoose.Schema.Types.ObjectId},

    },
    {
        timestamps: true,
        versionKey: false,
    }
);
const ProductDetailsModel = mongoose.model("ProductDetails", DataSchema);
export default ProductDetailsModel;