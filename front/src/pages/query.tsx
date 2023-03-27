import {API_URL} from "@/pages/constants"
import useSWR from 'swr'
import {addProducts, setTotal} from "@/pages/slice";
import {useDispatch} from "react-redux";

function useSearch(searchAfter?: string | undefined, q?: string | undefined) {
    const dispatch = useDispatch()
    const url = new URL(API_URL)

    if (searchAfter) {
        url.searchParams.set('sa', searchAfter)
    }
    if (q) {
        url.searchParams.set('q', q)
    }

    const {data, error, isLoading} = useSWR(url, {
        revalidateOnFocus: false,
        onSuccess: (data) => {
            dispatch(addProducts(data.hits.hits))
            dispatch(setTotal(data.hits.total.value))
        }
    })

    return {
        data,
        isLoading,
        error
    }
}

export default useSearch