import Document, { Html, Head, Main, NextScript } from "next/document"

class ExtendedDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html
        prefix="og: http://ogp.me/ns# 
                video: http://ogp.me/ns/video#"
      >
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default ExtendedDocument
