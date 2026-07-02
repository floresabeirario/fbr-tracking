// ============================================================
// fbr-tracking — topo e rodapé partilhados pelas páginas
// (home, encomenda e erro), para não haver 3 cópias do mesmo JSX.
// Design "Herbário": papel cream, wordmark verde, sem banner escuro
// — o cartão escuro é agora o palco do estado na página da encomenda.
// ============================================================

// Raminho decorativo com quatro flores diferentes, desenhadas à mão
// em line-art pastel: margarida rosa, tulipa lilás, flor de cinco
// pétalas amarela e raminho de folhas verde.
export function BouquetSvg({ className }) {
  return (
    <svg className={className} viewBox="0 0 210 240" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* Margarida rosa */}
      <g stroke="#D98E96">
        <path d="M52 234 C50 192 56 152 54 110" />
        <ellipse cx="54" cy="79" rx="4.5" ry="10" />
        <ellipse cx="54" cy="79" rx="4.5" ry="10" transform="rotate(60 54 92)" />
        <ellipse cx="54" cy="79" rx="4.5" ry="10" transform="rotate(120 54 92)" />
        <ellipse cx="54" cy="79" rx="4.5" ry="10" transform="rotate(180 54 92)" />
        <ellipse cx="54" cy="79" rx="4.5" ry="10" transform="rotate(240 54 92)" />
        <ellipse cx="54" cy="79" rx="4.5" ry="10" transform="rotate(300 54 92)" />
        <circle cx="54" cy="92" r="4" />
      </g>
      {/* Tulipa lilás */}
      <g stroke="#B5A3CF">
        <path d="M108 234 C106 196 110 166 109 132" />
        <path d="M97 110 C97 97 102 90 109 88 C116 90 121 97 121 110 C121 120 116 125 109 125 C102 125 97 120 97 110 Z" />
        <path d="M103 93 C104 103 104 113 106 123 M115 93 C114 103 114 113 112 123" />
        <path d="M108 192 C96 186 90 174 89 160 C101 166 107 178 108 192 Z" />
      </g>
      {/* Flor de cinco pétalas, amarelo-manteiga */}
      <g stroke="#CDB86B">
        <path d="M158 234 C157 206 161 186 160 162" />
        <ellipse cx="160" cy="137" rx="4" ry="8.5" />
        <ellipse cx="160" cy="137" rx="4" ry="8.5" transform="rotate(72 160 148)" />
        <ellipse cx="160" cy="137" rx="4" ry="8.5" transform="rotate(144 160 148)" />
        <ellipse cx="160" cy="137" rx="4" ry="8.5" transform="rotate(216 160 148)" />
        <ellipse cx="160" cy="137" rx="4" ry="8.5" transform="rotate(288 160 148)" />
        <circle cx="160" cy="148" r="3.5" />
      </g>
      {/* Raminho de folhas verde */}
      <g stroke="#9DBF9E">
        <path d="M187 234 C184 192 190 152 188 118" />
        <path d="M188 142 C178 138 173 130 172 120 C181 124 186 132 188 142 Z" />
        <path d="M188 168 C198 164 203 156 204 146 C195 150 190 158 188 168 Z" />
        <path d="M188 196 C178 192 173 184 172 174 C181 178 186 186 188 196 Z" />
      </g>
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
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#84907C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
        <a href="https://www.facebook.com/floresabeirario/" target="_blank" rel="noopener noreferrer" className="social" aria-label="Facebook">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#84907C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        </a>
        <a href="https://maps.app.goo.gl/qGGdyE8mo2kdNBmm7" target="_blank" rel="noopener noreferrer" className="social" aria-label="Maps">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#84907C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
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
