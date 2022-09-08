import { configureStore } from '@reduxjs/toolkit'
import signupSlice from "./modules/signUp"
import userSlice from './modules/userSlice'
import postSlice from './modules/posts'
import detailSlice from './modules/detail'
import commentSlice from './modules/comments'

export default configureStore({
    reducer: { 
        signupSlice: signupSlice.reducer,
        userSlice: userSlice.reducer,
        posts: postSlice.reducer,
        detail:detailSlice.reducer,
        comment:commentSlice.reducer
    }
})
