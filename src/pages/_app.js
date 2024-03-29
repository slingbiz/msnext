// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// Cookie Provider
import { CookiesProvider } from "react-cookie"

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports

import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

import { wrapper, store } from '../redux/store'
import { Provider } from 'react-redux'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import SocketsProvider from 'src/@core/context/socket.context'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'

import { GoogleAnalytics } from 'nextjs-google-analytics'

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <Provider store={store}>
      <CookiesProvider>
        <CacheProvider value={emotionCache}>
          <SocketsProvider>
            <Head>
              <title>{`${themeConfig.templateName} - ${themeConfig.templateTitle}`}</title>
              <meta name='description' content={`${themeConfig.templateName} – ${themeConfig.templateDescription}`} />
              <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
              <meta name='viewport' content='initial-scale=1, width=device-width' />
            </Head>

            <SettingsProvider>
              <GoogleAnalytics strategy='lazyOnload' trackPageViews />

              <SettingsConsumer>
                {({ settings }) => {
                  return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
                }}
              </SettingsConsumer>
            </SettingsProvider>
          </SocketsProvider>
        </CacheProvider>
      </CookiesProvider>
    </Provider>
  )
}

export default wrapper.withRedux(App)
