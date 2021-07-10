import Head from "next/head";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Wrapper({children, title, isFrontPage = false}) {
  const trackerID = process.env.NEXT_PUBLIC_ANALYTICS_ID;

  return <div className={`wrapper ${!isFrontPage ? 'inner-page' : ''}`}>
    <Head>
      <title>{title}</title>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />

      {trackerID && <>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${trackerID}`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${trackerID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </>}
    </Head>

    <Header isFrontPage={isFrontPage} />

    <main>
      {children}
    </main>

    <Footer />
  </div>
}
