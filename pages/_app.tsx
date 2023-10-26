import { ToastContainer } from 'react-toastify'
import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import '@rainbow-me/rainbowkit/styles.css'
import 'react-datepicker/dist/react-datepicker.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { Providers } from '@/services/provider'
import { Footer, Header, NavBtn, Spacer } from '@/components'
import { Provider } from 'react-redux'
import { store } from '@/store'

export default function App({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState<boolean>(false)

  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild || typeof window === 'undefined') {
    return null
  } else {
    return (
      <Providers pageProps={pageProps}>
        <Provider store={store}>
          <div className="min-h-screen flex">
            <div className="flex-1 overflow-auto relative">
              <Header />
              <Component {...pageProps} />
              <Spacer />
              <Footer />
              <NavBtn />
            </div>
          </div>

          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </Provider>
      </Providers>
    )
  }
}
