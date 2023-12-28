/**
 * This file contains the slice for the redux - it is important to make slice in redux because - the logic for updating the state , lies in redux
 */

// Importing required dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from "../products/productService"
import { toast } from 'react-toastify'


// Defining initial state for redux, because it demands an initial state
const initialState = {
    product: null,
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// This function creates a new product asynchronously
// createAsyncthunk is a functionality provided by redux toolkit to easily do asynchrounous operations in redux
const createNewProduct = createAsyncThunk(
    "products/create",
    async (formData, thunkAPI) => {
        try {
            return await createProduct(formData)
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            console.log(message)
            return thunkAPI.rejectWithValue(message)
        }
    }
)


// Actually create a slice
const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        CALC_STORE_VALUE(state, action) {
            console.log("Store value")
        }
    },
    extraReducers: (builder) => {
        // Reducers based on async function
        builder
            .addCase(createNewProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createNewProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                console.log(action.payload)
                state.products.push(action.payload)
                toast.success("Product added successfully")
            })
            .addCase(createNewProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                toast.error(action.payload)
            })
    }


})

export const { CALC_STORE_VALUE } = productSlice.actions
export const selectIsLoading = (state) => state.product.isLoading
export default productSlice.reducer