import {brandListService,
    createBrandService,
    categoryListService,
    sliderListService,
    productListByBrandService,
    productListByCategoryService,
    productListBySimilarService,
    productListByKeywordService,
    productListByRemarkService,
    productDetailsService,
    createReviewService,
    productReviewListService,
    createProfileService} from "../services/productServices.js";
import error from "jsonwebtoken/lib/JsonWebTokenError.js";

export const productBrandList = async (req,res) => {
    const result = await brandListService ();
    return res.status(200).json(result);
}

export const createBrand = async (req, res) => {
    let result = await createBrandService(req);
    return res.status(201).json(result);
};

export const productCategoryList = async (req,res) => {
    let result = await categoryListService();
    return res.status(200).json(result);
}

export const productSliderList = async (req, res) => {
    let result = await sliderListService();
    return res.status(200).json(result);
}

export const productListByBrand = async (req,res) => {
    let result = await productListByBrandService(req);
    return res.status(200).json(result);
}

export const productListByCategory = async (req,res) => {
    let result = await productListByCategoryService(req);
    return res.status(200).json(result);
}

export const productListBySimilar =async (req, res) => {
    let result = await productListBySimilarService(req);
    return res.status(200).json(result);
}

export const productListByKeyword = async (req, res) => {
    let result = await productListByKeywordService(req);
    return res.status(200).json(result);
}

export const productListByRemark = async (req,res) => {
    let result = await productListByRemarkService(req);
    return res.status(200).json(result);
}

export const productDetails = async (req,res) => {
    let result = await productDetailsService(req);
    return res.status(200).json(result);
}

export const createReview = async (req, res) => {
    let result = await createReviewService(req);
    return res.status(201).json(result);
}

export const productReviewList = async (req,res) => {
    let result = await productReviewListService(req);
    return res.status(200).json(result);
}

