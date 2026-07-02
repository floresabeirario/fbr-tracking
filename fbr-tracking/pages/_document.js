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
          @font-face{font-family:'TanMemories';src:url('/fonts/TAN-MEMORIES.otf') format('opentype');font-display:swap;}
          @font-face{font-family:'TanMemories';src:url('/fonts/TAN-MEMORIES-Italic.otf') format('opentype');font-style:italic;font-display:swap;}
          *,*::before,*::after{box-sizing:border-box;}
          /* Feedback de hover/focus (os estilos base vivem inline nas páginas;
             aqui só mexemos em propriedades que o inline não define) */
          .fbr-btn{transition:filter .18s ease,transform .18s ease,box-shadow .18s ease;}
          .fbr-btn:hover{filter:brightness(1.07);transform:translateY(-1px);box-shadow:0 4px 14px rgba(47,62,50,0.18);}
          .fbr-btn:active{transform:translateY(0);filter:brightness(.97);}
          .fbr-toggle{transition:filter .18s ease;}
          .fbr-toggle:hover{filter:brightness(.97);}
          .fbr-input{transition:box-shadow .18s ease;}
          .fbr-input:focus{box-shadow:0 0 0 3px rgba(67,104,80,0.18);}
          .fbr-social{transition:transform .18s ease;}
          .fbr-social:hover{transform:translateY(-2px);}
        `}} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
