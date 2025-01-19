import Script from "next/script";
import React from "react";

const GoogleAnalyticsScript = () => {
  return (
    <>
      {" "}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-ZV6CJYXV1J"
      />
      <Script>
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-ZV6CJYXV1J');`}
      </Script>
    </>
  );
};

export default GoogleAnalyticsScript;
