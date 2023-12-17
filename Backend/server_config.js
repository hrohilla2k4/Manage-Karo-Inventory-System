// Load environment variables from a .env file into process.env
const dotenv = require("dotenv").config()

// Import required dependencies
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

// Define the server's port, using the specified port or default to 27017
const serverPort = process.env.PORT || 27017

// Create an instance of the Express application
const apiServer = express()

// Connect to the MongoDB database using the provided URI in the environment variables
mongoose
    .connect(process.env.mongodbUri)
    .then(() => {

        // Require the API routes defined in the api_routes.js file
        const apiRoutes = require("./api_routes.js");

        // Mount the API routes under the '/api' path in the Express application
        apiServer.use('/api', apiRoutes);

        // Start the Express server, listening on the specified port
        apiServer.listen(serverPort, () => {
            console.log(`Server running on port: ${serverPort}`)
        })

    })
    .catch((err) => console.log(err))

