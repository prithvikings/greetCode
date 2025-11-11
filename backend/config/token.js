import Jwt  from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken =(id)=>{
    const token= Jwt.sign({id}, ENV.JWT_SECRET, {
        expiresIn: '30d',
    });
    return token;
}

export const verifyToken = (token) => {
    try {
        const decoded = Jwt.verify(token, ENV.JWT_SECRET);
        return decoded;
    } catch (err) {
        return null;
    }
};