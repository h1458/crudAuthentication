import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/axiosInstance";
import { toast } from "react-toastify";


const initialState = {
    List: [{}],
    status: "success",
    redirect: null,
    updates: [{}],
    totalpage: ""
}


export const ProductList = createAsyncThunk('productList/fetch', async(data) => {
    try{
        const response = await axiosInstance.post("/product/list", data)
        console.log(response)
        const responseResult= response?.data
        return responseResult
    }catch(error){
        console.log(" while posting the product List", error)
    }
})

export const productCreate = createAsyncThunk('productCreate/fetch', async(formdata) => {
    try{
        const response = await axiosInstance.post("/product/create", formdata)
        return response?.data
    }catch(error){
        console.log("error while posting api " ,error)
    }
})

export const productRemove = createAsyncThunk('productRemove/fetch', async(data) => {
    try{
        const response = await axiosInstance.post("/product/remove", data)
        return response?.data
    }catch(error){
        console.log("error while posting api " ,error)
    }
})
export const productDetails = createAsyncThunk('productDeatils/fetch', async(id) => {
    try{
        const response = await axiosInstance.get(`product/detail/${id}`)
        return response?.data
    }catch(error){
        console.log("error while posting api " ,error)
    }
})
export const productUpdate = createAsyncThunk('productUpdate/fetch', async(formdata) => {
    try{
        const response = await axiosInstance.post(`/product/update`, formdata)
        return response?.data
    }catch(error){
        console.log("error while posting api " ,error)
    }
})

export const CrudSlice = createSlice({
    name: 'productList',
    initialState,
    reducers: {
            redirectToProductPage: (state, {payload}) => {
                state.redirect = payload
            },
            clearTitle : (state) => {
                localStorage.removeItem("title")
            },
            clearTitles : (state) => {
                localStorage.removeItem("title")
            }
    },

    extraReducers: (builder) => {
        builder
        .addCase(ProductList.pending, (state) => {
            state.status = "loading"
        })
        .addCase(ProductList.fulfilled, (state, {payload}) => {
            console.log(payload?.data)
            state.status = "success"
            state.List = payload?.data
            state.totalpage = payload?.totalPages
        })
        .addCase(ProductList.rejected, (state)=> {
            state.status = 'rejected'
        })


        .addCase(productCreate.pending, (state) => {
            state.status = "loading"
        })
        .addCase(productCreate.fulfilled, (state, {payload}) => {
            state.status = "success"
            localStorage.setItem("title", payload?.data?.title)
            state.redirect = "/product"
            toast(payload?.message)
        })
        .addCase(productCreate.rejected, (state)=> {
            state.status = 'rejected'
        })


        .addCase(productRemove.pending, (state, {payload}) => {
            state.status = "loading"
        })
        .addCase(productRemove.fulfilled,(state, {payload}) => {
            state.status = "success"
            toast(payload?.message)
        })
        .addCase(productRemove.rejected,(state) => {
            state.status = "rejected"
        })


        .addCase(productDetails.pending, (state, {payload}) => {
            state.status = "loading"
        })
        .addCase(productDetails.fulfilled,(state, {payload}) => {
            console.log(payload?.data)
            state.status = "success"
            state.updates = payload?.data
        })
        .addCase(productDetails.rejected,(state) => {
            state.status = "rejected"
        })
        
        .addCase(productUpdate.pending, (state, {payload}) => {
            state.status = "loading"
        })
        .addCase(productUpdate.fulfilled,(state, {payload}) => {
            console.log(payload?.data)
            state.status = "success"
            state.redirecto = "/product"
            toast(payload?.message)
        })
        .addCase(productUpdate.rejected,(state) => {
            state.status = "rejected"
        })
        
    }
})

export const {redirect, redirecto, clearTitle, clearTitles} = CrudSlice.actions