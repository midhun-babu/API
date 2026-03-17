
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const validatePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};


export const generateTokens = (id) => {
  if (!process.env.access_token) {
    throw new Error("Access token not in env");
  }
  if(!process.env.refresh_token){
    throw new Error("Refresh token not present")
  }

  
  const accessToken = jwt.sign(
    { id },
    process.env.access_token,
    { expiresIn: "15m" } 
  );

  
  const refreshToken = jwt.sign(
    { id },
    process.env.refresh_token,
    { expiresIn: "7d" } 
  );

  return { accessToken, refreshToken };
};