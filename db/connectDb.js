import mongoose from 'mongoose';

// Connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Other options such as poolSize can be added here
};

// Initialize MongoDB connection
const connectDb = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI, options);
      console.log("Connected to MongoDB");
    } else {
      console.log("Already connected to MongoDB");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // You can choose to handle the error here, retry connection, or throw it
    throw error;
  }
};

export default connectDb;
