import { OAuth2Client } from "google-auth-library";
import { createGoogleUser, findUserByEmail, updateGoogleUser } from "./auth.repository";
import { getAccessToken, getRefreshToken } from "../../utils/token";

const client = new OAuth2Client(process.env.CLIENT_ID);

export const googleLogin = async(idToken: string)=>{
    const ticket = await client.verifyIdToken({
        idToken,
        audience:process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if(!payload) {
        throw new Error('Invalid Google Token');
    }

    const {
        sub:googleId,
        email,
        name,
        picture,
        email_verified,
    } = payload;

    if(!email) {
        throw new Error('Google account has no email');
    };

    let user = await findUserByEmail(email);

    if(!user){
        user = await createGoogleUser({
            fullName:name ?? "",
            email,
            googleId,
            profilePicture:picture,
            provider:"google",
            isEmailVerified: email_verified ?? true,
        });

    }else{
        if(!user.googleId) {
            user = await updateGoogleUser(user._id.toString(),{
                googleId,
                profilePicture:picture,
                provider:"google",
                isEmailVerified:true,
            })
        }
    }

    const accessToken = getAccessToken(user?._id.toString());
    const refreshToken = getRefreshToken(user?._id.toString());

    return {
        success:true,
        accessToken,
        refreshToken,
        user
    }
}