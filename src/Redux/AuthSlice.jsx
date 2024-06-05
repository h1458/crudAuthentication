import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../AxiosInstance/axiosInstance'
import { toast } from 'react-toastify'


const initialState = {
    isLogedIn: false,
    status: 'success',
    redirectToLogin: null
}
export const LoginApi = createAsyncThunk('login/fetch', async (data) => {
    try {
        const response = await axiosInstance.post('/user/signin', data)
        console.log(response)
        if (response && response?.data?.status === 200) {
            toast(response?.data?.message)

        }
        return response?.data;

    } catch (error) {
        toast(error?.response?.data?.message)
        console.log(error)
    }
})

export const AuthSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        redirectTo: (state, { payload }) => {
            state.redirectToLogin = payload
        },
        LogoutToggel: (state, {paylaod}) => {
            localStorage.removeItem("name");
            localStorage.removeItem("profile_pic");
            localStorage.removeItem("token");
            state.isLogedIn = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(LoginApi.pending, (state) => {
            state.status = "loading..."
        })
        builder.addCase(LoginApi.fulfilled, (state, { payload }) => {
            console.log(payload)
            if (payload?.status === 200) {
                localStorage.setItem("token", payload?.token)
                localStorage.setItem("name",payload?.data?.first_name)
                localStorage.setItem("profile_pic", payload?.data?.profile_pic)
                state.isLogedIn = true
                toast(payload?.data?.message)
                state.redirectToLogin = "/product"
            }
            state.status = "success"
        })
        builder.addCase(LoginApi.rejected, (state) => {
            state.status = "rejected"
        })
    }
})

export const { isLogedIn, redirectTo, LogoutToggel } = AuthSlice.actions