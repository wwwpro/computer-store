import {useCallback, useState} from "react"
import {InputAdornment, TextField} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import {useDispatch} from "react-redux"
import {debounce} from "lodash"
import {setProducts, setQuery, setSearchAfter, setTotal} from "@/_slice"


function SearchInput(props: any) {

    const dispatch = useDispatch()

    const {size} = props
    const [search, setSearch] = useState<string>('')

    const debounceSearch = useCallback(debounce((value: string) => {
        dispatch(setSearchAfter(null))
        dispatch(setTotal(0))
        dispatch(setQuery(value))
    }, 250), [])

    const handleSearch = (event: any) => {
        const value = event.target.value

        dispatch(setProducts([]))
        if (value === 0) {
            dispatch(setSearchAfter(null))
        }
        setSearch(value)
        debounceSearch(value)
    }


    return (
        <TextField
            fullWidth
            value={search}
            onChange={handleSearch}
            placeholder='Search'
            label=''
            size={(size) ? size : 'medium'}
            sx={{
                maxWidth: '1450px',
                mx: 'auto',
                boxShadow: 'none',
                "& .MuiOutlinedInput-root": {
                    borderRadius: 6,
                },
            }}
            InputProps={{
                type: 'search',
                startAdornment: (
                    <InputAdornment position='start'>
                        <SearchIcon/>
                    </InputAdornment>
                )
            }}
        />
    )

}

export default SearchInput