import {createSlice} from '@reduxjs/toolkit'

const SearchBarSlice = createSlice({
    name: 'searchBar',
    initialState: {
        search: '',
    },
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload
        }
    }
})

export const {
    setSearch,
} = SearchBarSlice.actions

export default SearchBarSlice.reducer