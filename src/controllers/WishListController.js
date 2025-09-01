import {wishListService, saveWishListService, removeWishListService} from "../services/WishListService.js"

export const wishList = async(req, res) => {
    let result = await wishListService(req);
    res.status(200).send(result);
}

export const saveWishList = async (req, res) => {
    let result = await saveWishListService(req);
    res.status(200).send(result);
}

export const removeWishList = async (req, res) => {
    let result = await removeWishListService(req);
    res.status(200).send(result);
}