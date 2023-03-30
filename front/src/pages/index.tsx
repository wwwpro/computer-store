import Head from 'next/head'
import {useDispatch, useSelector} from "react-redux"

import useSWR from 'swr'

import {addProducts, setTotal} from "@/_slice"
import ProductGrid from "@/components/ProductGrid"
import {API_URL} from "@/constants"



export default function Home() {

    const dispatch = useDispatch()

    const searchAfter = useSelector((state: any) => state.global.searchAfter)
    const query = useSelector((state: any) => state.global.query)

    const url = new URL(API_URL)
    if (searchAfter) {
        url.searchParams.set('sa', searchAfter)
    }
    if (query) {
        url.searchParams.set('q', query)
    }
    const {isLoading, error} = useSWR(url.toString(), {
        revalidateOnFocus: false,
        onSuccess: (data) => {
            dispatch(addProducts(data.hits.hits))
            dispatch(setTotal(data.hits.total.value))
        }
    })
    if (error) return <div>No data</div>

    return (
        <>
            <Head>
                <title>Dylan Burris - Computer Store</title>
                <meta name="description" content="Dylan Burris Demo Computer App"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <ProductGrid isLoading={isLoading} />
        </>
    )
}
