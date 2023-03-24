import Box from "@mui/material/Box"
import Image from 'next/image'
import Grid from "@mui/material/Grid"
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import {grey, red} from "@mui/material/colors"

import Typography from "@mui/material/Typography"

import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import RedeemIcon from '@mui/icons-material/Redeem'
import {Button} from "@mui/material";

interface ProductItemProps {
    title: string
    image: string
    price: string
    strikedPrice?: string
    vendor: string
}

function ProductItem(props: ProductItemProps) {
    const {title, price, strikedPrice, vendor, image} = props
    const greyLevel = 500
    return (
        <Grid item xs={12} lg={3}>
            <Card sx={{p: 2, borderRadius: 6}}>
                <CardContent>
                    <Box sx={{position: 'relative', height: '150px', width: '150px', mx: 'auto'}}>
                        <Image src={image} alt={title} unoptimized fill style={{objectFit: 'contain'}}/>
                    </Box>
                    <Box>
                        <strong>{vendor}</strong>
                    </Box>
                    <Box sx={{
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        display: '-webkit-box',
                        'overflow': 'hidden',
                        mb: 2
                    }}>
                        {title}
                    </Box>
                    <Box sx={{display: 'flex'}}>
                        <Typography sx={{mr: 1, color: (strikedPrice) ? red[700]: '#000'}}>{price}</Typography>
                        {strikedPrice &&
                            <Typography sx={{textDecoration: 'line-through', color: grey[greyLevel]}}>{strikedPrice}</Typography>
                        }
                    </Box>
                    <hr color={grey[greyLevel]}/>
                    <Box sx={{display: 'flex'}}>
                        <Stack sx={{mr: 2}} direction={'row'} alignItems={'center'} gap={0.5}>
                            <LocalShippingIcon fontSize={'small'} sx={{color: grey[greyLevel]}}/>
                            <Typography sx={{fontSize: '0.8rem'}} color={grey[greyLevel]}>Free shipping</Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} gap={0.5}>
                            <RedeemIcon fontSize={'small'} sx={{color: grey[greyLevel]}}/>
                            <Typography sx={{fontSize: '0.8rem'}} color={grey[greyLevel]}>Free gift</Typography>
                        </Stack>
                    </Box>
                </CardContent>
                <CardActions>
                    <Button sx={{width: '100%', borderRadius: 6}} variant={'contained'}>VIEW DEAL</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default ProductItem