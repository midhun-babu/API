import mongoose from "mongoose";

const connectDB = async (URI) => {
  try {
    if (!URI) {
      throw new Error("MongoDB connection URI is missing");
    }

    await mongoose.connect(URI);

    console.log("Connected Successfully");
  } catch (error) {
    console.error("Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
