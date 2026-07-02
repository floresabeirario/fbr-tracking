// ============================================================
// fbr-tracking — cabeçalho e rodapé partilhados pelas páginas
// (home, encomenda e erro), para não haver 3 cópias do mesmo JSX.
// Cabeçalho escuro do main (a marca ancora a página); o corpo
// segue a estrutura "Herbário" definida em globals.css.
// ============================================================

// Flores decorativas em line-art (linhas finas, quase invisíveis,
// no cabeçalho escuro). Estilo ilustração botânica: flor vista de
// lado, pétalas em leque com alturas irregulares. Sem dependências.
function FlorLadoSvg({ className }) {
  return (
    <svg className={className} viewBox="0 0 120 160" fill="none" stroke="#E8F0E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M62 155 C58 118 64 82 60 52" />
      <path d="M60 50 C46 50 36 44 32 34 C44 34 54 42 60 50 Z" />
      <path d="M60 50 C48 44 40 32 42 18 C52 26 58 38 60 50 Z" />
      <path d="M60 50 C54 36 54 20 62 8 C68 20 66 38 60 50 Z" />
      <path d="M60 50 C72 42 78 30 76 16 C66 24 61 38 60 50 Z" />
      <path d="M60 50 C74 50 84 46 88 36 C76 34 66 42 60 50 Z" />
      <path d="M61 100 C50 96 43 88 41 78 C52 82 59 90 61 100 Z" />
      <path d="M61 88 C70 84 76 78 78 70" />
      <path d="M78 70 C74 64 75 57 80 53 C84 58 83 66 78 70 Z" />
    </svg>
  );
}

function BotaoFlorSvg({ className }) {
  return (
    <svg className={className} viewBox="0 0 120 160" fill="none" stroke="#E8F0E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M54 155 C52 122 58 92 55 62" />
      <path d="M55 60 C44 52 38 40 40 28 C50 36 54 48 55 60 Z" />
      <path d="M55 60 C51 46 52 30 59 20 C64 32 61 48 55 60 Z" />
      <path d="M55 60 C66 54 72 44 71 32 C62 40 57 50 55 60 Z" />
      <path d="M56 112 C46 108 40 100 38 90 C48 94 54 102 56 112 Z" />
      <path d="M55 128 C64 125 69 119 71 111 C63 114 57 120 55 128 Z" />
    </svg>
  );
}

export function Hero({ tagline }) {
  return (
    <header className="hero">
      <FlorLadoSvg className="hero-flor" />
      <BotaoFlorSvg className="hero-flor2" />
      <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" className="brand-link">
        <h1 className="brand">Flores à<br />Beira-Rio</h1>
      </a>
      <p className="tagline">{tagline}</p>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="socials">
        <a href="https://www.instagram.com/floresabeirario/" target="_blank" rel="noopener noreferrer" className="social" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
        <a href="https://www.facebook.com/floresabeirario/" target="_blank" rel="noopener noreferrer" className="social" aria-label="Facebook">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        </a>
        <a href="https://maps.app.goo.gl/qGGdyE8mo2kdNBmm7" target="_blank" rel="noopener noreferrer" className="social" aria-label="Maps">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        </a>
      </div>
      <a href="https://maps.app.goo.gl/qGGdyE8mo2kdNBmm7" target="_blank" rel="noopener noreferrer" className="loc">Coimbra, Portugal</a>
      <p className="copy">© Flores à Beira-Rio</p>
    </footer>
  );
}

export function WhatsappIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2 22l5.185-1.32A9.951 9.951 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}
