import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head >
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
      <Main />
      <NextScript />
      </body>
    </Html>
  )
}
