import mongoose from "mongoose";

// let mongooseConnection: Connection;
async function connectDB() {
  try {
    mongoose.connection.on("connecting", () => {
      console.log("Connecting to database");
    });
    mongoose.connection.on("connected", () => {
      console.log("Connected to database");
    });
    mongoose.connection.on("disconnecting", () => {
      console.log("Disconnecting from database");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("Disconnected from database");
    });

    if (![1, 2].includes(mongoose.connection.readyState)) {
      await mongoose.connect(process.env.MONGO_URI as string, {
        autoIndex: true,
        serverSelectionTimeoutMS: 5000,
      });
      // mongooseConnection = conn.connection;
    }
  } catch (error) {
    console.log("Error connecting to database", error);
  }
}

export default connectDB;
