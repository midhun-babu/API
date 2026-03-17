import { createUser } from "../services/userService.js";
import { validatePassword, generateTokens } from "../services/authService.js";
import {findUserByIdentifier,findUserForLogin} from "../dbqueries/userQueries.js";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  try {
    const { name, uname, email, password, role } = req.body;

    const existingUser = await findUserByIdentifier(email);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await createUser({ name, uname, email, password, role });

    const { accessToken, refreshToken } = generateTokens(user._id);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        uname: user.uname,
        email: user.email,
        role: user.role,
        password: user.password,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await findUserForLogin(identifier);
    console.log("Full User Object from DB:", user);
    console.log("Password property exists:", !!user.password);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await validatePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = generateTokens(user._id);

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Login error: " + error.message });
  }
};

export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    jwt.verify(
      refreshToken,
      process.env.refresh_token,
      (err, decoded) => {
        if (err) {
          return res
            .status(403)
            .json({ message: "Invalid or expired refresh token" });
        }

        const tokens = generateTokens(decoded.id);

        res.status(200).json({
          message: "Token refreshed successfully",
          accessToken: tokens.accessToken,
        });
      },
    );
  } catch (error) {
    res.status(500).json({ message: "Refresh error: " + error.message });
  }
};
