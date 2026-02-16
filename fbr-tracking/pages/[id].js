import Head from 'next/head';
import { getEncomendaById } from '../utils/googleSheets';

export default function Tracking({ encomenda }) {
  // --- DESIGN: Página de Erro (Caso o ID não exista) ---
  if (!encomenda) {
    return (
      <div style={styles.pageWrapper}>
        <Head>
           {/* Importar fontes elegantes */}
          <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet" />
        </Head>
        <div style={styles.errorCard}>
          <h1 style={styles.errorTitle}>Encomenda não encontrada</h1>
          <p style={styles.textSecondary}>Order not found</p>
          <div style={styles.divider}></div>
          <p style={styles.textSmall}>Verifique se o código está correto ou contacte-nos.</p>
        </div>
      </div>
    );
  }

  // --- DESIGN: Página Principal de Tracking ---
  return (
    <div style={styles.pageWrapper}>
      <Head>
        <title>Rastreio | Flores à Beira-Rio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Fontes: Cormorant (Serifa para Títulos) e Montserrat (Sans para Leitura) */}
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Montserrat:wght@200;300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <div style={styles.card}>
        {/* Topo Decorativo */}
        <div style={styles.topBar}></div>

        {/* Cabeçalho */}
        <header style={styles.header}>
          <h1 style={styles.brandName}>Flores à Beira-Rio</h1>
          <p style={styles.tagline}>PRESERVATION ATELIER</p>
        </header>

        {/* Conteúdo Principal */}
        <main>
          <div style={styles.welcomeSection}>
            <p style={styles.welcomeText}>Acompanhe a preservação da sua memória</p>
            <p style={styles.translation}>Tracking your memory preservation</p>
          </div>

          <h2 style={styles.orderName}>{encomenda.nome_encomenda}</h2>

          {/* Estado da Encomenda (Destaque) */}
          <div style={styles.statusContainer}>
            <span style={styles.statusLabel}>Fase Atual / Current Stage</span>
            <div style={styles.statusMain}>
              {encomenda.fase}
            </div>
            
            {/* Linha decorativa animada */}
            <div style={styles.progressLine}>
              <div style={styles.progressFill}></div>
            </div>

            <p style={styles.message}>
              “{encomenda.mensagem}”
            </p>
          </div>

          {/* Grid de Informações */}
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Entrega Prevista / Estimated</span>
              <span style={styles.infoValue}>{encomenda.data_entrega}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Última Atualização / Updated</span>
              <span style={styles.infoValue}>{encomenda.ultima_atualizacao}</span>
            </div>
          </div>
        </main>

        {/* Rodapé */}
        <footer style={styles.footer}>
          <div style={styles.flowerIcon}>
            {/* Ícone SVG Floral Minimalista */}
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#D4A5A5" strokeWidth="1">
              <path d="M12 22C12 22 12 14 12 11C12 8 9 5 9 5C9 5 12 7 12 11C12 7 15 5 15 5C15 5 12 8 12 11" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 11C12 11 9 10 7 8C7 8 10 12 12 14C14 12 17 8 17 8C17 8 14 10 12 11Z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p style={styles.footerText}>
            Cada flor é tratada com tempo e intenção.<br />
            <span style={styles.footerTranslation}>Each flower is treated with time and intention.</span>
          </p>
          <p style={styles.copyright}>© Flores à Beira-Rio</p>
        </footer>
      </div>
    </div>
  );
}

// --- Lógica do Servidor (Mantida do teu original) ---
export async function getServerSideProps(context) {
  const { id } = context.params;
  
  // Nota: Certifica-te que o caminho '../utils/googleSheets' está correto
  // Se a pasta for 'lib', muda para '../lib/googleSheets'
  const encomenda = await getEncomendaById(id);

  return {
    props: {
      encomenda,
    },
  };
}

// --- ESTILOS CSS-IN-JS (Design Premium) ---
const styles = {
  pageWrapper: {
    minHeight: '100vh',
    backgroundColor: '#F9F7F2', // Creme muito suave (Papel antigo)
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: '"Montserrat", sans-serif',
    color: '#4A4A4A',
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    maxWidth: '550px',
    padding: '0 0 40px 0', // Padding bottom
    boxShadow: '0 15px 35px rgba(0,0,0,0.05)', // Sombra difusa e elegante
    borderRadius: '4px',
    overflow: 'hidden',
    position: 'relative',
  },
  // Barra colorida no topo
  topBar: {
    height: '6px',
    width: '100%',
    backgroundColor: '#D4A5A5', // Rosa "Dusty Rose"
  },
  header: {
    padding: '40px 40px 20px 40px',
    textAlign: 'center',
    borderBottom: '1px solid #F0F0F0',
  },
  brandName: {
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: '32px',
    fontWeight: '400',
    color: '#2C2C2C',
    margin: '0',
    letterSpacing: '0.02em',
  },
  tagline: {
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.25em',
    color: '#999',
    marginTop: '8px',
  },
  welcomeSection: {
    textAlign: 'center',
    marginTop: '30px',
    marginBottom: '10px',
  },
  welcomeText: {
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#888',
    marginBottom: '4px',
  },
  translation: {
    fontSize: '11px',
    fontStyle: 'italic',
    color: '#AAA',
    fontFamily: '"Cormorant Garamond", serif',
  },
  orderName: {
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: '38px',
    textAlign: 'center',
    color: '#1a1a1a',
    margin: '10px 0 30px 0',
    fontWeight: '500',
    lineHeight: '1.2',
    padding: '0 20px',
  },
  // Área de Status
  statusContainer: {
    backgroundColor: '#FAF8F8', // Fundo subtil
    margin: '0 30px 30px 30px',
    padding: '30px',
    borderRadius: '2px',
    border: '1px solid #EFEFEF',
    textAlign: 'center',
  },
  statusLabel: {
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: '#B08D9B', // Mauve
    fontWeight: '600',
    display: 'block',
    marginBottom: '15px',
  },
  statusMain: {
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: '28px',
    color: '#333',
    marginBottom: '20px',
  },
  progressLine: {
    height: '2px',
    width: '60px',
    backgroundColor: '#E0E0E0',
    margin: '0 auto 20px auto',
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    width: '60%', // Simulação de progresso
    backgroundColor: '#D4A5A5',
  },
  message: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#555',
    fontStyle: 'italic',
    fontFamily: '"Cormorant Garamond", serif',
  },
  // Grid de Detalhes
  infoGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 40px',
    marginBottom: '40px',
  },
  infoItem: {
    textAlign: 'center',
    width: '45%',
  },
  infoLabel: {
    display: 'block',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#999',
    marginBottom: '5px',
  },
  infoValue: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
  },
  // Footer
  footer: {
    textAlign: 'center',
    paddingTop: '20px',
    borderTop: '1px solid #F9F9F9',
  },
  flowerIcon: {
    marginBottom: '15px',
  },
  footerText: {
    fontSize: '14px',
    color: '#666',
    fontFamily: '"Cormorant Garamond", serif',
    fontStyle: 'italic',
  },
  footerTranslation: {
    fontSize: '12px',
    color: '#999',
    display: 'block',
    marginTop: '2px',
  },
  copyright: {
    fontSize: '10px',
    color: '#CCC',
    marginTop: '30px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  // Estilos de Erro
  errorCard: {
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '50px',
    borderRadius: '4px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
  },
  errorTitle: {
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: '30px',
    color: '#D4A5A5',
    marginBottom: '5px',
  },
  textSecondary: {
    color: '#999',
    fontSize: '14px',
    fontStyle: 'italic',
  },
  textSmall: {
    fontSize: '12px',
    color: '#666',
  },
  divider: {
    width: '30px',
    height: '1px',
    backgroundColor: '#EEE',
    margin: '20px auto',
  }
};
