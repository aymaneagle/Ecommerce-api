import {saveCartListService,
    updateCartListService, removeCartListService, cartListService} from "../services/CartListService.js";


export const saveCartList = async (req, res) => {
    const result = await saveCartListService(req);
    res.status(200).send(result);
}

export const updateCartList = async (req, res) => {
    const result = await updateCartListService(req);
    res.status(200).send(result);
}

export const removeCartList = async (req, res) =>  {
    const result = await removeCartListService(req);
    res.status(200).send(result)
}

export const cartList = async (req, res) => {
    const result = await cartListService(req);
    res.status(200).send(result);
}