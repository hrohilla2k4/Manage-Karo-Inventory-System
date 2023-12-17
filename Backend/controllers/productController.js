// Importing the required dependencies
const asyncHandler = require("express-async-handler")
const Product = require("../models/productModel")
const { fileSizeFormatter } = require("../utils/fileUpload")
const cloudinary = require("cloudinary").v2;

// Create product component
const createProduct = asyncHandler(async (req, res) => {

    // Destructuring the data that we will get from the body
    const { name, sku, category, quantity, price, description } = req.body

    // Validation

    if (!name || !sku || !category || !quantity || !price || !description) {
        res.send(400)
        throw new Error("Please fill all the data")
    }

    // Handle Image Upload

    let fileData = {}

    if (req.file) {

        // Upload image to cloudinary

        let uploadFile;
        try {
            uploadFile = await cloudinary.uploader.upload(req.file.path, { folder: "Managekaro app", resource_type: "image" })
        } catch (error) {
            res.status(500)
            throw new Error("Image could not be uploaded")
        }

        fileData = {
            fileName: req.file.originalname,
            filePath: uploadFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2)
        }
    }

    // If validated, Create product

    const product = await Product.create({
        user: req.user.id,
        name,
        sku,
        category,
        quantity,
        price,
        description,
        image: fileData
    })

    res.status(201).json({ product })



})

// Get all products

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ user: req.user.id }).sort("-createdAt")
    res.status("200").json({ products })
})

// Get a single product

const getProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)

    // Check if product exists
    if (!product) {
        res.status(404)
        throw new Error("No product found")
    }

    //Match product to the user

    if (product.user.toString() != req.user.id) {
        res.status(401)
        throw new Error("Not authorised")
    }
    res.status(200).json(product)
})

// Delete product
const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)

    // if product doesn't exists
    if (!product) {
        res.status(404)
        throw new Error("No product exists")
    }

    // Match product to its user
    if (product.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not authorized")
    }
    try {
        await product.deleteOne()
    } catch (error) {
        console.log(error.message)
    }

    res.status(200).json(product)


})

// Update product
const updateProduct = asyncHandler(async (req, res) => {

    // Destructuring the data that we will get from the body
    const { name, category, quantity, price, description } = req.body

    const { id } = req.params


    // Get the product
    const product = await Product.findById(id)

    // Check product exists
    if (!product) {
        res.status(404)
        throw new Error("No product found")
    }

    if (product.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not authorized")
    }

    // Handle Image Upload

    let fileData = {}

    if (req.file) {

        // Upload image to cloudinary

        let uploadFile;
        try {
            uploadFile = await cloudinary.uploader.upload(req.file.path, { folder: "Managekaro app", resource_type: "image" })
        } catch (error) {
            res.status(500)
            throw new Error("Image could not be uploaded")
        }

        fileData = {
            fileName: req.file.originalname,
            filePath: uploadFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2)
        }
    }

    // If validated, update product

    const updatedProduct = await Product.findByIdAndUpdate({
        _id: id
    }, {
        name,
        category,
        quantity,
        price,
        description,
        image: Object.keys(fileData).length === 0 ? product.image : fileData
    },
        {
            new: true,
            runValidators: true
        }
    )



    res.status(201).json({ product })



})


module.exports = {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
}