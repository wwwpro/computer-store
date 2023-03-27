import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import ProductItem from "@/components/ProductItem"
import Spinner from "@/components/Spinner"
import {Button} from "@mui/material"
import {setSearchAfter} from "@/_slice"
import {useDispatch, useSelector} from "react-redux"

function ProductGrid({isLoading}: { isLoading: boolean }) {
    const dispatch = useDispatch()

    const products = useSelector((state: any) => state.global.products)
    const total = useSelector((state: any) => state.global.total)

    const showMore = (products.length > 0) ? products.slice(-1)[0].sort[0] : ''
    const ofResults = products.length

    return (
        <>
            <Grid container spacing={5} sx={{maxWidth: '1450px', mx: 'auto'}}>
                <Grid item xs={12}>
                    <h1>Results</h1>
                    <p>Showing {ofResults} of {total}</p>
                </Grid>
                {
                    products.map((item: any, index: number) => (
                        <ProductItem key={`product-${index}`}
                                     title={item._source['title']}
                                     image={item._source['image']}
                                     price={item._source['price']}
                                     vendor={item._source['vendor']}
                                     strikedPrice={item._source['striked-price']}
                        />
                    ))
                }
                {
                    isLoading &&
                    <Spinner/>
                }
            </Grid>
            <Box sx={{my: 5, display: 'flex'}}>
                {
                    (ofResults < total) &&
                    <Button sx={{mx: 'auto'}} onClick={() => {
                        dispatch(setSearchAfter(showMore))
                    }}>Show more</Button>
                }

            </Box></>
    )
}

export default ProductGrid