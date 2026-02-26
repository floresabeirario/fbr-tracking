import Head from 'next/head';
import { getEncomendaById } from '../utils/googleSheets';

export default function Tracking({ encomenda }) {
  const whatsappNumber = "351934680300";
  const whatsappMessage = `Olá! Gostaria de saber mais sobre a encomenda ${encomenda ? encomenda.nome_encomenda : ''}.`;
  const whatsappErrorMsg = "Olá! Não consegui encontrar a minha encomenda no site.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(encomenda ? whatsappMessage : whatsappErrorMsg)}`;

  // --- FUNÇÃO PARA FORMATAR TEXTO (LINKS E QUEBRAS DE LINHA) ---
  const formatText = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => (
      <span key={index} style={{ display: 'block', minHeight: '1.2em' }}>
        {line.split(/(https?:\/\/[^\s]+)/g).map((part, i) => {
          if (part.match(/https?:\/\/[^\s]+/)) {
            return (
              <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{ color: '#436850', textDecoration: 'underline', fontWeight: '600', wordBreak: 'break-all' }}>
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
          <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
          <style dangerouslySetInnerHTML={{__html: `
            body { margin: 0; padding: 0; background-color: #F0F2F0; }
            @font-face { font-family: 'TanMemories'; src: url('/fonts/TAN-MEMORIES.otf') format('opentype'); font-weight: normal; font-style: normal; }
            @font-face { font-family: 'TanMemories'; src: url('/fonts/TAN-MEMORIES-Italic.otf') format('opentype'); font-weight: normal; font-style: italic; }
          `}} />
        </Head>
        <div style={styles.card}>
          <header style={styles.header}>
            <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" style={styles.brandLink}>
              <h1 style={styles.brandName}>Flores à<br />Beira-Rio</h1>
            </a>
            <div style={styles.taglineContainer}>
              <p style={styles.taglinePT}>Especialistas em preservação de flores</p>
              <p style={styles.taglineEN}>Flower preservation specialists</p>
            </div>
          </header>
          <div style={styles.headerDivider}></div>
          <main>
            <div style={{marginTop: '20px', marginBottom: '40px'}}>
              <h2 style={styles.errorTitlePT}>Encomenda não encontrada</h2>
              <h3 style={styles.errorTitleEN}>Order not found</h3>
              <div style={styles.divider}></div>
              <p style={styles.textBody}>Por favor, verifique o número da encomenda.</p>
              <p style={styles.textBodyEn}>Please check the order number.</p>
            </div>
            <div style={styles.actionSection}>
              <a href={whatsappUrl} style={styles.buttonAction}>Fale connosco / Chat with us</a>
              <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" style={styles.buttonSite}>
                <span style={{marginRight: '8px'}}>✿</span> Visitar Site / Visit Website
              </a>
            </div>
          </main>
          <footer style={styles.footer}>
            <p style={styles.copyright}>© Flores à Beira-Rio</p>
          </footer>
        </div>
      </div>
    );
  }

  // --- PÁGINA PRINCIPAL ---
  return (
    <div style={styles.pageWrapper}>
      <Head>
        <title>Status | Flores à Beira-Rio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{__html: `
          body { margin: 0; padding: 0; background-color: #F0F2F0; }
          @font-face { font-family: 'TanMemories'; src: url('/fonts/TAN-MEMORIES.otf') format('opentype'); font-weight: normal; font-style: normal; }
          @font-face { font-family: 'TanMemories'; src: url('/fonts/TAN-MEMORIES-Italic.otf') format('opentype'); font-weight: normal; font-style: italic; }
        `}} />
      </Head>

      <div style={styles.card}>
        <header style={styles.header}>
          <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" style={styles.brandLink}>
            <h1 style={styles.brandName}>Flores à<br />Beira-Rio</h1>
          </a>
          <div style={styles.taglineContainer}>
            <p style={styles.taglinePT}>Especialistas em preservação de flores</p>
            <p style={styles.taglineEN}>Flower preservation specialists</p>
          </div>
        </header>

        <div style={styles.headerDivider}></div>

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
            
            {/* FASE PT */}
            {encomenda.fase && <div style={styles.statusMainText}>{encomenda.fase}</div>}
            
            {/* FASE EN */}
            {encomenda.fase_en && <div style={styles.statusMainTextEn}>{encomenda.fase_en}</div>}
            
            <div style={{marginBottom: '15px'}}></div>

            {/* MENSAGEM PT */}
            {encomenda.mensagem && <div style={styles.message}>{formatText(encomenda.mensagem)}</div>}
            
            {/* MENSAGEM EN */}
            {encomenda.mensagem_en && <div style={styles.messageEn}>{formatText(encomenda.mensagem_en)}</div>}

            <div style={styles.updateBadge}>
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
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={styles.buttonAction}>Fale connosco / Chat with us</a>
            <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" style={styles.buttonSite}>
              <span style={{marginRight: '8px', fontSize: '18px', lineHeight: '1'}}>✿</span>
              Visitar Site / Visit Website
            </a>
          </div>
        </main>

        <footer style={styles.footer}>
          <div style={styles.socialRow}>
             <a href="https://www.instagram.com/floresabeirario/" target="_blank" rel="noopener noreferrer" style={styles.socialIcon} aria-label="Instagram">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                 <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                 <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
               </svg>
             </a>
             <a href="https://www.facebook.com/floresabeirario/" target="_blank" rel="noopener noreferrer" style={styles.socialIcon} aria-label="Facebook">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
               </svg>
             </a>
             <a href="https://maps.app.goo.gl/qGGdyE8mo2kdNBmm7" target="_blank" rel="noopener noreferrer" style={styles.socialIcon} aria-label="Maps">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                 <circle cx="12" cy="10" r="3"></circle>
               </svg>
             </a>
          </div>
          <a href="https://maps.app.goo.gl/qGGdyE8mo2kdNBmm7" target="_blank" rel="noopener noreferrer" style={styles.locationLink}>Coimbra, Portugal</a>
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
  pageWrapper: { minHeight: '100vh', backgroundColor: '#F0F2F0', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', fontFamily: '"Urbanist", sans-serif', color: '#1D1D1F' },
  card: { backgroundColor: '#FFFFFF', width: '100%', maxWidth: '460px', padding: '45px 30px', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)', borderRadius: '24px', textAlign: 'center' },
  header: { marginBottom: '20px' },
  brandLink: { textDecoration: 'none', cursor: 'pointer', color: 'inherit' },
  brandName: { fontFamily: '"TanMemories", serif', fontSize: '42px', margin: '0', fontWeight: '400', letterSpacing: '-0.01em', lineHeight: '1.15' },
  taglineContainer: { marginTop: '12px' },
  taglinePT: { fontSize: '14px', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#666', fontWeight: '600', margin: '0 0 2px 0' },
  taglineEN: { fontSize: '
