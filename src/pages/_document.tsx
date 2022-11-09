import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

import { CssBaseline } from '@nextui-org/react'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles]),
    }
  }

  render() {
    return (
      <Html lang="zh-cn">
        <Head>
          <meta charSet="UTF-8" />
          {CssBaseline.flush()}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
