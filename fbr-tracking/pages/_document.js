import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{__html:`
          body{margin:0;padding:0;background-color:#F0F2F0;}
          @font-face{font-family:'TanMemories';src:url('/fonts/TAN-MEMORIES.otf') format('opentype');}
          @font-face{font-family:'TanMemories';src:url('/fonts/TAN-MEMORIES-Italic.otf') format('opentype');font-style:italic;}
          *,*::before,*::after{box-sizing:border-box;}
        `}} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
