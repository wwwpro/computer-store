import {createSlice} from '@reduxjs/toolkit'

const GlobalSlice = createSlice({
    name: 'global',
    initialState: {
        products: [],
        searchAfter: '',
        total: 0,
        query: null,
    },
    reducers: {
        addProducts: (state:any, action:any) => {
            state.products.push(...action.payload)
        },
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setSearchAfter: (state, action) => {
            state.searchAfter = action.payload
        },
        setTotal : (state, action) => {
            state.total = action.payload
        },
        setQuery: (state, action) => {
            state.query = action.payload
        }
    }
})

export const {
    addProducts,
    setSearchAfter,
    setTotal,
    setProducts,
    setQuery
} = GlobalSlice.actions

export default GlobalSlice.reducer