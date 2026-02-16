import Head from 'next/head';
import { getEncomendaById } from '../utils/googleSheets';

export default function Tracking({ encomenda }) {
  // Configuração WhatsApp
  const whatsappNumber = "351934680300";
  const whatsappMessage = `Olá! Gostaria de saber mais sobre a encomenda ${encomenda ? encomenda.nome_encomenda : ''}. / Hello! I'd like to know more about order ${encomenda ? encomenda.nome_encomenda : ''}.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // --- PÁGINA DE ERRO ---
  if (!encomenda) {
    return (
      <div style={styles.pageWrapper}>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        </Head>
        <div style={styles.card}>
          <h1 style={styles.headingError}>Encomenda não encontrada</h1>
          <p style={styles.textSecondary}>Order not found</p>
          <div style={styles.divider}></div>
          <p style={styles.textBody}>Por favor, verifique o número da encomenda.</p>
          <a href={whatsappUrl} style={styles.buttonWhatsApp}>
            Fale connosco / Chat with us
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
        {/* 'Inter' é a fonte mais parecida com a da Apple (San Francisco) */}
        {/* 'Cormorant Garamond' apenas para detalhes de luxo */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Cormorant+Garamond:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <div style={styles.card}>
        
        {/* Header (Clicável) */}
        <header style={styles.header}>
          <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" style={styles.brandLink}>
            <h1 style={styles.brandName}>Flores à Beira-Rio</h1>
          </a>
          <p style={styles.tagline}>PRESERVATION ATELIER</p>
        </header>

        <main>
          {/* Intro */}
          <div style={styles.introContainer}>
            <p style={styles.introText}>Acompanhe a sua preservação</p>
            <p style={styles.introTranslation}>Track your preservation journey</p>
          </div>

          {/* Nome do Cliente */}
          <h2 style={styles.clientName}>{encomenda.nome_encomenda}</h2>

          {/* STATUS BOX (Design Limpo Apple-style) */}
          <div style={styles.statusBox}>
            <div style={styles.statusHeaderRow}>
              <span style={styles.statusLabel}>Estado Atual / Status</span>
              {/* Indicador de "Pulsar" verde para mostrar atividade */}
              <span style={styles.pulseDot}></span>
            </div>

            <div style={styles.statusMainText}>
              {encomenda.fase}
            </div>
            
            <p style={styles.message}>
              {encomenda.mensagem}
            </p>

            {/* Última Atualização (Bem visível agora) */}
            <div style={styles.updateBadge}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 6}}>
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Atualizado em / Updated: <strong>{encomenda.ultima_atualizacao}</strong>
            </div>
          </div>

          {/* DATA ENTREGA (Centrado Perfeito) */}
          <div style={styles.deliveryContainer}>
            <div style={styles.deliveryContent}>
              <span style={styles.deliveryLabel}>Entrega estimada (Quadro)</span>
              <span style={styles.deliveryLabelEn}>Estimated delivery (Frame)</span>
              <p style={styles.deliveryDate}>{encomenda.data_entrega}</p>
            </div>
          </div>

          {/* BOTÕES DE AÇÃO */}
          <div style={styles.actionSection}>
            
            {/* WhatsApp Bilingue */}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={styles.buttonWhatsApp}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{marginRight: 10}}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.355-5.029c.002-5.45 4.439-9.884 9.894-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              Fale connosco / Chat with us
            </a>

            {/* Site Bilingue */}
            <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" style={styles.buttonSite}>
              Visitar Site / Visit Website
            </a>
          </div>
        </main>

        {/* FOOTER */}
        <footer style={styles.footer}>
          
          {/* Ícones Reais das Plataformas */}
          <div style={styles.socialRow}>
            {/* Instagram (Câmera) */}
            <a href="https://www.instagram.com/floresabeirario/" target="_blank" style={styles.socialIcon} aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* Facebook (F) */}
            <a href="https://www.facebook.com/floresabeirario/" target="_blank" style={styles.socialIcon} aria-label="Facebook">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>

            {/* Google Reviews (G) */}
            <a href="https://share.google/cii2zipc8jx1Wjkop" target="_blank" style={styles.socialIcon} aria-label="Google">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" stroke="none"></path>
                 <path d="M12.0003 10.9997V13.9997H17.2003C16.9903 15.3497 15.1903 17.6997 12.0003 17.6997C9.09028 17.6997 6.70029 15.2997 6.70029 12.3997C6.70029 9.49969 9.09028 7.09969 12.0003 7.09969C13.6903 7.09969 14.8003 7.79969 15.4503 8.39969L17.5503 6.29969C16.2003 4.99969 14.3003 4.19969 12.0003 4.19969C7.47029 4.19969 3.80029 7.86969 3.80029 12.3997C3.80029 16.9297 7.47029 20.5997 12.0003 20.5997C16.6003 20.5997 19.8003 17.2997 19.8003 12.6997C19.8003 11.9997 19.7403 11.4497 19.6403 10.9997H12.0003Z" fill="#555"/>
              </svg>
            </a>
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

// --- ESTILOS "INTERMEDIATE LUXURY" ---
const styles = {
  pageWrapper: {
    minHeight: '100vh',
    backgroundColor: '#F3F2F0', // "Stone" (Bege/Cinzento muito suave)
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif', // Estilo Apple
    color: '#1D1D1F', // Quase preto da Apple
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    maxWidth: '460px',
    padding: '45px 30px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)', // Sombra muito difusa e premium
    borderRadius: '24px', // Cantos suaves
    textAlign: 'center',
  },

  // HEADER
  header: { marginBottom: '35px' },
  brandLink: { textDecoration: 'none', cursor: 'pointer' },
  brandName: {
    fontFamily: '"Cormorant Garamond", serif', // Toque de florista apenas aqui
    fontSize: '34px',
    color: '#1D1D1F',
    margin: '0',
    fontWeight: '500',
    letterSpacing: '-0.02em',
  },
  tagline: {
    fontSize: '11px',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: '#86868B', // Cinza médio Apple
    marginTop: '6px',
    fontWeight: '600',
  },

  // INTRO
  introContainer: { marginBottom: '25px' },
  introText: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#424245',
    margin: 0,
  },
  introTranslation: {
    fontSize: '13px',
    color: '#86868B',
  },

  // NOME
  clientName: {
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: '32px',
    color: '#1D1D1F',
    margin: '0 0 30px 0',
    fontWeight: '500',
  },

  // STATUS BOX (O destaque)
  statusBox: {
    backgroundColor: '#F5F5F7', // Cinza muito claro (fundo padrão iOS)
    padding: '30px 25px',
    borderRadius: '20px',
    marginBottom: '30px',
    textAlign: 'left', // Texto alinhado à esquerda para leitura fácil
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
  pulseDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#34C759', // Verde Apple
    borderRadius: '50%',
    boxShadow: '0 0 0 2px rgba(52, 199, 89, 0.2)',
  },
  statusMainText: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '22px',
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: '15px',
  },
  message: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#424245',
    marginBottom: '20px',
    fontStyle: 'normal', // Inter fica melhor normal que itálico
  },
  updateBadge: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    color: '#6E6E73',
    backgroundColor: '#FFFFFF', // Badge branco sobre fundo cinza
    padding: '8px 12px',
    borderRadius: '8px',
    width: 'fit-content',
    boxShadow: '0 2px 5px rgba(0,0,0,0.03)',
  },

  // ENTREGA (CENTROU!)
  deliveryContainer: {
    display: 'flex',
    justifyContent: 'center', // Garante o centro horizontal
    marginBottom: '40px',
  },
  deliveryContent: {
    textAlign: 'center', // Garante que o texto dentro da div centra
    padding: '10px 20px',
  },
  deliveryLabel: {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: '2px',
  },
  deliveryLabelEn: {
    display: 'block',
    fontSize: '11px',
    color: '#86868B',
    marginBottom: '8px',
  },
  deliveryDate: {
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: '24px',
    fontWeight: '500',
    color: '#1D1D1F',
    margin: 0,
  },

  // BOTÕES
  actionSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '40px',
  },
  buttonWhatsApp: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366', // Verde Oficial
    color: '#FFFFFF',
    textDecoration: 'none',
    padding: '16px',
    borderRadius: '14px', // Raio estilo iOS
    fontSize: '15px',
    fontWeight: '600',
    boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)',
    transition: 'transform 0.1s',
  },
  buttonSite: {
    display: 'block',
    backgroundColor: '#FFFFFF',
    color: '#1D1D1F',
    textDecoration: 'none',
    padding: '16px',
    borderRadius: '14px',
    fontSize: '15px',
    fontWeight: '500',
    border: '1px solid #E5E5EA', // Borda subtil
  },

  // FOOTER
  footer: {
    borderTop: '1px solid #F5F5F7',
    paddingTop: '30px',
  },
  socialRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '25px', // Mais espaço entre ícones
    marginBottom: '20px',
  },
  socialIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px', // Touch target bom
    height: '44px',
    borderRadius: '50%',
    backgroundColor: '#F5F5F7',
    transition: 'background 0.2s',
  },
  location: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#1D1D1F',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '8px',
  },
  copyright: {
    fontSize: '11px',
    color: '#86868B',
  },

  // ERRO
  headingError: { fontFamily: '"Inter", sans-serif', fontSize: '24px', color: '#1D1D1F', marginBottom: '10px' },
  textSecondary: { color: '#86868B', fontSize: '14px' },
  textBody: { marginBottom: '30px', color: '#424245', lineHeight: '1.5' },
  divider: { height: '1px', backgroundColor: '#E5E5EA', margin: '20px auto', width: '100%' }
};
