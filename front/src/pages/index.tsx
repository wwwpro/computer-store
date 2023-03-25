import {useEffect, useState} from "react"

import Head from 'next/head'
import {Inter} from 'next/font/google'
// import styles from '@/styles/Home.module.css'
import Spinner from "../components/Spinner"
import Box from '@mui/material/Box'
import Grid from "@mui/material/Grid"


import ProductItem from "../components/ProductItem"
import {Button} from "@mui/material";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    const [data, setData] = useState<any>()
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('https://fbsbnimb39.execute-api.us-east-2.amazonaws.com/live/list')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })

    }, [])


    if (isLoading) return <Spinner />
    if (!data) return <div>No data</div>

    return (
        <>
            <Head>
                <title>Dylan Burris - Computer Store</title>
                <meta name="description" content="Dylan Burris Demo Computer App"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main style={{backgroundColor: '#fafafa'}}>
                <Grid container spacing={5} sx={{maxWidth: '1450px', mx: 'auto'}}>
                    {
                        data.products.map((item: any, index: number) => (
                            <ProductItem key={`product-${index}`}
                                title={item['title']}
                                image={item['image']}
                                price={item['price']}
                                vendor={item['vendor']}
                                strikedPrice={item['striked-price']}
                            />
                        ))
                    }
                </Grid>
                <Box sx={{my:5, display: 'flex'}}><Button sx={{mx: 'auto'}}>Show more</Button></Box>
            </main>
        </>
    )
}
