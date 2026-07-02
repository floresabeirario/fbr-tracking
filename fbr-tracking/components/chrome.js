// ============================================================
// fbr-tracking — cabeçalho e rodapé partilhados pelas páginas
// (home, encomenda e erro), para não haver 3 cópias do mesmo JSX.
// Cabeçalho escuro do main (a marca ancora a página); o corpo
// segue a estrutura "Herbário" definida em globals.css.
// ============================================================

// Flores decorativas em line-art (linhas finas, quase invisíveis,
// no cabeçalho escuro). Desenhadas à mão, sem dependências.
function MargaridaSvg({ className }) {
  return (
    <svg className={className} viewBox="0 0 120 160" fill="none" stroke="#E8F0E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M60 155 C57 120 62 90 59 62" />
      <path d="M59 108 C46 104 38 94 36 82 C50 87 57 96 59 108 Z" />
      <ellipse cx="60" cy="21" rx="5.5" ry="13" />
      <ellipse cx="60" cy="21" rx="5.5" ry="13" transform="rotate(45 60 42)" />
      <ellipse cx="60" cy="21" rx="5.5" ry="13" transform="rotate(90 60 42)" />
      <ellipse cx="60" cy="21" rx="5.5" ry="13" transform="rotate(135 60 42)" />
      <ellipse cx="60" cy="21" rx="5.5" ry="13" transform="rotate(180 60 42)" />
      <ellipse cx="60" cy="21" rx="5.5" ry="13" transform="rotate(225 60 42)" />
      <ellipse cx="60" cy="21" rx="5.5" ry="13" transform="rotate(270 60 42)" />
      <ellipse cx="60" cy="21" rx="5.5" ry="13" transform="rotate(315 60 42)" />
      <circle cx="60" cy="42" r="7" />
    </svg>
  );
}

function FlorCampoSvg({ className }) {
  return (
    <svg className={className} viewBox="0 0 120 160" fill="none" stroke="#E8F0E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M60 155 C58 130 62 105 60 80" />
      <path d="M60 122 C48 118 41 109 39 98 C51 103 58 111 60 122 Z" />
      <path d="M60 136 C70 133 76 126 78 117 C68 121 62 127 60 136 Z" />
      <ellipse cx="60" cy="25" rx="9" ry="13" />
      <ellipse cx="60" cy="25" rx="9" ry="13" transform="rotate(72 60 46)" />
      <ellipse cx="60" cy="25" rx="9" ry="13" transform="rotate(144 60 46)" />
      <ellipse cx="60" cy="25" rx="9" ry="13" transform="rotate(216 60 46)" />
      <ellipse cx="60" cy="25" rx="9" ry="13" transform="rotate(288 60 46)" />
      <circle cx="60" cy="46" r="5.5" />
    </svg>
  );
}

export function Hero({ tagline }) {
  return (
    <header className="hero">
      <MargaridaSvg className="hero-flor" />
      <FlorCampoSvg className="hero-flor2" />
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
