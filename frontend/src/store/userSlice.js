import { createSlice } from "@reduxjs/toolkit"
import { addToCart, authUser, getCartItems, loginUser, logoutUser, payProducts, registerUser, removeCartItem } from "./thunkFunctions";
import { toast } from "react-toastify";

const initialState = {
    userData: {
        id: '',
        email: '',
        name: '',
        role: 0,    // 0 : 일반유저, 1 : Admin 유저
        image: '',
    },
    isAuth: false,
    isLoading: false,
    error: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => { 
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state) => {   // 회원가입 성공했을 경우
                state.isLoading = false;
                toast.info('회원가입을 성공했습니다.🙂');
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {   // 로그인 성공했을 경우
                state.isLoading = false;
                state.userData = action.payload;    
                state.isAuth = true;
                localStorage.setItem('accessToken', action.payload.accessToken);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            .addCase(authUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(authUser.fulfilled, (state, action) => {   
                state.isLoading = false;
                state.userData = action.payload;    
                state.isAuth = true;
            })
            .addCase(authUser.rejected, (state, action) => {    // 토큰이 만료되었을 경우
                state.isLoading = false;
                state.error = action.payload;
                state.isAuth = false;
                localStorage.removeItem('accessToken');     // 토큰 지워줌.
            })

            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {   
                state.isLoading = false;
                state.userData = initialState.userData;    // 유저 데이터 초기화
                state.isAuth = false;
                localStorage.removeItem('accessToken');     
            })
            .addCase(logoutUser.rejected, (state, action) => {    
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })            
            .addCase(addToCart.fulfilled, (state, action) => {   
                state.isLoading = false;
                state.userData.cart = action.payload;
                toast.info('장바구니에 추가되었습니다.🛒')   
            })
            .addCase(addToCart.rejected, (state, action) => {    
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            .addCase(getCartItems.pending, (state) => {
                state.isLoading = true;
            })            
            .addCase(getCartItems.fulfilled, (state, action) => {   
                state.isLoading = false;
                state.cartDetail = action.payload;
            })
            .addCase(getCartItems.rejected, (state, action) => {    
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            .addCase(removeCartItem.pending, (state) => {
                state.isLoading = true;
            })            
            .addCase(removeCartItem.fulfilled, (state, action) => {   
                state.isLoading = false;
                state.cartDetail = action.payload.productInfo;
                state.userData.cart = action.payload.cart;
                toast.info('상품이 장바구니에서 삭제되었습니다.')
            })
            .addCase(removeCartItem.rejected, (state, action) => {    
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            .addCase(payProducts.pending, (state) => {
                state.isLoading = true;
            })            
            .addCase(payProducts.fulfilled, (state, action) => {   
                state.isLoading = false;
                state.cartDetail = [];
                state.userData.cart = [];
                toast.info('상품 구매를 완료하였습니다.')
            })
            .addCase(payProducts.rejected, (state, action) => {    
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

    }
})

export default userSlice.reducer;   // reducer 를 이용해서 redux store 생성하기 위해 다른 모듈에서도 쓸 수 있도록 함!