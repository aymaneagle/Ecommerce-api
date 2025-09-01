import CartModel from "../models/CartModel.js";
import res from "express/lib/response.js";
import mongoose from "mongoose";

export const saveCartListService = async (req) => {
   try{
       let user_id = req.user;
       let reqBody = req.body;
       await CartModel.create({userID: user_id,
           ...reqBody})
       return {status: "success", message: "Cart successfully created"};
   } catch (e) {
       return {status: "fail", data: e.toString()};
   }
}

export const updateCartListService = async (req) => {
    try {
        let user_id = req.user;
        let reqBody = req.body;
        let cartID = req.params.cartID

        const data = await CartModel.updateOne(
            {userID: user_id , _id: cartID},
            {$set: reqBody}
        )
        return {status: "success", message: "Cart successfully updated"};
    } catch(e) {
        return {status: "fail", data: e.toString()};
    }
}

export const removeCartListService = async (req) => {
    try{
        let user_id = req.user;
        await CartModel.deleteOne({userID: user_id})
        return {status: "success", message: "Cart successfully deleted"};
    } catch (e) {
        return {status: "fail", data: e.toString()};
    }
}

export const cartListService = async (req) => {
    try{
        let user_id = new mongoose.Types.ObjectId(req.user);

        let data = await CartModel.aggregate([
            {$match: {userID: user_id}},

            {$lookup: {from: "products", localField: "productID", foreignField: "_id", as: "product"},},
            {$unwind: "$product"},

            {$lookup: {from:"brands", localField:"product.brandID", foreignField: "_id", as: "brand"},},
            {$unwind: "$brand"},

            {$lookup: {from: "categories", localField:"product.categoryID", foreignField: "_id", as: "category"},},
            {$unwind: "$category"},

            {$project: {
                    createdAt: 0,
                    updatedAt: 0,
                    "product.createdAt": 0,
                    "product.updatedAt": 0,
                    "brand.createdAt": 0,
                    "brand.updatedAt": 0,
                    "category.createdAt": 0,
                    "category.updatedAt": 0,
                } },
        ])
        return {status: "success", data: data};
    } catch (e) {
        return {status: "fail", data: e.toString()};
    }
}