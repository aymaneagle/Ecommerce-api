import BrandModel from "../models/BrandModel.js";
import CategoryModel from "../models/CategoryModel.js";
import ProductSliderModel from "../models/ProductSliderModel.js";
import ProfileModel from "../models/ProfileModel.js";
import e from "express";
// import {ObjectId} from "mongodb";
import ProductModel from "../models/ProductModel.js";
import mongoose from "mongoose";
import ReviewModel from "../models/ReviewModel.js";

const ObjectId = mongoose.Types.ObjectId;


export const brandListService = async () => {

    try{
        const data = await BrandModel.find();
        return {status: "success", data}
    } catch (e) {
        return {status: "fail", data: e.toString() }
    }
}

export const createBrandService = async (req) => {
    try {
        const body = req.body;
        const data = {
            brandName: body.name,
            brandImage: body.image,
        };

        const createBrand = await BrandModel.create(data);
        return { status: "success", data: createBrand };
    } catch (error) {
        return { status: "fail", data: error.toString() };
    }
};

export const categoryListService = async (req) => {
    try {
        const data = await CategoryModel.find();
        return {status: "success", data}
    } catch(e) {
        return {status: "fail", data: e.toString() }
    }
}

export const sliderListService = async (req) => {
    try{
        const data = await ProductSliderModel.find();
        return {status: "success", data}
    } catch(e) {
        return {status: "fail", data: e.toString() }
    }
}

export const productListByBrandService = async (req) => {
    try{
        const brandID = new ObjectId(req.params.brandID);

        const data = await ProductModel.aggregate([
            {$match: { brandID:  brandID}},
            {$lookup: {
                from: "brands",
                    localField: "brandID",
                    foreignField: "_id",
                    as: "brand",
                 },
            },

            {
                $lookup: {
                from: "categories",
                localField: 'categoryID',
                foreignField: "_id",
                as: "category",
                 },
            },
            {$unwind: "$brand"},
            {$unwind: "$category"},
            {
                $project: {

                    "category._id": 0,
                    "image": 0,
                    "brand.brandImg": 0,
                },
            },
        ])
        return {status: "success", data};

    } catch (e) {
        return {status: "fail", data: e.toString() }
    }
}


export const productListByCategoryService = async (req) => {
   try{
       const categoryID = new ObjectId(req.params.categoryID);
       const data = await ProductModel.aggregate([
           {$match: { categoryID: categoryID}},

           {$lookup: {from: "categories", localField: "categoryID", foreignField: "_id",as: "category"},},
           {$lookup: {from: "brands", localField: "brandID", foreignField: "_id",as: "brand"},},

           {$unwind: "$category"},
           {$unwind: "$brand"},

           {$project: {
               "brand._id": 0,
               }}

       ])
       return {status: "success", data};


   } catch {
       return {status: "fail", data: e.toString() }
   }
}

export const productListBySimilarService = async (req) => {
    try{
        const categoryId = new ObjectId(req.params.categoryId);
        const data = await ProductModel.aggregate([
            {$match: {categoryID: categoryId}},
            // {$limit: 3},

            {$lookup:{from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}},

            {$unwind: "$category"},

            // {$project:{
            //     "star": 0,
            //     }}
        ])
        return {status: "success", data};
    } catch(e) {
        return {status: "fail", data: e.toString() }
    }
}

export const productListByKeywordService = async (req) => {
    try{
        const searchRegex = {$regex: req.params.keyword, $options: "i"}
        const searchParams = [{title: searchRegex}, {shortDes: searchRegex}, {"brand.brandName": searchRegex}];
        const data = await ProductModel.aggregate([
            { $match: {$or: searchParams} },
            {$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"},},
            {$lookup:{from:"categories", localField: "categoryID", foreignField: "_id", as: "category"},},
            {$unwind: "$brand"},
            {$unwind: "$category"},

        ])
        return {status: "success", data};

    } catch(e) {
        return {status: "fail", data: e.toString() }
    }
}


export const productListByRemarkService = async (req) => {
    try{
        const {remark} = req.params;
        const data = await ProductModel.aggregate([
            {$match: {remark: remark}},

            {$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"},},
            {$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"},},
            {$unwind: "$brand"},
            {$unwind: "$category"},
            {$project: {
                "brand._id": 0,
                    "category._id": 0,

                }}
        ])
        return {status: "success", data};


    } catch (e) {
        return {status: "fail", data: e.toString() }
    }
}

export const productDetailsService = async (req) => {
    try{
        const ProductID = new ObjectId(req.params.productId)
        const data = await ProductModel.aggregate([
            {$match: {_id: ProductID}},
            {$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"},},
            {$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as:"category"},},
            {$lookup: {from: "ProductDetails", localField: "_id", foreignField: "productID", as: "details"},},

            {$unwind: "$brand"},
            {$unwind: "$category"},
            {$unwind: "$details",},

            {$project: {"brand._id": 0,
                    "category._id": 0,
                    categoryID: 0,
                    brandID: 0,}}
        ])
        return {status: "success", data};

    } catch(e) {
        return {status: "fail", data: e.toString() }
    }
}

export const createReviewService = async (req) => {
    try{
        // const user_id = req.user;
        // let reqBody = req.body;

        const {productID, des, rating} =req.body

        const data = await ReviewModel.create({
            productID,
            userID: req.user,
            des,
            rating,
        })
        return {status: "success", data};

    } catch (e) {
        return {status: "fail", data: e.toString() }
    }
}


export const productReviewListService = async (req) => {
 try{
     const productId = new ObjectId(req.params.productId);
     const data = await ReviewModel.aggregate([
         {$match: {productID: productId}}
     ])
     return {status: "success", data};
 } catch (e){
     return {status: "fail", data: e.toString() }
    }
}

export const createProfileService = async (req) => {
    try{
        const user_id = req.user;
        let reqBody = req.body;
        await ProfileModel.updateOne(
            {userID: user_id},
            {$set:reqBody},
            {upsert: true}
        );
        return {status: "success", message: "Profile Saved Successfully"};
    } catch(e) {
        return {status: "fail", data: e.toString() }
    }
}


export const readProfileService = async (req) => {
    try{
        const user_id = req.user;
        const result = await ProfileModel.find({ userID: user_id });
        return {status: "success", data: result};
    } catch (e) {
        return {status: "fail", data: e.toString() }
    }
}