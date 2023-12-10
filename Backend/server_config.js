const dotenv = require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const serverPort = process.env.PORT || 27017
const apiServer = express()

mongoose
    .connect(process.env.mongodbUri)
    .then(() => {

        const apiRoutes = require("./api_routes.js");

        apiServer.use('/api', apiRoutes);

        apiServer.listen(serverPort, () => {
            console.log(`Server running on port: ${serverPort}`)
        })

    })
    .catch((err) => console.log(err))