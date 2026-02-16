import Head from 'next/head';
import { getEncomendaById } from '../utils/googleSheets';

export default function Tracking({ encomenda }) {
  // --- PÁGINA DE ERRO (Design Minimalista) ---
  if (!encomenda) {
    return (
      <div style={styles.pageWrapper}>
        <Head>
           {/* Carregar Poppins e Bodoni Moda (Alternativa visual à The Seasons) */}
          <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;1,6..96,400&family=Poppins:wght@300;400;500&display=swap" rel="stylesheet" />
        </Head>
        <div style={styles.errorCard}>
          <h1 style={styles.heading}>Encomenda não encontrada</h1>
          <p style={styles.textSecondary}>Order not found</p>
          <div style={styles.divider}></div>
          <p style={styles.textSmall}>Por favor, verifique o número da encomenda.</p>
        </div>
      </div>
    );
  }

  // --- PÁGINA PRINCIPAL ---
  return (
    <div style={styles.pageWrapper}>
      <Head>
        <title>Rastreio | Flores à Beira-Rio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;1,6..96,400&family=Poppins:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <div style={styles.card}>
        
        {/* Cabeçalho da Marca */}
        <header style={styles.header}>
          <h1 style={styles.brandName}>Flores à Beira-Rio</h1>
          <div style={styles.taglineContainer}>
            <p style={styles.taglinePT}>Especialistas em preservação de flores</p>
            <p style={styles.taglineEN}>Flower preservation specialists</p>
          </div>
        </header>

        {/* Conteúdo Principal */}
        <main style={styles.mainContent}>
          
          {/* Frase de Introdução */}
          <div style={styles.introSection}>
            <p style={styles.introText}>Acompanhe a preservação das suas flores</p>
            <p style={styles.introTranslation}>Track your flowers preservation journey</p>
          </div>

          {/* Nome da Encomenda (Destaque) */}
          <h2 style={styles.orderName}>{encomenda.nome_encomenda}</h2>

          {/* Bloco de Status */}
          <div style={styles.statusBox}>
            <span style={styles.label}>Fase Atual / Current Stage</span>
            
            <div style={styles.phaseName}>
              {encomenda.fase}
            </div>
            
            {/* A Barra: Agora é um separador elegante dourado */}
            <div style={styles.separatorLine}></div>

            <p style={styles.message}>
              {encomenda.mensagem}
            </p>
          </div>

          {/* Data de Entrega (Destaque Único) */}
          <div style={styles.deliverySection}>
            <span style={styles.label}>Data de entrega estimada (do quadro)</span>
            <span style={styles.labelTranslation}>Estimated delivery date (frame)</span>
            <p style={styles.deliveryDate}>{encomenda.data_entrega}</p>
          </div>

        </main>

        {/* Rodapé */}
        <footer style={styles.footer}>
          
          {/* Detalhe menos relevante (Última atualização) */}
          <p style={styles.lastUpdate}>
            Atualizado em / Updated on: {encomenda.ultima_atualizacao}
          </p>

          <div style={styles.footerIcon}>
             {/* Ícone Folha (Verde Sálvia) */}
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#586c5c" strokeWidth="1.5">
              <path d="M12 21C12 21 17 14 17 8C17 4.68629 14.3137 2 11 2C7.68629 2 5 4.68629 5 8C5 14 12 21 12 21Z" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 21V11" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 7C12 7 14 9 14 11" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <p style={styles.footerBrand}>© Flores à Beira-Rio</p>
        </footer>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const encomenda = await getEncomendaById(id);

  return {
    props: { encomenda },
  };
}

// --- ESTILOS (CSS-in-JS) ---
const styles = {
  pageWrapper: {
    minHeight: '100vh',
    backgroundColor: '#F7F6F2', // "Linen" - um bege muito claro e natural
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: '"Poppins", sans-serif',
    color: '#444',
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    maxWidth: '500px',
    padding: '50px 40px',
    boxShadow: '0 20px 40px rgba(90, 90, 80, 0.08)', // Sombra com subtom esverdeado
    borderRadius: '0px', // Cantos retos para ser mais "Editorial"
    position: 'relative',
    border: '1px solid #EAEAEA', // Borda muito subtil
  },

  // HEADER
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    borderBottom: '1px solid #F0F0F0',
    paddingBottom: '25px',
  },
  brandName: {
    // Tenta usar a 'The Seasons', se não tiver, usa 'Bodoni Moda'
    fontFamily: '"The Seasons", "Bodoni Moda", serif', 
    fontSize: '34px',
    fontWeight: '500', // Peso médio para elegância
    color: '#2A332C', // Verde Floresta quase preto
    margin: '0 0 10px 0',
    letterSpacing: '-0.02em',
  },
  taglineContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  taglinePT: {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: '#586c5c', // Verde Sálvia
    fontWeight: '500',
    margin: 0,
  },
  taglineEN: {
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#9CA69D', // Verde acinzentado claro
    margin: 0,
  },

  // INTRO
  introSection: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  introText: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '2px',
  },
  introTranslation: {
    fontSize: '12px',
    color: '#999',
    fontStyle: 'italic',
    fontWeight: '300',
  },

  // CONTEÚDO PRINCIPAL
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  orderName: {
    fontFamily: '"The Seasons", "Bodoni Moda", serif',
    fontSize: '32px',
    textAlign: 'center',
    color: '#111',
    margin: '0 0 35px 0',
    fontWeight: '400',
    lineHeight: '1.2',
  },

  // CAIXA DE STATUS
  statusBox: {
    width: '100%',
    backgroundColor: '#F9FAF9', // Fundo esverdeado ultra claro
    padding: '35px 20px',
    textAlign: 'center',
    border: '1px solid #EEF0EE',
    marginBottom: '40px',
  },
  label: {
    display: 'block',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#888',
    marginBottom: '10px',
  },
  labelTranslation: {
    display: 'block',
    fontSize: '9px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#AAA',
    marginBottom: '5px',
    marginTop: '-8px', // Aproxima do label PT
  },
  phaseName: {
    fontFamily: '"The Seasons", "Bodoni Moda", serif',
    fontSize: '24px',
    color: '#2A332C',
    marginBottom: '20px',
  },
  // A BARRA (Design Refinado)
  separatorLine: {
    width: '40px',
    height: '1px',
    backgroundColor: '#C5A059', // Dourado Matte
    margin: '0 auto 20px auto',
  },
  message: {
    fontSize: '14px',
    lineHeight: '1.7',
    color: '#555',
    maxWidth: '90%',
    margin: '0 auto',
    fontStyle: 'italic',
  },

  // SECÇÃO DE ENTREGA
  deliverySection: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  deliveryDate: {
    fontFamily: '"The Seasons", "Bodoni Moda", serif',
    fontSize: '22px',
    color: '#586c5c', // Destaque em Verde Sálvia
    marginTop: '10px',
    borderBottom: '1px solid #E0E0E0',
    paddingBottom: '5px',
    display: 'inline-block',
  },

  // FOOTER
  footer: {
    marginTop: '50px',
    textAlign: 'center',
    borderTop: '1px solid #F5F5F5',
    paddingTop: '30px',
  },
  lastUpdate: {
    fontSize: '10px',
    color: '#BBB', // Muito discreto
    marginBottom: '20px',
  },
  footerIcon: {
    marginBottom: '10px',
    opacity: 0.8,
  },
  footerBrand: {
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#CCC',
  },

  // ERRO
  errorCard: {
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '40px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
  },
  heading: {
    fontFamily: '"The Seasons", "Bodoni Moda", serif',
    fontSize: '28px',
    marginBottom: '10px',
  },
  textSecondary: { color: '#999', fontStyle: 'italic' },
  textSmall: { fontSize: '12px', color: '#666' },
  divider: {
    width: '30px', height: '1px', backgroundColor: '#ddd', margin: '20px auto'
  }
};
