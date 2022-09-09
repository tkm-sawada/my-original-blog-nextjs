import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SelectCategoryProvider } from '../components/providers/SelectCategoryProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SelectCategoryProvider>
      <Component {...pageProps} />
    </SelectCategoryProvider>
  )
}

export default MyApp
