import {registerUserService, verifyUserService, loginUserService, refreshAccessTokenService, logoutUserService} from "../services/UserService.js";
import {createProfileService, readProfileService} from "../services/productServices.js";

export const registerUser = async (req, res) => {
    try{
       const { email, password } = req.body;
       const result = await registerUserService(email, password);
       return res.json(result);
    }catch(error){
        return res.status(error.statusCode || 500).json({ message: error.message || "Something went wrong" });
    }
}

export const verifyUser = async (req, res) => {
    try{
        const { email, otp } = req.body;
        const result = await verifyUserService ( email, otp)

        res.cookie("refreshtoken", result.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 30 *  24 * 60 * 60 * 1000,
        })

        res.cookie("accesstoken", result.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.status(200).json(result);

    }catch(error){
        console.log(error);
        return res.status(error.statusCode || 500).json({ message: error.message || "Something went wrong" });

    }
}



export const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        const result = await loginUserService(email, password);

        res.cookie("refreshtoken", result.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.cookie("accesstoken", result.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge:  24 * 60 * 60 * 1000,
        })
        return res.status(200).json(result);

    } catch(error){
      console.log(error);
      return res.status(error.statusCode || 500).json({ message: error.message || "Something went wrong" });
    }
}

// export const refreshAccessToken = async (req, res) => {
//    try{
//        const {refreshToken} = req.body;
//        const result = await refreshAccessTokenService(refreshToken);
//        return res.status(200).json(result);
//
//    } catch(error) {
//        console.log(error);
//        return res.status(error.statusCode || 500).json({ message: error.message || "Something went wrong" });
//    }
//
// }

export const refreshAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshtoken; // safer than body
        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token provided" });
        }

        const result = await refreshAccessTokenService(refreshToken);

        res.cookie("accesstoken", result.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        return res.status(200).json({ message: "Access token refreshed" });
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({ message: error.message || "Something went wrong" });
    }
};


export const logoutUser = async (req, res) => {
  try{
      const refreshToken = req.cookies.refreshtoken;
      const result = await logoutUserService( req.user, refreshToken);
      return res.status(200).json(result);

  } catch(error){
      return res.status(error.statusCode || 500).json({ message: error.message || "Something went wrong" });
  }
}

export const createProfile = async (req, res) => {
    let result = await createProfileService(req);
    return res.status(200).json(result);
}

export const readProfile = async (req, res) => {
    let result = await readProfileService(req);
    return res.status(200).json(result);
}

export const updateProfile = async (req, res) => {
    let result = await createProfileService(req);
    return res.status(200).json(result);
}
