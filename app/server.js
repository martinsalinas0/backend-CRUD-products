const express = require('express'); 
const mongoose = requiere('mongoose'); 
require("dotenv").config();

const app = express(); 
app.use(express.json())

mongoose.connect('mongodb://localhost/products')
.then(()=> console.log('MongoDB connected'))
.catch(err => console.error(err))


//routes
app.use('/api', productRoutes)


const PORT = process.env.PORT || 3000; 

const server = app.listen(PORT, () => { 
  console.log(`Server Connected. \nServer is running on port: ${PORT}`); 


  
})


server.on('error', (err) => { 
  console.error(`Error starting server: ${err.message}`)
  process.exit(1); 
})


//middleware for Authentication 


module.exports = app; 