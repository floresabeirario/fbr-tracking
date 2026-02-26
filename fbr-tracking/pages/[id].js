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
const styles = { ... /* mantém exatamente como tens */ };
