// Load environment variables from a .env file into process.env
const dotenv = require("dotenv").config()

// Import required dependencies
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const path = require("path")

// Import required middlewares , from the middlewares folder
const errorHandler = require("./middlewares/errorHandler")


// Import routes from the routes folder
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes")
const contactUsRoute = require("./routes/contactRoutes")

// Define the server's port, using the specified port or default to 27017
const serverPort = process.env.PORT || 5000

// Create an instance of the Express application
const apiServer = express()

// Using installed middlewares for parsing requests. 
apiServer.use(express.json())
apiServer.use(express.urlencoded({ extended: false }))
apiServer.use(bodyParser.json())
apiServer.use(cookieParser())
apiServer.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))

// Middleware for the file upload
apiServer.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Connect to the MongoDB database using the provided URI in the environment variables
mongoose
    .connect(process.env.mongodbUri)
    .then(() => {

        // Use middlewares imported from middlewares folder

        // Middleware to use the routes defined in the routes folder
        apiServer.use('/api/users', userRoute);
        apiServer.use('/api/products', productRoute);
        apiServer.use('/api/contactus/', contactUsRoute)

        // Start the Express server, listening on the specified port
        apiServer.listen(serverPort, () => {
            console.log(`Server running on port: ${serverPort}`)
        })

    })
    .catch((err) => console.log(err))

