import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getUserData = asyncHandler(async(req, res) => {

    const user = await User.findById(req.user._id);

    if(!user){
        throw new ApiError(404, "User Not Found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,{name:user.name,
            isAccountVerified: user.isAccountVerified
        },
        "User Data Successfully Fetched"
        )
    )
})