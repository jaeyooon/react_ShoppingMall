import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (body, thunkAPI) => {     // payloadCreator 
        try {
            const response = await axiosInstance.post(
                `/users/register`,   // 해당 백엔드 API에 요청을 보냄(axios를 이용한 비동기 요청)
                body
            )

            return response.data;   // response.data는 payload
        } catch(error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message)   // rejectWithValue() 에 string 값을 넣어주면 해당 string 값이 action payload가 됨
        }                                                                            // So, 화면에 보여주거나 스낵바를 이용해서 에러 메시지를 보여줄 수 있음.
    }
)


export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (body, thunkAPI) => {     // payloadCreator 
        try {
            const response = await axiosInstance.post(
                `/users/login`,   // 해당 백엔드 API에 요청을 보냄(axios를 이용한 비동기 요청)
                body    // body안에는 email과 password가 들어있음.
            )

            return response.data;   // 백엔드에서 전달한 데이터인 response.data는 action.payload
        } catch(error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message)   // rejectWithValue() 에 string 값을 넣어주면 해당 string 값이 action payload가 됨
        }                                                                            // So, 화면에 보여주거나 스낵바를 이용해서 에러 메시지를 보여줄 수 있음.
    }
)


export const authUser = createAsyncThunk(
    "user/authUser",
    async (_, thunkAPI) => {     // payloadCreator 
        try {
            const response = await axiosInstance.get(
                `/users/auth`,   // 해당 백엔드 API에 요청을 보냄(axios를 이용한 비동기 요청)    
            );

            return response.data;   // 백엔드에서 전달한 데이터인 response.data는 action.payload
        } catch(error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message)   // rejectWithValue() 에 string 값을 넣어주면 해당 string 값이 action payload가 됨
        }                                                                            // So, 화면에 보여주거나 스낵바를 이용해서 에러 메시지를 보여줄 수 있음.
    }
)


export const logoutUser = createAsyncThunk(
    "user/logoutUser",
    async (_, thunkAPI) => {     // payloadCreator 
        try {
            const response = await axiosInstance.post(
                `/users/logout`,   // 해당 백엔드 API에 요청을 보냄(axios를 이용한 비동기 요청)    
            );

            return response.data;   // 백엔드에서 전달한 데이터인 response.data는 action.payload
        } catch(error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message)   // rejectWithValue() 에 string 값을 넣어주면 해당 string 값이 action payload가 됨
        }                                                                            // So, 화면에 보여주거나 스낵바를 이용해서 에러 메시지를 보여줄 수 있음.
    }
)


export const addToCart = createAsyncThunk(
    "user/addToCart",
    async (body, thunkAPI) => {     // payloadCreator 
        try {
            const response = await axiosInstance.post(
                `/users/cart`,   // 해당 백엔드 API에 요청을 보냄(axios를 이용한 비동기 요청)    
                body
            );

            return response.data;   // 백엔드에서 전달한 데이터인 response.data는 action.payload
        } catch(error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message)   // rejectWithValue() 에 string 값을 넣어주면 해당 string 값이 action payload가 됨
        }                                                                            // So, 화면에 보여주거나 스낵바를 이용해서 에러 메시지를 보여줄 수 있음.
    }
)


export const getCartItems = createAsyncThunk(
    "user/getCartItems",
    async ({ cartItemIds, userCart }, thunkAPI) => {     // payloadCreator 
        try {
            const response = await axiosInstance.get(   // 상품 데이터를 가져오는 것이므로 get 메서드
                `/products/${cartItemIds}?type=array`   // 해당 백엔드 API에 요청을 보냄(axios를 이용한 비동기 요청)          
            );

            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, index) => {
                    if (cartItem.id === productDetail._id) {
                        response.data[index].quantity = cartItem.quantity;  // User Collection으로부터 cart에 들어간 상품의 수량정보를 가져와서 Product Collection에 넣어줌.
                    }
                })
            })

            return response.data;   // 백엔드에서 전달한 데이터인 response.data는 action.payload
        } catch(error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message)   // rejectWithValue() 에 string 값을 넣어주면 해당 string 값이 action payload가 됨
        }                                                                            // So, 화면에 보여주거나 스낵바를 이용해서 에러 메시지를 보여줄 수 있음.
    }
)


export const removeCartItem = createAsyncThunk(
    "user/removeCartItem",
    async (productId, thunkAPI) => {     // payloadCreator 
        try {
            const response = await axiosInstance.delete(   
                `/users/cart?productId=${productId}`   // 해당 백엔드 API에 요청을 보내서 DB에서 해당 상품 삭제       
            );
            
            // productInfo, cart 정보 조합해서 cartDetail 을 만듬
            response.data.cart.forEach(cartItem => {
                response.data.productInfo.forEach((productDetail, index) => {
                    if (cartItem.id === productDetail._id) {
                        response.data.productInfo[index].quantity = cartItem.quantity;  
                    }
                })
            })

            return response.data;   // 백엔드에서 전달한 데이터인 response.data는 action.payload
        } catch(error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message)   // rejectWithValue() 에 string 값을 넣어주면 해당 string 값이 action payload가 됨
        }                                                                            // So, 화면에 보여주거나 스낵바를 이용해서 에러 메시지를 보여줄 수 있음.
    }
)