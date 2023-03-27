import React from 'react'
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Stack from "@mui/material/Stack"

import {useDispatch} from "react-redux"
import SearchInput from "./SearchInput"


function SearchBar() {

    const dispatch = useDispatch()

    return (
        <AppBar
            position={`static`}
            sx={{
                display: {xs: 'none', md: 'block'},
                width: '100%',
                bgcolor: 'white',
                padding: 2,
                margin: 0
            }}
        >
            <Toolbar>
                <SearchInput/>
                <Stack
                    sx={{
                        display: {xs: "block", md: 'none'},
                        marginLeft: 'auto'
                    }}
                    direction='row'
                    spacing={2}
                >
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default SearchBar