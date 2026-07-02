// ============================================================
// fbr-tracking — topo e rodapé partilhados pelas páginas
// (home, encomenda e erro), para não haver 3 cópias do mesmo JSX.
// Design "Herbário": papel cream, wordmark verde, sem banner escuro
// — o cartão escuro é agora o palco do estado na página da encomenda.
// ============================================================

// Raminho botânico decorativo (linhas finas, quase invisível).
// Desenhado à mão, sem dependências.
export function FlorSvg({ className }) {
  return (
    <svg className={className} viewBox="0 0 120 160" fill="none" stroke="#E8F0E9" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M60 155 C56 110 62 70 58 26" />
      <path d="M59 96 C42 90 32 76 30 58 C48 64 57 78 59 96 Z" />
      <path d="M59 66 C76 60 86 46 88 28 C70 34 61 48 59 66 Z" />
      <circle cx="58" cy="16" r="7" />
      <path d="M58 2 v5 M44 16 h5 M67 16 h5 M48 6 l3.5 3.5 M68 6 l-3.5 3.5" />
    </svg>
  );
}

export function Mast({ tagline }) {
  return (
    <header className="mast">
      <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" className="wordmark">
        Flores à Beira-Rio
      </a>
      <p className="mast-tag">{tagline}</p>
      <hr className="mast-rule" />
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="socials">
        <a href="https://www.instagram.com/floresabeirario/" target="_blank" rel="noopener noreferrer" className="social" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A8676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
        <a href="https://www.facebook.com/floresabeirario/" target="_blank" rel="noopener noreferrer" className="social" aria-label="Facebook">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A8676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        </a>
        <a href="https://maps.app.goo.gl/qGGdyE8mo2kdNBmm7" target="_blank" rel="noopener noreferrer" className="social" aria-label="Maps">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A8676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
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
