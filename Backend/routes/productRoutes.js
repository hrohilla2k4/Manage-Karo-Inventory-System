const express = require("express")
const { createProduct, getProducts, getProduct, deleteProduct, updateProduct } = require("../controllers/productController")
const router = express.Router()
const protect = require("../middlewares/authMiddleware")
const { upload } = require("../utils/fileUpload")

// Api to post image 
router.post("/createproduct", protect, upload.single("image"), createProduct)

// Api to get all products 
router.get("/products", protect, getProducts)

// Api to get single product
router.get("/product/:id", protect, getProduct)

// Api to delete a product
router.delete("/delete/:id", protect, deleteProduct)

// Api to update the product
router.patch("/updateproduct/:id", protect, upload.single("image"), updateProduct)
module.exports = router