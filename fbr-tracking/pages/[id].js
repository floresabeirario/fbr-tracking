import Head from 'next/head';
import { getEncomendaById } from '../utils/googleSheets';

export default function Tracking({ encomenda }) {
  // Configuração WhatsApp
  const whatsappNumber = "351934680300";
  const whatsappMessage = `Olá! Gostaria de saber mais sobre a encomenda ${encomenda ? encomenda.nome_encomenda : ''}.`;
  const whatsappErrorMsg = "Olá! Não consegui encontrar a minha encomenda no site.";
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(encomenda ? whatsappMessage : whatsappErrorMsg)}`;

  // --- FUNÇÃO PARA FORMATAR TEXTO ---
  const formatText = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => (
      <span key={index} style={{ display: 'block', minHeight: '24px' }}>
        {line.split(/(https?:\/\/[^\s]+)/g).map((part, i) => {
          if (part.match(/https?:\/\/[^\s]+/)) {
            return (
              <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{ color: '#2F3E32', textDecoration: 'underline', fontWeight: '600', wordBreak: 'break-all' }}>
                {part}
              </a>
            );
          }
          return part;
        })}
      </span>
    ));
  };

  // --- PÁGINA DE ERRO ---
  if (!encomenda) {
    return (
      <div style={styles.pageWrapper}>
        <Head>
          <title>Rastreio | Flores à Beira-Rio</title>
          <link rel="icon" href="/icon.png" type="image/png" />
          {/* Apenas carrega a Outfit do Google Fonts */}
          <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
          
          {/* Carrega a tua fonte TAN MEMORIES */}
          <style dangerouslySetInnerHTML={{__html: `
            @font-face {
              font-family: 'TanMemories';
              src: url('/fonts/TAN-MEMORIES.otf') format('opentype');
              font-weight: normal;
              font-style: normal;
            }
            @font-face {
              font-family: 'TanMemories';
              src: url('/fonts/TAN-MEMORIES-Italic.otf') format('opentype');
              font-weight: normal;
              font-style: italic;
            }
          `}} />
        </Head>
        <div style={styles.card}>
          
          <header style={styles.header}>
            <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" style={styles.brandLink}>
              <h1 style={styles.brandName}>Flores à Beira-Rio</h1>
            </a>
            <div style={styles.taglineContainer}>
              <p style={styles.taglinePT}>Especialistas em preservação de flores</p>
              <p style={styles.taglineEN}>Flower preservation specialists</p>
            </div>
          </header>

          <div style={{marginTop: '20px', marginBottom: '40px'}}>
            <h2 style={styles.errorTitlePT}>Encomenda não encontrada</h2>
            <h3 style={styles.errorTitleEN}>Order not found</h3>
            <div style={styles.divider}></div>
            <p style={styles.textBody}>Por favor, verifique o número da encomenda.</p>
            <p style={styles.textBodyEn}>Please check the order number.</p>
          </div>

          <div style={styles.actionSection}>
            <a href={whatsappUrl} style={styles.buttonAction}>
               <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{marginRight: 10}}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.355-5.029c.002-5.45 4.439-9.884 9.894-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              Fale connosco / Chat with us
            </a>
            <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" style={styles.buttonSite}>
              <span style={{marginRight: '8px', fontSize: '18px', lineHeight: '1'}}>✿</span>
              Visitar Site / Visit Website
            </a>
          </div>

          <footer style={styles.footer}>
            <div style={styles.socialRow}>
              <a href="https://www.instagram.com/floresabeirario/" target="_blank" style={styles.socialIcon} aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://www.facebook.com/floresabeirario/" target="_blank" style={styles.socialIcon} aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://maps.app.goo.gl/qGGdyE8mo2kdNBmm7" target="_blank" style={styles.socialIcon} aria-label="Google">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M12.0003 10.9997V13.9997H17.2003C16.9903 15.3497 15.1903 17.6997 12.0003 17.6997C9.09028 17.6997 6.70029 15.2997 6.70029 12.3997C6.70029 9.49969 9.09028 7.09969 12.0003 7.09969C13.6903 7.09969 14.8003 7.79969 15.4503 8.39969L17.5503 6.29969C16.2003 4.99969 14.3003 4.19969 12.0003 4.19969C7.47029 4.19969 3.80029 7.86969 3.80029 12.3997C3.80029 16.9297 7.47029 20.5997 12.0003 20.5997C16.6003 20.5997 19.8003 17.2997 19.8003 12.6997C19.8003 11.9997 19.7403 11.4497 19.6403 10.9997H12.0003Z" fill="#555"/>
                </svg>
              </a>
            </div>
            <a href="https://maps.app.goo.gl/qGGdyE8mo2kdNBmm7" target="_blank" rel="noopener noreferrer" style={styles.locationLink}>
              Coimbra, Portugal
            </a>
            <p style={styles.copyright}>© Flores à Beira-Rio</p>
          </footer>
        </div>
      </div>
    );
  }

  // --- PÁGINA PRINCIPAL (SUCESSO) ---
  return (
    <div style={styles.pageWrapper}>
      <Head>
        <title>Status | Flores à Beira-Rio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/icon.png" type="image/png" />
        
        {/* Apenas carrega a Outfit do Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Carrega a tua fonte TAN MEMORIES */}
        <style dangerouslySetInnerHTML={{__html: `
          @font-face {
            font-family: 'TanMemories';
            src: url('/fonts/TAN-MEMORIES.otf') format('opentype');
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: 'TanMemories';
            src: url('/fonts/TAN-MEMORIES-Italic.otf') format('opentype');
            font-weight: normal;
            font-style: italic;
          }
        `}} />
      </Head>

      <div style={styles.card}>
        
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
          <div style={styles.introContainer}>
            <p style={styles.introText}>Acompanhe a sua preservação</p>
            <p style={styles.introTranslation}>Track your preservation journey</p>
          </div>

          <h2 style={styles.clientName}>{encomenda.nome_encomenda}</h2>

          <div style={styles.statusBox}>
            <div style={styles.statusHeaderRow}>
              <span style={styles.statusLabel}>Estado Atual / Status</span>
            </div>

            <div style={styles.statusMainText}>
              {encomenda.fase}
            </div>
            
            <div style={styles.message}>
              {formatText(encomenda.mensagem)}
            </div>

            <div style={styles.updateBadge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 6, opacity: 0.6}}>
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Atualizado a / Updated on: <strong>{encomenda.ultima_atualizacao}</strong>
            </div>
          </div>

          <div style={styles.deliveryContainer}>
            <div style={styles.deliveryContent}>
              <span style={styles.deliveryLabel}>Entrega estimada da sua encomenda</span>
              <span style={styles.deliveryLabelEn}>Estimated delivery of your order</span>
              <p style={styles.deliveryDate}>{encomenda.data_entrega}</p>
            </div>
          </div>

          <div style={styles.actionSection}>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={styles.buttonAction}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{marginRight: 10}}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.355-5.029c.002-5.45 4.439-9.884 9.894-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              Fale connosco / Chat with us
            </a>
            <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" style={styles.buttonSite}>
              <span style={{marginRight: '8px', fontSize: '18px', lineHeight: '1'}}>✿</span>
              Visitar Site / Visit Website
            </a>
          </div>
        </main>

        <footer style={styles.footer}>
          <div style={styles.socialRow}>
            <a href="https://www.instagram.com/floresabeirario/" target="_blank" style={styles.socialIcon} aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://www.facebook.com/floresabeirario/" target="_blank" style={styles.socialIcon} aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://maps.app.goo.gl/qGGdyE8mo2kdNBmm7" target="_blank" style={styles.socialIcon} aria-label="Google">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M12.0003 10.9997V13.9997H17.2003C16.9903 15.3497 15.1903 17.6997 12.0003 17.6997C9.09028 17.6997 6.70029 15.2997 6.70029 12.3997C6.70029 9.49969 9.09028 7.09969 12.0003 7.09969C13.6903 7.09969 14.8003 7.79969 15.4503 8.39969L17.5503 6.29969C16.2003 4.99969 14.3003 4.19969 12.0003 4.19969C7.47029 4.19969 3.80029 7.86969 3.80029 12.3997C3.80029 16.9297 7.47029 20.5997 12.0003 20.5997C16.6003 20.5997 19.8003 17.2997 19.8003 12.6997C19.8003 11.9997 19.7403 11.4497 19.6403 10.9997H12.0003Z" fill="#555"/>
              </svg>
            </a>
          </div>
          
          <a href="https://maps.app.goo.gl/qGGdyE8mo2kdNBmm7" target="_blank" rel="noopener noreferrer" style={styles.locationLink}>
            Coimbra, Portugal
          </a>
          
          <p style={styles.copyright}>© Flores à Beira-Rio</p>
        </footer>

      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const encomenda = await getEncomendaById(id);

  return { props: { encomenda } };
}

// --- ESTILOS ---
const styles = {
  pageWrapper: {
    minHeight: '100vh',
    backgroundColor: '#F0F2F0', 
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
  header: { marginBottom: '35px' },
  brandLink: { textDecoration: 'none', cursor: 'pointer' },
  
  // A FONTE FOI SUBSTITUIDA AQUI
  brandName: {
    fontFamily: '"TanMemories", serif',
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
  introContainer: { marginBottom: '25px' },
  introText: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#2F3E32',
    margin: '0 0 4px 0',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  introTranslation: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#889',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  
  // A FONTE FOI SUBSTITUIDA AQUI
  clientName: {
    fontFamily: '"TanMemories", serif',
    fontSize: '30px',
    color: '#2F3E32', 
    margin: '0 0 35px 0',
    fontWeight: '400',
    lineHeight: '1.1',
  },
  statusBox: {
    backgroundColor: '#F7F9F8', 
    padding: '30px 25px',
    borderRadius: '20px',
    marginBottom: '30px',
    textAlign: 'left',
  },
  statusHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  statusLabel: {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontWeight: '700',
    color: '#86868B',
  },
  
  // A FONTE FOI SUBSTITUIDA AQUI
  statusMainText: {
    fontFamily: '"TanMemories", serif',
    fontSize: '32px',
    fontWeight: '400',
    fontStyle: 'italic', // Puxará automaticamente a versão Italic
    color: '#2F3E32',
    marginBottom: '15px',
    lineHeight: '1.1',
  },
  message: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#424245',
    marginBottom: '20px',
  },
  updateBadge: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    color: '#6E6E73',
    backgroundColor: '#FFFFFF',
    padding: '8px 12px',
    borderRadius: '50px',
    width: 'fit-content',
    boxShadow: '0 2px 5px rgba(0,0,0,0.03)',
  },
  deliveryContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '40px',
  },
  deliveryContent: {
    textAlign: 'center',
    padding: '10px 20px',
  },
  deliveryLabel: {
    display: 'block',
    fontSize: '16px',
    fontWeight: '700', 
    color: '#1D1D1F',
    marginBottom: '4px',
  },
  deliveryLabelEn: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#86868B',
    marginBottom: '8px',
  },
  
  // A FONTE FOI SUBSTITUIDA AQUI
  deliveryDate: {
    fontFamily: '"TanMemories", serif',
    fontStyle: 'italic', // Puxará automaticamente a versão Italic
    fontSize: '32px',
    fontWeight: '400',
    color: '#2F3E32',
    margin: 0,
  },
  actionSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '40px',
  },
  buttonAction: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2F3E32',
    color: '#FFFFFF',
    textDecoration: 'none',
    padding: '16px',
    borderRadius: '14px',
    fontSize: '15px',
    fontWeight: '600',
    transition: 'background 0.2s',
  },
  buttonSite: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    color: '#2F3E32',
    textDecoration: 'none',
    padding: '16px',
    borderRadius: '14px',
    fontSize: '15px',
    fontWeight: '600',
    border: '2px solid #2F3E32',
  },
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
  
  // A FONTE FOI SUBSTITUIDA AQUI
  errorTitlePT: {
    fontFamily: '"TanMemories", serif',
    fontSize: '34px',
    color: '#2F3E32',
    margin: '0 0 5px 0',
    fontWeight: '400',
    lineHeight: '1.1',
  },
  errorTitleEN: {
    fontFamily: '"TanMemories", serif',
    fontSize: '26px',
    color: '#86868B',
    margin: '0',
    fontWeight: '400',
    fontStyle: 'italic', // Puxará automaticamente a versão Italic
  },
  textBody: { fontSize: '16px', color: '#424245', lineHeight: '1.5', margin: 0 },
  textBodyEn: { fontSize: '14px', color: '#86868B', lineHeight: '1.5', marginTop: '5px' },
  divider: { height: '1px', backgroundColor: '#E5E5EA', margin: '20px auto', width: '100%' }
};
