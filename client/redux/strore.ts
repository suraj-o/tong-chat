import {configureStore} from "@reduxjs/toolkit"
import { userReducer } from "./reducers/user"
import { userApi } from "./api/user"
import { chatApi } from "./api/chats"


export const store=configureStore({
    reducer:{
        [userApi.reducerPath]:userApi.reducer,
        [chatApi.reducerPath]:chatApi.reducer,
        [userReducer.name]:userReducer.reducer
    },
    middleware:(mid)=>mid().concat(userApi.middleware,chatApi.middleware)
})
