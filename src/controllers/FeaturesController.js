import {FeaturesListService} from "../services/FeaturesServices.js";


export const FeaturesList=async(req,res)=>{
    let result=await FeaturesListService(req);
    return res.status(200).json(result)
}

