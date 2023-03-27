import {configureStore} from "@reduxjs/toolkit"
import GlobalSlice from "../pages/slice"
import SearchBarSlice from "../components/SearchBar/SearchInput/slice"


export default configureStore({
        reducer: {
            global: GlobalSlice,
            searchBar: SearchBarSlice,
        }
    }
)