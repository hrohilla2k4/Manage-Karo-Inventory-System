const mongoose = require("mongoose")

// Creating the product schema , it will save data into DB in this format

const productSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },
    sku: {
        type: String,
        required: true,
        default: "SKU",
        trim: true,

    },
    category: {
        type: String,
        required: [true, "Please add a category"],
        trim: true
    },
    quantity: {
        type: String,
        required: [true, "Please add quantity"],
        trim: true
    },
    price: {
        type: String,
        required: [true, "Please add the price"],
        trim: "true"
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
        trim: true
    },
    image: {
        type: Object,
        default: {}
    }

},
    {
        timestamps: true,
    }
)

const Product = mongoose.model("Product", productSchema)
module.exports = Product