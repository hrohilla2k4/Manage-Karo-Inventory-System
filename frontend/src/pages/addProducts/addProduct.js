import React, { useState } from "react";
import Productform from "../../components/productForm/productForm";
import { useSelector } from 'react-redux'
import { selectIsLoading } from "../../redux/features/products/productSlice"
import { useDispatch } from "react-redux";
import createNewProduct from "../../"

const initialState = {
    name: "",
    category: "",
    quantity: "",
    price: "",

}
const Addproduct = () => {

    const dispatch = useDispatch()

    const [productImage, setProductImage] = useState("")
    const [products, setProducts] = useState(initialState)
    const [imagePreview, setImagePreview] = useState(null)
    const [description, setDescription] = useState("")

    const isLoading = useSelector(selectIsLoading)

    const { name, category, quantity, price } = products

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProducts({ ...products, [name]: value })
    }

    const handleImageChange = (e) => {
        setProductImage(e.target.files[0])
        // Temporary access to preview the file
        setImagePreview(URL.createObjectURL(e.target.files[0]))
    }

    const generateSKU = (category) => {
        const letter = category.slice(0, 3).toUpperCase()
        const number = Date.now()
        const SKU = letter + "-" + number
        return SKU
    }

    const saveProduct = async (e) => {
        e.preventDefault()

        // In this we can process image and send image to backend , so using here - new FormData object
        const formData = new FormData()
        formData.append("name", name)
        formData.append("category", category)
        formData.append("price", price)
        formData.append("SKU", generateSKU(category))
        formData.append("Quantity", quantity)
        formData.append("Description", description)
        formData.append("Image", productImage)

        console.log(...formData)

        await dispatch(createNewProduct)
    }


    return (
        <div>
            <h3 className="--mt">Add new product</h3>
            <Productform />
        </div>
    )
}