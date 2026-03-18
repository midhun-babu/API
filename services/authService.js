
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const validatePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};


export const generateTokens = (user) => {
  const payload = { 
    id: user._id || user.id, 
    role: user.role 
  };

  const accessToken = jwt.sign(
    payload, 
    process.env.access_token, 
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    payload, 
    process.env.refresh_token, 
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};
