import Head from 'next/head';
import { useState } from 'react';
import { getEncomendaById } from '../utils/googleSheets';

export default function Tracking({ encomenda }) {
  const [language, setLanguage] = useState('pt'); // 'pt', 'en', 'both'
  const whatsappNumber = "351934680300";
  const whatsappMessage = `Olá! Gostaria de saber mais sobre a encomenda ${encomenda ? encomenda.nome_encomenda : ''}.`;
  const whatsappErrorMsg = "Olá! Não consegui encontrar a minha encomenda no site.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(encomenda ? whatsappMessage : whatsappErrorMsg)}`;

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

  if (!encomenda) {
    return (
      <div style={styles.pageWrapper}>
        <Head>
          <title>Rastreio | Flores à Beira-Rio</title>
        </Head>
        <div style={styles.card}>
          <h2>Encomenda não encontrada / Order not found</h2>
          <p>Por favor, verifique o número da encomenda / Please check the order number.</p>
          <a href={whatsappUrl} style={styles.buttonAction}>Fale connosco / Chat with us</a>
        </div>
      </div>
    );
  }

  const renderFase = () => {
    if (!encomenda.fase && !encomenda.fase_en) return null;
    if (language === 'pt') return <div style={styles.statusMainText}>{encomenda.fase}</div>;
    if (language === 'en') return <div style={styles.statusMainTextEn}>{encomenda.fase_en}</div>;
    if (language === 'both') return (
      <>
        <div style={styles.statusMainText}>{encomenda.fase}</div>
        <div style={styles.statusMainTextEn}>{encomenda.fase_en}</div>
      </>
    );
  };

  const renderMensagem = () => {
    if (!encomenda.mensagem && !encomenda.mensagem_en) return null;
    if (language === 'pt') return <div style={styles.message}>{formatText(encomenda.mensagem)}</div>;
    if (language === 'en') return <div style={styles.messageEn}>{formatText(encomenda.mensagem_en)}</div>;
    if (language === 'both') return (
      <>
        <div style={styles.message}>{formatText(encomenda.mensagem)}</div>
        <div style={styles.messageEn}>{formatText(encomenda.mensagem_en)}</div>
      </>
    );
  };

  return (
    <div style={styles.pageWrapper}>
      <Head>
        <title>Status | Flores à Beira-Rio</title>
      </Head>

      <div style={styles.card}>
        {/* BOTÕES DE LÍNGUA */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          <button onClick={() => setLanguage('pt')} style={{ padding: '8px 12px', cursor: 'pointer', fontWeight: language === 'pt' ? '700' : '400' }}>PT</button>
          <button onClick={() => setLanguage('en')} style={{ padding: '8px 12px', cursor: 'pointer', fontWeight: language === 'en' ? '700' : '400' }}>EN</button>
          <button onClick={() => setLanguage('both')} style={{ padding: '8px 12px', cursor: 'pointer', fontWeight: language === 'both' ? '700' : '400' }}>PT + EN</button>
        </div>

        <h2 style={styles.clientName}>{encomenda.nome_encomenda}</h2>

        <div style={styles.statusBox}>
          <div style={styles.statusHeaderRow}>
            <span style={styles.statusLabel}>Estado Atual / Status</span>
          </div>
          {renderFase()}
          {renderMensagem()}

          <div style={styles.updateBadge}>
            Atualizado a / Updated on: <strong>{encomenda.ultima_atualizacao}</strong>
          </div>
        </div>

        <div style={styles.deliveryContainer}>
          <div style={styles.deliveryContent}>
            {language !== 'en' && <span style={styles.deliveryLabel}>Entrega estimada da sua encomenda</span>}
            {language !== 'pt' && <span style={styles.deliveryLabelEn}>Estimated delivery of your order</span>}
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
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const encomenda = await getEncomendaById(id);
  return { props: { encomenda } };
}

// STYLES: mantém todos os teus styles originais
const styles = {
  pageWrapper: { minHeight: '100vh', backgroundColor: '#F0F2F0', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', fontFamily: '"Urbanist", sans-serif', color: '#1D1D1F' },
  card: { backgroundColor: '#FFFFFF', width: '100%', maxWidth: '460px', padding: '45px 30px', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)', borderRadius: '24px', textAlign: 'center' },
  header: { marginBottom: '20px' },
  brandLink: { textDecoration: 'none', cursor: 'pointer', color: 'inherit' },
  brandName: { fontFamily: '"TanMemories", serif', fontSize: '42px', margin: '0', fontWeight: '400', letterSpacing: '-0.01em', lineHeight: '1.15' },
  taglineContainer: { marginTop: '12px' },
  taglinePT: { fontSize: '14px', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#666', fontWeight: '600', margin: '0 0 2px 0' },
  taglineEN: { fontSize: '12px', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#999', fontWeight: '500', margin: 0 },
  headerDivider: { height: '1px', backgroundColor: '#E5E5EA', width: '80%', margin: '0 auto 25px auto' },
  introContainer: { marginBottom: '25px' },
  introText: { fontSize: '14px', fontWeight: '600', color: '#2F3E32', margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '0.05em' },
  introTranslation: { fontSize: '12px', fontWeight: '500', color: '#889', textTransform: 'uppercase', letterSpacing: '0.05em' },
  clientName: { fontFamily: '"TanMemories", serif', fontSize: '34px', color: '#2F3E32', margin: '0 0 35px 0', fontWeight: '400', lineHeight: '1.1' },
  statusBox: { backgroundColor: '#F7F9F8', padding: '30px 25px', borderRadius: '20px', marginBottom: '30px', textAlign: 'left' },
  statusHeaderRow: { marginBottom: '10px' },
  statusLabel: { fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700', color: '#86868B' },
  statusMainText: { fontFamily: '"TanMemories", serif', fontSize: '32px', color: '#436850', marginBottom: '4px', lineHeight: '1.1' },
  statusMainTextEn: { fontFamily: '"TanMemories", serif', fontSize: '26px', fontStyle: 'italic', color: '#6D8C78', marginBottom: '15px', lineHeight: '1.1' },
  message: { fontSize: '15px', lineHeight: '1.6', color: '#424245', marginBottom: '10px' },
  messageEn: { fontSize: '14px', lineHeight: '1.6', color: '#7E7E82', fontStyle: 'italic', marginBottom: '20px' },
  updateBadge: { fontSize: '12px', color: '#6E6E73', backgroundColor: '#FFFFFF', padding: '8px 12px', borderRadius: '50px', width: 'fit-content', boxShadow: '0 2px 5px rgba(0,0,0,0.03)' },
  deliveryContainer: { marginBottom: '40px' },
  deliveryContent: { textAlign: 'center' },
  deliveryLabel: { display: 'block', fontSize: '16px', fontWeight: '700', color: '#1D1D1F', marginBottom: '4px' },
  deliveryLabelEn: { display: 'block', fontSize: '14px', fontWeight: '500', color: '#86868B', marginBottom: '8px' },
  deliveryDate: { fontFamily: '"TanMemories", serif', fontStyle: 'italic', fontSize: '32px', color: '#2F3E32', margin: 0 },
  actionSection: { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' },
  buttonAction: { backgroundColor: '#2F3E32', color: '#FFFFFF', textDecoration: 'none', padding: '16px', borderRadius: '14px', fontSize: '15px', fontWeight: '600', display: 'block' },
  buttonSite: { backgroundColor: '#FFFFFF', color: '#2F3E32', textDecoration: 'none', padding: '16px', borderRadius: '14px', fontSize: '15px', fontWeight: '600', border: '2px solid #2F3E32', display: 'block' },
  footer: { borderTop: '1px solid #F5F5F7', paddingTop: '30px' },
  socialRow: { display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' },
  socialIcon: { width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#F5F5F7', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '10px', textDecoration: 'none', color: '#555' },
  locationLink: { display: 'inline-block', fontSize: '12px', fontWeight: '600', color: '#1D1D1F', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', textDecoration: 'none' },
  copyright: { fontSize: '11px', color: '#86868B' },
  errorTitlePT: { fontFamily: '"TanMemories", serif', fontSize: '34px', color: '#2F3E32', margin: '0 0 5px 0' },
  errorTitleEN: { fontFamily: '"TanMemories", serif', fontSize: '26px', color: '#86868B', fontStyle: 'italic' },
  textBody: { fontSize: '16px', margin: 0 },
  textBodyEn: { fontSize: '14px', color: '#86868B', marginTop: '5px' },
  divider: { height: '1px', backgroundColor: '#E5E5EA', margin: '20px auto' }
};
