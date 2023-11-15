import { configureStore } from "@reduxjs/toolkit";
import rootUserReducer from "./reducers/rootUser";

export default configureStore({
    reducer : {
        rootUser : rootUserReducer
    }
})