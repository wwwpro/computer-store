import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function Spinner() {

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "400px"
            }}
            m="auto"
        >
            <CircularProgress/>
        </Box>
    )
}

export default Spinner