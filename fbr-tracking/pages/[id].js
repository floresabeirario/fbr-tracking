import Head from 'next/head';
import { getEncomendaById } from '../utils/googleSheets';

export default function Tracking({ encomenda }) {
  // --- PÁGINA DE ERRO ---
  if (!encomenda) {
    return (
      <div style={styles.pageWrapper}>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Quicksand:wght@300;400;500;600&display=swap" rel="stylesheet" />
        </Head>
        <div style={styles.card}>
          <h1 style={styles.headingSerif}>Encomenda não encontrada</h1>
          <p style={styles.textSecondary}>Order not found</p>
          <div style={styles.divider}></div>
          <p style={styles.textBody}>
            Não encontramos esta encomenda. Por favor, confirme o número.
          </p>
          <a href="mailto:info@floresabeirario.pt" style={styles.mainButton}>
            Fale connosco
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
        {/* Playfair (Sofisticado) + Quicksand (Arredondado/Fofo) */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Quicksand:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <div style={styles.card}>
        
        {/* Cabeçalho (Agora clicável para o site) */}
        <header style={styles.header}>
          <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" style={styles.brandLink}>
            <h1 style={styles.brandName}>Flores à Beira-Rio</h1>
          </a>
          <p style={styles.tagline}>PRESERVATION ATELIER</p>
        </header>

        <main>
          {/* Introdução */}
          <div style={styles.introBox}>
            <p style={styles.introText}>Olá! Estamos a cuidar das suas flores.</p>
            <p style={styles.introTranslation}>Hello! We are taking care of your flowers.</p>
          </div>

          {/* Nome da Encomenda */}
          <h2 style={styles.clientName}>{encomenda.nome_encomenda}</h2>

          {/* Status Principal */}
          <div style={styles.statusContainer}>
            <div style={styles.statusHeader}>
              <span style={styles.statusLabel}>Fase Atual / Current Stage</span>
            </div>
            
            <div style={styles.statusMain}>
              {encomenda.fase}
            </div>

            {/* Linha decorativa ondulada (SVG) para ser mais fofo */}
            <div style={styles.waveLine}>
               <svg width="40" height="6" viewBox="0 0 40 6" fill="none">
                 <path d="M0 3C2.5 0.5 5 0.5 7.5 3C10 5.5 12.5 5.5 15 3C17.5 0.5 20 0.5 22.5 3C25 5.5 27.5 5.5 30 3C32.5 0.5 35 0.5 37.5 3" stroke="#D4C5B0" strokeWidth="1.5" strokeLinecap="round"/>
               </svg>
            </div>

            <p style={styles.message}>
              "{encomenda.mensagem}"
            </p>
          </div>

          {/* Data de Entrega (Craft style) */}
          <div style={styles.deliveryBox}>
            <span style={styles.deliveryLabel}>Entrega estimada do quadro</span>
            <span style={styles.deliveryLabelEn}>Estimated delivery (frame)</span>
            <p style={styles.deliveryDate}>{encomenda.data_entrega}</p>
          </div>
        </main>

        {/* Contactos */}
        <div style={styles.contactSection}>
          <p style={styles.contactTitle}>Dúvidas? / Questions?</p>
          <div style={styles.contactLinks}>
            <a href="mailto:info@floresabeirario.pt" style={styles.contactLink}>
              info@floresabeirario.pt
            </a>
            <a href="tel:+351934680300" style={styles.contactLink}>
              +351 934 680 300
            </a>
          </div>
        </div>

        {/* Rodapé Social & Site */}
        <footer style={styles.footer}>
          
          {/* Botão para o Site Principal */}
          <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" style={styles.siteButton}>
            Visitar o nosso Site
          </a>

          {/* Ícones Sociais (Redondos e Fofos) */}
          <div style={styles.socialIcons}>
            
            {/* Instagram */}
            <a href="https://www.instagram.com/floresabeirario/" target="_blank" rel="noopener noreferrer" style={styles.iconLink} aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* Facebook */}
            <a href="https://www.facebook.com/floresabeirario/" target="_blank" rel="noopener noreferrer" style={styles.iconLink} aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>

            {/* Google Reviews */}
            <a href="https://share.google/cii2zipc8jx1Wjkop" target="_blank" rel="noopener noreferrer" style={styles.iconLink} aria-label="Google Reviews">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
            </a>

          </div>

          <p style={styles.location}>Coimbra, Portugal</p>
          <div style={styles.lastUpdate}>
            <small>Atualizado em: {encomenda.ultima_atualizacao}</small>
          </div>
          
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

// --- ESTILOS MOBILE-FIRST (Boutique & Cute) ---
const styles = {
  pageWrapper: {
    minHeight: '100vh',
    backgroundColor: '#FDFCF8', // Branco pérola quente
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px',
    fontFamily: '"Quicksand", sans-serif',
    color: '#555',
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    maxWidth: '450px', // Largura ideal para telemóvel
    padding: '40px 25px',
    boxShadow: '0 15px 35px rgba(212, 197, 176, 0.15)', // Sombra "quente"
    borderRadius: '24px', // Cantos muito arredondados (Cute)
    textAlign: 'center',
    position: 'relative',
    border: '1px solid #FAF5F0',
  },

  // HEADER
  header: { marginBottom: '30px' },
  brandLink: { textDecoration: 'none', cursor: 'pointer' },
  brandName: {
    fontFamily: '"Playfair Display", serif',
    fontSize: '30px',
    color: '#4A4A4A',
    margin: '0',
    fontWeight: '600',
    letterSpacing: '-0.02em',
    transition: 'color 0.2s',
  },
  tagline: {
    fontSize: '10px',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: '#AAB3A8', // Verde acinzentado
    marginTop: '8px',
    fontWeight: '700',
  },

  // INTRO
  introBox: { marginBottom: '25px' },
  introText: {
    fontSize: '14px',
    color: '#7D8C7A', // Verde Sage
    fontWeight: '600',
    marginBottom: '2px',
  },
  introTranslation: {
    fontSize: '12px',
    color: '#C0C0C0',
    fontStyle: 'italic',
  },

  // NOME
  clientName: {
    fontFamily: '"Playfair Display", serif',
    fontSize: '26px',
    color: '#333',
    margin: '0 0 25px 0',
    fontWeight: '400',
    lineHeight: '1.2',
  },

  // STATUS (Design Limpo)
  statusContainer: {
    backgroundColor: '#F4F7F5', // Verde menta quase branco
    padding: '30px 20px',
    borderRadius: '16px',
    marginBottom: '30px',
    position: 'relative',
  },
  statusLabel: {
    display: 'block',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#8CA090',
    fontWeight: '700',
    marginBottom: '15px',
  },
  statusMain: {
    fontFamily: '"Playfair Display", serif',
    fontSize: '24px',
    color: '#4A5D4F', // Verde floresta suave
    fontWeight: '500',
    marginBottom: '10px',
  },
  waveLine: {
    margin: '10px auto 15px auto',
    opacity: 0.6,
  },
  message: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#666',
    fontStyle: 'italic',
  },

  // DATA (Estilo Selo/Craft)
  deliveryBox: {
    marginBottom: '35px',
    padding: '15px 10px',
    border: '1.5px dashed #E0D8D0', // Tracejado bege
    borderRadius: '12px',
    backgroundColor: '#FFFCFA',
    display: 'inline-block',
    width: '100%',
  },
  deliveryLabel: {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    color: '#555',
  },
  deliveryLabelEn: {
    display: 'block',
    fontSize: '10px',
    color: '#AAA',
    marginBottom: '5px',
  },
  deliveryDate: {
    fontFamily: '"Playfair Display", serif',
    fontSize: '20px',
    color: '#333',
    marginTop: '2px',
  },

  // CONTACTOS
  contactSection: {
    paddingTop: '25px',
    borderTop: '1px solid #F6F6F6',
  },
  contactTitle: {
    fontSize: '12px',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  contactLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  contactLink: {
    textDecoration: 'none',
    color: '#8A9A8C', // Verde suave
    fontSize: '15px', // Letra grande para toque fácil
    fontWeight: '600',
  },

  // FOOTER & SOCIALS
  footer: { marginTop: '30px' },
  
  // Botão do Site (Elegante)
  siteButton: {
    display: 'inline-block',
    textDecoration: 'none',
    color: '#FFFFFF',
    backgroundColor: '#B5A595', // Castanho "Taupe" suave
    padding: '10px 25px',
    borderRadius: '50px', // Pílula
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '25px',
    boxShadow: '0 4px 10px rgba(181, 165, 149, 0.3)',
    transition: 'transform 0.1s',
  },
  
  // Container dos Ícones
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '25px',
  },
  iconLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%', // Bolinhas
    backgroundColor: '#F7F7F7',
    color: '#555',
    transition: 'background 0.2s',
  },

  location: {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: '#444',
    fontWeight: '700',
    marginBottom: '5px',
  },
  lastUpdate: {
    fontSize: '9px',
    color: '#CCC',
  },

  // ERRO
  headingSerif: { fontFamily: '"Playfair Display", serif', color: '#D4A5A5', fontSize: '28px' },
  textSecondary: { color: '#999', fontSize: '14px', fontStyle: 'italic' },
  textBody: { marginBottom: '25px', lineHeight: '1.6', fontSize: '14px' },
  mainButton: {
    display: 'inline-block',
    textDecoration: 'none',
    backgroundColor: '#D4A5A5',
    color: 'white',
    padding: '12px 30px',
    borderRadius: '50px',
    fontSize: '14px',
    fontWeight: '600',
  },
  divider: { height: '1px', backgroundColor: '#EEE', margin: '20px auto', width: '40px' }
};
