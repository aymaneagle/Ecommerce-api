import express from 'express'
import {
    registerUser,
    verifyUser,
    loginUser,
    refreshAccessToken,
    logoutUser, createProfile, readProfile, updateProfile
} from "../src/controllers/UserController.js";
import {auth} from "../src/middleware/authMiddleware.js";
import {
    productBrandList,
    createBrand,
    productCategoryList,
    productSliderList,
    productListByBrand,
    productListByCategory,
    productListBySimilar,
    productListByKeyword,
    productListByRemark,
    productDetails,
    createReview,
    productReviewList
} from "../src/controllers/ProductController.js";
import {createProfileService} from "../src/services/productServices.js";
import {removeWishList, saveWishList, wishList} from "../src/controllers/WishListController.js";
import {removeCartList, saveCartList, updateCartList, cartList} from "../src/controllers/CartListController.js";
const router = express.Router()

//User
router.post('/registerUser', registerUser );
router.post('/verifyUser', verifyUser);
router.post("/loginUser", loginUser);
router.post("/refreshAccessToken", refreshAccessToken)
router.post("/logoutUser", auth,logoutUser)


//Product
router.get("/productBrandList", productBrandList )
router.post("/createBrand", createBrand )
router.get("/productCategoryList", productCategoryList)
router.get("/productSliderList", productSliderList)
router.get("/productListByBrand/:brandID", productListByBrand)
router.get("/productListByCategory/:categoryID", productListByCategory)
router.get("/productListBySimilar/:categoryId", productListBySimilar)
router.get("/productListByKeyword/:keyword", productListByKeyword)
router.get("/productListByRemark/:remark", productListByRemark)
router.get("/productDetails/:productId", productDetails)

//Review
router.post("/createReview", auth, createReview);
router.get("/productReviewList/:productId", productReviewList)

//Profile
router.post("/createProfile", auth, createProfile);
router.get("/readProfile", auth, readProfile)
router.post("/updateProfile", auth, updateProfile)

//Wish
router.get("/wishList",auth, wishList)
router.post("/saveWishList", auth, saveWishList)
router.post("/RemoveWishList", auth, removeWishList)

//Cart
router.post ("/saveCartList", auth, saveCartList)
router.post ("/updateCartList/:cartID", auth, updateCartList)
router.post ("/removeCartList", auth, removeCartList)
router.get("/cartList", auth, cartList)


export default router;