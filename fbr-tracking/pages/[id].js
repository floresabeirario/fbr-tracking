import Head from 'next/head';
import { getEncomendaById } from '../utils/googleSheets';

export default function Tracking({ encomenda }) {
  // Configuração WhatsApp
  const whatsappNumber = "351934680300";
  const whatsappMessage = `Olá! Gostaria de saber mais sobre a encomenda ${encomenda ? encomenda.nome_encomenda : ''}.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // --- PÁGINA DE ERRO ---
  if (!encomenda) {
    return (
      <div style={styles.pageWrapper}>
        <Head>
          {/* Alice (Títulos Fofos) + Lato (Leitura Limpa) */}
          <link href="https://fonts.googleapis.com/css2?family=Alice&family=Lato:wght@300;400;700&display=swap" rel="stylesheet" />
        </Head>
        <div style={styles.card}>
          <h1 style={styles.headingFont}>Encomenda não encontrada</h1>
          <p style={styles.textBody}>Não encontramos este número. Por favor verifique.</p>
          <div style={styles.divider}></div>
          <a href={whatsappUrl} style={styles.buttonPrimary}>
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
        {/* Apenas 2 fontes para evitar confusão */}
        <link href="https://fonts.googleapis.com/css2?family=Alice&family=Lato:wght@300;400;700&display=swap" rel="stylesheet" />
      </Head>

      <div style={styles.card}>
        
        {/* Header */}
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

          {/* CAIXA DE STATUS (Limpa e Simpática) */}
          <div style={styles.statusBox}>
            <span style={styles.label}>Fase Atual / Current Stage</span>
            
            <div style={styles.statusTitle}>
              {encomenda.fase}
            </div>

            <div style={styles.dividerSmall}></div>

            <p style={styles.message}>
              {encomenda.mensagem}
            </p>

            {/* Atualização discreta */}
            <div style={styles.updateRow}>
              <span>Atualizado em: <strong>{encomenda.ultima_atualizacao}</strong></span>
            </div>
          </div>

          {/* DATA ENTREGA */}
          <div style={styles.deliveryContainer}>
            <div style={styles.deliveryContent}>
              <span style={styles.label}>Entrega estimada (Quadro)</span>
              <span style={styles.labelEn}>Estimated delivery (Frame)</span>
              <p style={styles.deliveryDate}>{encomenda.data_entrega}</p>
            </div>
          </div>

          {/* BOTÕES */}
          <div style={styles.actions}>
            
            {/* WhatsApp (Verde Sálvia - Simpático) */}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={styles.buttonPrimary}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{marginRight: 8}}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.355-5.029c.002-5.45 4.439-9.884 9.894-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              Fale connosco / Chat with us
            </a>

            {/* Site (Branco) */}
            <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" style={styles.buttonSecondary}>
              Visitar Site / Visit Website
            </a>
          </div>
        </main>

        {/* Footer */}
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
            {/* Google */}
            <a href="https://share.google/cii2zipc8jx1Wjkop" target="_blank" style={styles.socialIcon} aria-label="Google">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

// --- ESTILOS SIMPLIFICADOS ---
const styles = {
  // Fundo Claro e Limpo (Branco Pérola)
  pageWrapper: {
    minHeight: '100vh',
    backgroundColor: '#F9F9F7', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: '"Lato", sans-serif',
    color: '#4A4A4A',
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    maxWidth: '460px',
    padding: '45px 30px',
    // Sombra muito leve e elegante
    boxShadow: '0 10px 30px rgba(0,0,0,0.03)', 
    borderRadius: '20px', 
    textAlign: 'center',
  },

  // HEADER
  header: { marginBottom: '35px' },
  brandLink: { textDecoration: 'none', cursor: 'pointer' },
  brandName: {
    fontFamily: '"Alice", serif', // Fonte Fofa/Romântica
    fontSize: '32px',
    color: '#333',
    margin: '0',
  },
  tagline: {
    fontSize: '10px',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#999',
    marginTop: '6px',
    fontWeight: '700',
  },

  // INTRO
  introContainer: { marginBottom: '25px' },
  introText: {
    fontSize: '14px',
    color: '#666',
    margin: 0,
    fontWeight: '400',
  },
  introTranslation: {
    fontSize: '12px',
    color: '#AAA',
    marginTop: '2px',
  },

  // NOME
  clientName: {
    fontFamily: '"Alice", serif',
    fontSize: '34px',
    color: '#222',
    margin: '0 0 35px 0',
    fontWeight: '400',
  },

  // STATUS (Clean)
  statusBox: {
    marginBottom: '40px',
  },
  label: {
    display: 'block',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#999',
    fontWeight: '700',
    marginBottom: '8px',
  },
  labelEn: {
    display: 'block',
    fontSize: '10px',
    color: '#CCC',
    marginBottom: '6px',
  },
  statusTitle: {
    fontFamily: '"Alice", serif',
    fontSize: '30px',
    color: '#5E6D63', // Verde escuro muito subtil
    marginBottom: '15px',
  },
  dividerSmall: {
    width: '30px',
    height: '1px',
    backgroundColor: '#DDD',
    margin: '0 auto 15px auto',
  },
  message: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#555',
    marginBottom: '20px',
  },
  updateRow: {
    fontSize: '11px',
    color: '#AAA',
  },

  // ENTREGA (Centrado)
  deliveryContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '45px',
  },
  deliveryContent: {
    textAlign: 'center',
    padding: '0 10px',
  },
  deliveryDate: {
    fontFamily: '"Alice", serif',
    fontSize: '24px',
    color: '#333',
    margin: 0,
  },

  // BOTÕES
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '40px',
  },
  // Botão Verde Sálvia (Simpático, não neon)
  buttonPrimary: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7C9082', // Verde Sálvia
    color: '#FFFFFF',
    textDecoration: 'none',
    padding: '16px',
    borderRadius: '50px',
    fontSize: '14px',
    fontWeight: '700', // Lato Bold
    boxShadow: '0 4px 10px rgba(124, 144, 130, 0.3)',
    transition: 'background 0.2s',
  },
  buttonSecondary: {
    display: 'block',
    backgroundColor: '#FFFFFF',
    color: '#555',
    textDecoration: 'none',
    padding: '16px',
    borderRadius: '50px',
    fontSize: '14px',
    fontWeight: '400',
    border: '1px solid #EEE',
  },

  // FOOTER
  footer: {
    borderTop: '1px solid #F5F5F5',
    paddingTop: '30px',
  },
  socialRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '25px',
  },
  socialIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#FAFAFA',
    border: '1px solid #EEE',
  },
  location: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#444',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '5px',
  },
  copyright: {
    fontSize: '11px',
    color: '#CCC',
  },

  // ERRO
  headingFont: { fontFamily: '"Alice", serif', fontSize: '28px', color: '#333' },
  textBody: { marginBottom: '25px', color: '#666' },
  divider: { height: '1px', backgroundColor: '#EEE', margin: '20px auto', width: '50px' }
};
