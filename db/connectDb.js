// lib/mongodb.js
import mongoose from 'mongoose';

const connectDb = async () => {
  console.log("Ready")
  if (mongoose.connection.readyState >= 1) return;
  console.log("Steady")

  const uri = "mongodb+srv://akashcodesharma:KillerAkay@getmeachai.5xf9gus.mongodb.net/?retryWrites=true&w=majority&appName=GetMeAChai";

        const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
return;
};

export default connectDb;
