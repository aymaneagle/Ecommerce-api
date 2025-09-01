import WishModel from "../models/WishModel.js";

import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export const wishListService = async (req) => {
    try{
        const user_id = new ObjectId(req.user) ;
        // console.log(user_id);
        let data = await WishModel.aggregate([
            {$match: {userID: user_id}},

            {$lookup: {from: "products", localField:"productID", foreignField:"_id", as: "product"}},
            {$unwind: "$product"},

            {$lookup: {from: "brands", localField: "product.brandID", foreignField: "_id", as: "brand"},},
            {$unwind: "$brand"},

            {$lookup: {from: "categories", localField: "product.categoryID", foreignField: "_id", as: "category"},},
            {$unwind: "$category"},

            {$project: {
                    _id: 0,
                    "product.categoryID": 0,
                    createdAt: 0,
                    updatedAt: 0,
                    "product.createdAt": 0,
                    "product.updatedAt": 0,
                    "brand.createdAt": 0,
                    "brand.updatedAt": 0,
                    "category.createdAt": 0,
                    "category.updatedAt": 0,


                }}
        ])
        return{ status: "success", data: data }

    }catch(e){
        return {status: "fail", data: e.toString()};
    }
}


export const saveWishListService = async (req) => {
     try{
         let user_id = req.user ;
         let reqBody = req.body;
         await WishModel.updateOne(
             {userID: user_id, productID: reqBody.productID},
             {$set: reqBody},
             {upsert: true}
         )
         return{ status: "success", message: "Wish List Updated Successfully" };
     } catch (e) {
         return {status: "fail", data: e.toString()};
     }
}

export const removeWishListService = async (req) => {
   try {
       let user_id = req.user;
       let reqBody = req.body;
       await WishModel.deleteOne({userID: user_id, productID: reqBody.productID});
       return{ status: "success", message: "Wish List Removed Successfully" };
   } catch(e) {
       return {status: "fail", data: e.toString()};
   }
}