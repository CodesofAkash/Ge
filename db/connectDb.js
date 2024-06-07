import mongoose from "mongoose";

const connectDB = async () => {
  const uri = "mongodb+srv://akashcodesharma:<password>@getmeachai.5xf9gus.mongodb.net/?retryWrites=true&w=majority&appName=GetMeAChai";
  const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
      await mongoose.connect(uri, clientOptions);
      await mongoose.connection.db.admin().command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      // const conn = await mongoose.connect("mongodb+srv://akashcodesharma:KillerAkay@getmeachai.5xf9gus.mongodb.net/?retryWrites=true&w=majority&appName=GetMeAChai");
      // console.log(`MongoDB Connected: ${conn.connection.host}`);
    
  }

  export default connectDB;

// async function run() {
//   try {
//     // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await mongoose.disconnect();
//   }
// }
// run().catch(console.dir);