import Head from 'next/head';
import { getEncomendaById } from '../utils/googleSheets';

export default function Tracking({ encomenda }) {
  // --- MENSAGEM WHATSAPP ---
  // A mensagem já vai escrita quando clicam
  const whatsappNumber = "351934680300";
  const whatsappMessage = `Olá! Gostaria de saber mais detalhes sobre a minha encomenda ${encomenda ? encomenda.nome_encomenda : ''}.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // --- PÁGINA DE ERRO (Dark Mode) ---
  if (!encomenda) {
    return (
      <div style={styles.pageWrapper}>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Italiana&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet" />
        </Head>
        <div style={styles.card}>
          <h1 style={styles.headingSerif}>Encomenda não encontrada</h1>
          <p style={styles.textSecondary}>Order not found</p>
          <div style={styles.divider}></div>
          <p style={styles.textBody}>
            Não encontramos este número. Por favor, verifique o link.
          </p>
          <a href={whatsappUrl} style={styles.buttonPrimary}>
            Fale connosco no WhatsApp
          </a>
        </div>
      </div>
    );
  }

  // --- PÁGINA PRINCIPAL ---
  return (
    <div style={styles.pageWrapper}>
      <Head>
        <title>Rastreio | Flores à Beira-Rio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        {/* FONTES: Italiana (Luxo) + Montserrat (Moderno) */}
        <link href="https://fonts.googleapis.com/css2?family=Italiana&family=Montserrat:wght@200;300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <div style={styles.card}>
        
        {/* Cabeçalho */}
        <header style={styles.header}>
          <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" style={styles.brandLink}>
            <h1 style={styles.brandName}>Flores à Beira-Rio</h1>
          </a>
          <p style={styles.tagline}>PRESERVATION ATELIER</p>
        </header>

        <main>
          <p style={styles.introText}>
            A preservar memórias.<br />
            <span style={styles.introTranslation}>Preserving memories.</span>
          </p>

          <h2 style={styles.clientName}>{encomenda.nome_encomenda}</h2>

          {/* STATUS PRINCIPAL */}
          <div style={styles.statusContainer}>
            <span style={styles.statusLabel}>Fase Atual / Current Stage</span>
            
            <div style={styles.statusMain}>
              {encomenda.fase}
            </div>

            <div style={styles.goldDivider}></div>

            <p style={styles.message}>
              {encomenda.mensagem}
            </p>
          </div>

          {/* ÚLTIMA ATUALIZAÇÃO (Destaque maior) */}
          <div style={styles.updateRow}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 8}}>
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <p style={styles.updateText}>
              <span style={{color: '#D4AF37', fontWeight: 600}}>Última atualização:</span> {encomenda.ultima_atualizacao}
            </p>
          </div>

          {/* DATA DE ENTREGA (Centrado) */}
          <div style={styles.deliveryWrapper}>
            <div style={styles.deliveryBox}>
              <span style={styles.deliveryLabel}>Entrega estimada (Quadro)</span>
              <span style={styles.deliveryLabelEn}>Estimated delivery (Frame)</span>
              <p style={styles.deliveryDate}>{encomenda.data_entrega}</p>
            </div>
          </div>

          {/* BOTÕES DE AÇÃO */}
          <div style={styles.actionButtons}>
            
            {/* WhatsApp (Botão Principal) */}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={styles.buttonWhatsApp}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{marginRight: 10}}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.355-5.029c.002-5.45 4.439-9.884 9.894-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              Enviar Mensagem WhatsApp
            </a>

            {/* Site */}
            <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" style={styles.buttonSite}>
              Visitar Site / Visit Website
            </a>
          </div>

        </main>

        {/* Rodapé Social */}
        <footer style={styles.footer}>
          
          <div style={styles.socialIcons}>
            <a href="https://www.instagram.com/floresabeirario/" target="_blank" style={styles.iconLink}>IG</a>
            <a href="https://www.facebook.com/floresabeirario/" target="_blank" style={styles.iconLink}>FB</a>
            <a href="https://share.google/cii2zipc8jx1Wjkop" target="_blank" style={styles.iconLink}>G+</a>
          </div>

          <p style={styles.location}>Coimbra, Portugal</p>
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

// --- ESTILOS DARK PREMIUM ---
const styles = {
  pageWrapper: {
    minHeight: '100vh',
    backgroundColor: '#121212', // Fundo da página quase preto
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: '"Montserrat", sans-serif',
    color: '#E0E0E0',
  },
  card: {
    backgroundColor: '#1E1E1E', // Cartão cinza escuro
    width: '100%',
    maxWidth: '450px',
    padding: '40px 25px',
    boxShadow: '0 25px 50px rgba(0,0,0,0.5)', // Sombra dramática
    borderRadius: '8px', // Cantos menos arredondados = mais premium
    textAlign: 'center',
    border: '1px solid #333', // Borda subtil
  },

  // HEADER
  header: { marginBottom: '30px' },
  brandLink: { textDecoration: 'none', cursor: 'pointer' },
  brandName: {
    fontFamily: '"Italiana", serif', // Fonte de Luxo
    fontSize: '32px',
    color: '#F2F0E9', // Branco Pérola
    margin: '0',
    fontWeight: '400',
    letterSpacing: '0.02em',
  },
  tagline: {
    fontSize: '10px',
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: '#D4AF37', // Dourado
    marginTop: '8px',
  },

  // INTRO
  introText: {
    fontSize: '14px',
    color: '#AAA',
    marginBottom: '30px',
    lineHeight: '1.4',
  },
  introTranslation: {
    fontSize: '12px',
    color: '#666',
    fontStyle: 'italic',
  },

  // CLIENTE
  clientName: {
    fontFamily: '"Italiana", serif',
    fontSize: '30px',
    color: '#FFFFFF',
    margin: '0 0 30px 0',
    fontWeight: '400',
  },

  // STATUS
  statusContainer: {
    backgroundColor: '#252525', // Ligeiramente mais claro que o cartão
    padding: '30px 20px',
    borderRadius: '4px',
    border: '1px solid #333',
    marginBottom: '25px',
  },
  statusLabel: {
    display: 'block',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: '#888',
    marginBottom: '15px',
  },
  statusMain: {
    fontFamily: '"Italiana", serif',
    fontSize: '26px',
    color: '#D4AF37', // Texto da fase em Dourado
    marginBottom: '15px',
  },
  goldDivider: {
    width: '40px',
    height: '1px',
    backgroundColor: '#D4AF37',
    margin: '0 auto 15px auto',
    opacity: 0.5,
  },
  message: {
    fontSize: '15px',
    lineHeight: '1.7',
    color: '#DDD', // Branco suave para leitura
    fontWeight: '300',
  },

  // ÚLTIMA ATUALIZAÇÃO (Destaque)
  updateRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '35px',
    backgroundColor: '#2A2A2A',
    padding: '10px',
    borderRadius: '50px',
    display: 'inline-flex', // Para se ajustar ao conteúdo
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  updateText: {
    fontSize: '13px',
    color: '#EEE',
    margin: 0,
  },

  // DATA (CORREÇÃO DE CENTRAMENTO)
  deliveryWrapper: {
    display: 'flex', // Flexbox para centrar
    justifyContent: 'center',
    width: '100%',
    marginBottom: '40px',
  },
  deliveryBox: {
    padding: '15px 30px',
    border: '1px solid #444', 
    borderRadius: '4px',
    backgroundColor: '#1E1E1E',
    textAlign: 'center',
  },
  deliveryLabel: {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    color: '#BBB',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  deliveryLabelEn: {
    display: 'block',
    fontSize: '10px',
    color: '#666',
    marginBottom: '5px',
  },
  deliveryDate: {
    fontFamily: '"Italiana", serif',
    fontSize: '22px',
    color: '#FFF',
    marginTop: '5px',
  },

  // BOTÕES
  actionButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '30px',
  },
  buttonWhatsApp: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366', // Verde WhatsApp
    color: 'white',
    padding: '14px',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '14px',
    boxShadow: '0 4px 10px rgba(37, 211, 102, 0.2)',
    transition: 'opacity 0.2s',
  },
  buttonSite: {
    display: 'block',
    backgroundColor: 'transparent',
    border: '1px solid #555',
    color: '#AAA',
    padding: '14px',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  
  // FOOTER
  footer: {
    borderTop: '1px solid #333',
    paddingTop: '30px',
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '20px',
  },
  iconLink: {
    color: '#888',
    textDecoration: 'none',
    fontSize: '12px',
    border: '1px solid #444',
    width: '35px',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'all 0.2s',
  },
  location: {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    color: '#666',
    marginBottom: '10px',
  },
  copyright: {
    fontSize: '10px',
    color: '#444',
  },

  // ERRO
  headingSerif: { fontFamily: '"Italiana", serif', color: '#D4AF37', fontSize: '28px' },
  textSecondary: { color: '#888', fontStyle: 'italic' },
  textBody: { marginBottom: '25px', color: '#CCC' },
  buttonPrimary: { display: 'inline-block', backgroundColor: '#D4AF37', color: '#111', padding: '12px 30px', borderRadius: '4px', textDecoration: 'none', fontWeight: '600' },
  divider: { height: '1px', backgroundColor: '#333', margin: '20px auto', width: '50px' }
};
