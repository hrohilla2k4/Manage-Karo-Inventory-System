import axios from "axios"

const API_URL = `http://localhost:5000/api/products`
// Create new product
const createProduct = async (formData) => {
    const response = await axios.post(`${API_URL}/createproduct`, formData)
    return response.data
}

const productService = {
    createProduct
}

export default productService