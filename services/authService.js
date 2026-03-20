import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const validatePassword = async (plainPassword, hashedPassword) => {
  if (!plainPassword || !hashedPassword) {
    throw new Error("Password validation failed");
  }

  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const generateTokens = (user) => {
  if (!user) {
    throw new Error("User data required for token generation");
  }

  const payload = {
    id: user._id || user.id,
    role: user.role,
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