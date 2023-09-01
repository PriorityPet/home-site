import Script from 'next/script'
 
function ScriptGoogle() {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-CF62CWW0RQ" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-CF62CWW0RQ');
        `}
      </Script>
    </>
  )
}
 
export default ScriptGoogle