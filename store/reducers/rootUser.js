import { createSlice } from "@reduxjs/toolkit";

export const rootUserSlice = createSlice({
    name : 'rootUser',
    initialState : null,
    reducers : {
        _set : ( state , action ) => {
            return state = action.payload;
        },
        _delete : ( state , action ) => {
            return state = null;
        }
    }
})

export const { _get, _set, _delete} = rootUserSlice.actions;
export default rootUserSlice;