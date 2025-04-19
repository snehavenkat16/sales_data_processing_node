const mongoose = require('mongoose');

const mongoDbUrl = 'mongodb://localhost:27017/sales_data'; 

const connectDb = async() =>{
    try{
        await mongoose.connect(mongoDbUrl,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB connected');
    }catch(err){
        console.error('Error connecting to MongoDB:', err);
    }
}

module.exports = connectDb;