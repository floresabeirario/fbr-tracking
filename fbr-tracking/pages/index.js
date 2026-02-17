import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [orderId, setOrderId] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (orderId.trim()) {
      router.push(`/${orderId.trim()}`);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <Head>
        <title>Status | Flores à Beira-Rio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        
        {/* FAVICON */}
        <link rel="icon" href="/icon.png" type="image/png" />

        {/* Fontes: Instrument Serif + Outfit */}
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div style={styles.card}>
        
        {/* Header */}
        <header style={styles.header}>
          <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" style={styles.brandLink}>
            <h1 style={styles.brandName}>Flores à Beira-Rio</h1>
          </a>
          <div style={styles.taglineContainer}>
            <p style={styles.taglinePT}>Especialistas em preservação de flores</p>
            <p style={styles.taglineEN}>Flower preservation specialists</p>
          </div>
        </header>

        <main>
          {/* Intro Section */}
          <div style={styles.welcomeSection}>
            <h2 style={styles.headingTitle}>A viagem das suas flores</h2>
            <h3 style={styles.headingSubtitle}>Your flowers' journey</h3>
            
            <div style={styles.textBlock}>
              <p style={styles.welcomeText}>
                Utilize o link que recebeu para acompanhar o progresso da sua preservação, ou insira o código da encomenda abaixo.
              </p>
              <p style={styles.welcomeTranslation}>
                Use the link you received to track your preservation progress, or enter your order code below.
              </p>
            </div>
          </div>

          {/* Formulário de Busca */}
          <form onSubmit={handleSearch} style={styles.searchForm}>
            <input
              type="text"
              placeholder="Ex: 2024001"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.buttonSearch}>
              Rastrear / Track
            </button>
          </form>

          {/* Botão Site com Flor */}
          <div style={styles.actionSection}>
            <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" style={styles.buttonSite}>
              <span style={{marginRight: '8px', fontSize: '18px', lineHeight: '1'}}>✿</span>
              Visitar Site / Visit Website
            </a>
          </div>
        </main>

        {/* Footer (IGUAL AO [ID].JS) */}
        <footer style={styles.footer}>
          <div style={styles.socialRow}>
             {/* Instagram */}
             <a href="https://www.instagram.com/floresabeirario/" target="_blank" style={styles.socialIcon} aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            {/* Facebook */}
            <a href="https://www.facebook.com/floresabeirario/" target="_blank" style={styles.socialIcon} aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            {/* Google - Link do Mapa */}
            <a href="https://maps.app.goo.gl/qGGdyE8mo2kdNBmm7" target="_blank" style={styles.socialIcon} aria-label="Google">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M12.0003 10.9997V13.9997H17.2003C16.9903 15.3497 15.1903 17.6997 12.0003 17.6997C9.09028 17.6997 6.70029 15.2997 6.70029 12.3997C6.70029 9.49969 9.09028 7.09969 12.0003 7.09969C13.6903 7.09969 14.8003 7.79969 15.4503 8.39969L17.5503 6.29969C16.2003 4.99969 14.3003 4.19969 12.0003 4.19969C7.47029 4.19969 3.80029 7.86969 3.80029 12.3997C3.80029 16.9297 7.47029 20.5997 12.0003 20.5997C16.6003 20.5997 19.8003 17.2997 19.8003 12.6997C19.8003 11.9997 19.7403 11.4497 19.6403 10.9997H12.0003Z" fill="#555"/>
              </svg>
            </a>
          </div>
          
          {/* Link do Google Maps (Texto) */}
          <a href="https://maps.app.goo.gl/qGGdyE8mo2kdNBmm7" target="_blank" rel="noopener noreferrer" style={styles.locationLink}>
            Coimbra, Portugal
          </a>
          
          <p style={styles.copyright}>© Flores à Beira-Rio</p>
        </footer>

      </div>
    </div>
  );
}

// --- ESTILOS ---
const styles = {
  pageWrapper: {
    minHeight: '100vh',
    backgroundColor: '#F0F2F0', // Eucalipto Pálido
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: '"Outfit", sans-serif',
    color: '#1D1D1F',
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    maxWidth: '460px',
    padding: '45px 30px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
    borderRadius: '24px',
    textAlign: 'center',
  },

  // HEADER
  header: { marginBottom: '35px' },
  brandLink: { textDecoration: 'none', cursor: 'pointer' },
  brandName: {
    fontFamily: '"Instrument Serif", serif',
    fontSize: '46px',
    color: '#1D1D1F',
    margin: '0',
    fontWeight: '400',
    letterSpacing: '-0.01em',
    lineHeight: '1',
  },
  taglineContainer: { marginTop: '8px' },
  taglinePT: {
    fontSize: '11px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#666',
    fontWeight: '600',
    margin: '0 0 2px 0',
  },
  taglineEN: {
    fontSize: '9px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#999',
    fontWeight: '500',
    margin: 0,
  },

  // WELCOME SECTION
  welcomeSection: {
    marginBottom: '35px',
  },
  headingTitle: {
    fontFamily: '"Instrument Serif", serif',
    fontSize: '32px',
    color: '#2F3E32', // Verde Musgo
    margin: '0 0 5px 0',
    fontWeight: '400',
    lineHeight: '1.1',
  },
  headingSubtitle: {
    fontFamily: '"Instrument Serif", serif',
    fontSize: '24px',
    color: '#86868B', // Cinza suave
    margin: '0 0 25px 0',
    fontWeight: '400',
    fontStyle: 'italic',
  },
  textBlock: {
    padding: '0 10px',
  },
  welcomeText: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#424245',
    marginBottom: '8px',
  },
  welcomeTranslation: {
    fontSize: '13px',
    lineHeight: '1.5',
    color: '#86868B',
    fontStyle: 'italic',
  },

  // SEARCH FORM
  searchForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '40px',
  },
  input: {
    padding: '16px',
    borderRadius: '14px',
    border: '1px solid #E5E5EA',
    fontSize: '16px',
    fontFamily: '"Outfit", sans-serif',
    textAlign: 'center',
    outline: 'none',
    backgroundColor: '#F9F9F9',
    transition: 'border 0.2s',
    color: '#1D1D1F',
  },
  buttonSearch: {
    backgroundColor: '#2F3E32', // Verde Musgo Profundo
    color: '#FFFFFF',
    border: 'none',
    padding: '16px',
    borderRadius: '14px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    fontFamily: '"Outfit", sans-serif',
  },

  // ACTION BUTTONS
  actionSection: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '40px',
  },
  buttonSite: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF',
    color: '#2F3E32',
    textDecoration: 'none',
    padding: '16px',
    borderRadius: '14px',
    fontSize: '15px',
    fontWeight: '600',
    border: '2px solid #2F3E32',
    cursor: 'pointer',
  },

  // FOOTER
  footer: {
    borderTop: '1px solid #F5F5F7',
    paddingTop: '30px',
  },
  socialRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '20px',
  },
  socialIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: '#F5F5F7',
    border: '1px solid #EEEEEE',
  },
  // ESTILO NOVO PARA O LINK
  locationLink: {
    display: 'inline-block',
    fontSize: '12px',
    fontWeight: '600',
    color: '#1D1D1F',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '8px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  copyright: {
    fontSize: '11px',
    color: '#86868B',
  },
};
