import Box from "@mui/material/Box";
import SearchBar from "@/components/SearchBar";

function Layout({children}: { children: React.ReactNode }) {
    return (
        <main>
            <Box sx={{mb: 5}}>
                <SearchBar/>
            </Box>
            {children}
        </main>
    )
}

export default Layout