const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function checkDB() {
  try {
    console.log("Connecting to:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected successfully.");
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));
    
    const services = await mongoose.connection.db.collection('services').find().toArray();
    console.log("Services count:", services.length);
    
    mongoose.disconnect();
  } catch (err) {
    console.error("Error:", err);
  }
}

checkDB();
