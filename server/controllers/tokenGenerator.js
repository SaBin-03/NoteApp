import jwt from "jsonwebtoken";


export const genAccessToken = (userId) => {
    return (
        jwt.sign({ id: userId}, process.env.ACCESS_SECRET, {
              expiresIn: "1m",
            })
    )
}
export const genRefreshToken = (userId) => {
    return (
        jwt.sign({ id: userId }, process.env.REFRESH_SECRET, {
              expiresIn: "7d",
            })
    )
}
