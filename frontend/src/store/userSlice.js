import { createSlice } from "@reduxjs/toolkit"

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
    extraReducers: (builder) => { }
})

export default userSlice.reducer;   // reducer 를 이용해서 redux store 생성하기 위해 다른 모듈에서도 쓸 수 있도록 함!