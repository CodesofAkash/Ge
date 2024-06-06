import mongoose from "mongoose";

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(`mongodb+srv://akashcodesharma:KillerAkay@getmeachai.5xf9gus.mongodb.net/?retryWrites=true&w=majority&appName=GetMeAChai`, {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected: {conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

  export default connectDB;