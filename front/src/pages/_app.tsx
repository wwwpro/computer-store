import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {theme} from '../styles/theme'
import {ThemeProvider} from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import {Provider} from "react-redux"
import store from "../store"
import useSWR, {SWRConfig} from "swr"
import Layout from "@/components/Layout";

export default function App({Component, pageProps}: AppProps) {
    return (
        <Provider store={store}>
            <SWRConfig
                value={{
                    fetcher: (url: string) => fetch(url).then((res) => res.json()),
                }}
            >
                <ThemeProvider theme={theme}>
                    <Layout>
                        <CssBaseline/>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </SWRConfig>
        </Provider>
    )
}
