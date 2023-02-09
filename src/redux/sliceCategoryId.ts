import { createSlice } from "@reduxjs/toolkit";

interface CategoryId {
    id:number;
}

const INITIAL_STATE : CategoryId ={
    id:0
}

const sliceCategoryId = createSlice({
  name:'categoryId',
  initialState: INITIAL_STATE,
  reducers: {
    setCategoryId(state, action){
        state.id = action.payload.id
    }
  }  
})

export default sliceCategoryId.reducer
export const {setCategoryId} = sliceCategoryId.actions
export const useSetCategoryId = (state:any) => {
    return state.categoryId as CategoryId
}