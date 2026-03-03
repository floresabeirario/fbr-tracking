import Head from 'next/head';
import { useState } from 'react';
import { getEncomendaById } from '../utils/googleSheets';

// Os 11 passos da jornada
// Para pickup: fase_numero salta de 9 para 11 — o passo 10 fica em cinzento, sem problema
const PASSOS = [
  { pt: 'Entrega das flores agendada', en: 'Flower delivery scheduled' },
  { pt: 'Flores recebidas',            en: 'Flowers received' },
  { pt: 'Flores na prensa',            en: 'Pressing in progress' },
  { pt: 'Reconstrução botânica',       en: 'Botanical reconstruction' },
  { pt: 'A compor o design do quadro', en: 'Composing the design' },
  { pt: 'A aguardar aprovação',        en: 'Awaiting your approval' },
  { pt: 'A ser emoldurado',            en: 'Being framed' },
  { pt: 'A ser fotografado',           en: 'Being photographed' },
  { pt: 'Quadro pronto',               en: 'Frame ready' },
  { pt: 'Quadro enviado',              en: 'Frame dispatched' },
  { pt: 'Concluído',                   en: 'Completed' },
];

export default function Tracking({ encomenda }) {
  const [timelineOpen, setTimelineOpen] = useState(false);

  const whatsappNumber = "351934680300";
  const whatsappMessage = `Olá! Gostaria de saber mais sobre a encomenda ${encomenda ? encomenda.nome_encomenda : ''}.`;
  const whatsappErrorMsg = "Olá! Não consegui encontrar a minha encomenda no site.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(encomenda ? whatsappMessage : whatsappErrorMsg)}`;

  // Detecta cliente internacional (só EN preenchido)
  const isInternational = encomenda && !encomenda.fase && !!encomenda.fase_en;

  const formatText = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => (
      <span key={index} style={{ display: 'block', minHeight: '1.2em' }}>
        {line.split(/(https?:\/\/[^\s]+)/g).map((part, i) => {
          if (part.match(/https?:\/\/[^\s]+/)) {
            return (
              <a key={i} href={part} target="_blank" rel="noopener noreferrer"
                style={{ color: '#436850', textDecoration: 'underline', fontWeight: '600', wordBreak: 'break-all' }}>
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
      <div style={s.pageWrapper}>
        <Head>
          <title>Rastreio | Flores à Beira-Rio</title>
          <meta name="robots" content="noindex, nofollow" />
          <link rel="icon" href="/icon.png" type="image/png" />
          <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
          <style dangerouslySetInnerHTML={{__html: `
            body { margin: 0; padding: 0; background-color: #F0F2F0; }
            @font-face { font-family: 'TanMemories'; src: url('/fonts/TAN-MEMORIES.otf') format('opentype'); font-weight: normal; font-style: normal; }
            @font-face { font-family: 'TanMemories'; src: url('/fonts/TAN-MEMORIES-Italic.otf') format('opentype'); font-weight: normal; font-style: italic; }
          `}} />
        </Head>
        <div style={s.card}>
          <header style={s.header}>
            <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" style={s.brandLink}>
              <h1 style={s.brandName}>Flores à<br />Beira-Rio</h1>
            </a>
            <div style={s.taglineContainer}>
              <p style={s.taglinePT}>Especialistas em preservação de flores</p>
              <p style={s.taglineEN}>Flower preservation specialists</p>
            </div>
          </header>
          <div style={s.headerDivider}></div>
          <main>
            <div style={{marginTop: '20px', marginBottom: '40px'}}>
              <h2 style={s.errorTitlePT}>Encomenda não encontrada</h2>
              <h3 style={s.errorTitleEN}>Order not found</h3>
              <div style={s.divider}></div>
              <p style={s.textBody}>Por favor, verifique o número da encomenda.</p>
              <p style={s.textBodyEn}>Please check the order number.</p>
            </div>
            <div style={s.actionSection}>
              <a href={whatsappUrl} style={s.buttonAction}>Fale connosco / Chat with us</a>
              <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" style={s.buttonSite}>
                <span style={{marginRight: '8px'}}>✿</span> Visitar Site / Visit Website
              </a>
            </div>
          </main>
          <footer style={s.footer}>
            <p style={s.copyright}>© Flores à Beira-Rio</p>
          </footer>
        </div>
      </div>
    );
  }

  const passoAtual = encomenda.fase_numero || null;
  const totalPassos = PASSOS.length;
  const percentagem = passoAtual ? Math.round(((passoAtual - 1) / (totalPassos - 1)) * 100) : 0;

  return (
    <div style={s.pageWrapper}>
      <Head>
        <title>Status | Flores à Beira-Rio</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{__html: `
          body { margin: 0; padding: 0; background-color: #F0F2F0; }
          @font-face { font-family: 'TanMemories'; src: url('/fonts/TAN-MEMORIES.otf') format('opentype'); font-weight: normal; font-style: normal; }
          @font-face { font-family: 'TanMemories'; src: url('/fonts/TAN-MEMORIES-Italic.otf') format('opentype'); font-weight: normal; font-style: italic; }
        `}} />
      </Head>

      <div style={s.card}>
        <header style={s.header}>
          <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" style={s.brandLink}>
            <h1 style={s.brandName}>Flores à<br />Beira-Rio</h1>
          </a>
          <div style={s.taglineContainer}>
            <p style={s.taglinePT}>Especialistas em preservação de flores</p>
            <p style={s.taglineEN}>Flower preservation specialists</p>
          </div>
        </header>

        <div style={s.headerDivider}></div>

        <main>
          <div style={s.introContainer}>
            <p style={s.introText}>Acompanhe a sua preservação</p>
            <p style={s.introTranslation}>Track your preservation journey</p>
          </div>

          <h2 style={s.clientName}>{encomenda.nome_encomenda}</h2>

          {/* TIMELINE — só aparece se fase_numero estiver preenchido na folha */}
          {passoAtual && (
            <div style={{marginBottom: '20px'}}>
              <div
                style={s.timelineToggle}
                onClick={() => setTimelineOpen(!timelineOpen)}
                role="button"
                aria-expanded={timelineOpen}
              >
                <div style={s.tlLeft}>
                  <div>
                    <div style={s.tlTitle}>
                      {isInternational ? 'Progress' : 'Progresso'}
                    </div>
                    <div style={s.tlSub}>
                      {isInternational
                        ? `Step ${passoAtual} of ${totalPassos}`
                        : `Passo ${passoAtual} de ${totalPassos}`}
                    </div>
                  </div>
                  <div style={s.miniBar}>
                    <div style={{...s.miniFill, width: `${percentagem}%`}}></div>
                  </div>
                </div>
                <svg
                  style={{ transition: 'transform 0.3s', transform: timelineOpen ? 'rotate(180deg)' : 'rotate(0deg)', color: '#86868B', flexShrink: 0 }}
                  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              {timelineOpen && (
                <div style={s.tlBody}>
                  <div style={s.vt}>
                    {PASSOS.map((passo, i) => {
                      const numero = i + 1;
                      const isDone = numero < passoAtual;
                      const isActive = numero === passoAtual;
                      const isLast = i === PASSOS.length - 1;
                      return (
                        <div key={i} style={{...s.vStep, ...(isLast ? {paddingBottom: 0} : {})}}>
                          <div style={{ ...s.vDot, ...(isDone ? s.vDotDone : {}), ...(isActive ? s.vDotActive : {}) }}>
                            {isDone ? '✓' : numero}
                          </div>
                          <div>
                            <div style={{ ...s.vLabel, ...(isDone ? s.vLabelDone : {}), ...(isActive ? s.vLabelActive : {}) }}>
                              {isInternational ? passo.en : passo.pt}
                            </div>
                            {isActive && (
                              <div style={s.vSub}>{isInternational ? 'In progress' : 'Em curso'}</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          <div style={s.statusBox}>
            <div style={s.statusHeaderRow}>
              <span style={s.statusLabel}>Estado Atual / Status</span>
            </div>
            {encomenda.fase && <div style={s.statusMainText}>{encomenda.fase}</div>}
            {encomenda.fase_en && <div style={s.statusMainTextEn}>{encomenda.fase_en}</div>}
            <div style={{marginBottom: '15px'}}></div>
            {encomenda.mensagem && <div style={s.message}>{formatText(encomenda.mensagem)}</div>}
            {encomenda.mensagem_en && <div style={s.messageEn}>{formatText(encomenda.mensagem_en)}</div>}
            <div style={s.updateBadge}>
              Atualizado a / Updated on: <strong>{encomenda.ultima_atualizacao}</strong>
            </div>
          </div>

          <div style={s.deliveryContainer}>
            <div style={s.deliveryContent}>
              <span style={s.deliveryLabel}>Entrega estimada da sua encomenda</span>
              <span style={s.deliveryLabelEn}>Estimated delivery of your order</span>
              <p style={s.deliveryDate}>{encomenda.data_entrega}</p>
            </div>
          </div>

          <div style={s.actionSection}>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={s.buttonAction}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px', flexShrink: 0}}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2 22l5.185-1.32A9.951 9.951 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Fale connosco / Chat with us
            </a>
            <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" style={s.buttonSite}>
              <span style={{marginRight: '8px', fontSize: '18px', lineHeight: '1'}}>✿</span>
              Visitar Site / Visit Website
            </a>
          </div>
        </main>

        <footer style={s.footer}>
          <div style={s.socialRow}>
            <a href="https://www.instagram.com/floresabeirario/" target="_blank" rel="noopener noreferrer" style={s.socialIcon} aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://www.facebook.com/floresabeirario/" target="_blank" rel="noopener noreferrer" style={s.socialIcon} aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://maps.app.goo.gl/qGGdyE8mo2kdNBmm7" target="_blank" rel="noopener noreferrer" style={s.socialIcon} aria-label="Maps">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </a>
          </div>
          <a href="https://maps.app.goo.gl/qGGdyE8mo2kdNBmm7" target="_blank" rel="noopener noreferrer" style={s.locationLink}>Coimbra, Portugal</a>
          <p style={s.copyright}>© Flores à Beira-Rio</p>
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

const s = {
  pageWrapper: { minHeight: '100vh', backgroundColor: '#F0F2F0', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', fontFamily: '"Urbanist", sans-serif', color: '#1D1D1F' },
  card: { backgroundColor: '#FFFFFF', width: '100%', maxWidth: '460px', padding: '45px 30px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', borderRadius: '24px', textAlign: 'center' },
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
  clientName: { fontFamily: '"TanMemories", serif', fontSize: '28px', color: '#6D8C78', margin: '0 auto 35px auto', padding: '12px 20px', borderTop: '1px solid #E5E5EA', borderBottom: '1px solid #E5E5EA', fontWeight: '400', lineHeight: '1.1', display: 'inline-block' },
  timelineToggle: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '13px 16px', background: '#F4F7F5', borderRadius: '14px', userSelect: 'none' },
  tlLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
  tlTitle: { fontSize: '12px', fontWeight: '700', color: '#436850', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'left' },
  tlSub: { fontSize: '11px', color: '#86868B', fontWeight: '500', marginTop: '2px', textAlign: 'left' },
  miniBar: { width: '56px', height: '5px', background: '#D9E8DC', borderRadius: '4px', overflow: 'hidden' },
  miniFill: { height: '100%', background: '#436850', borderRadius: '4px' },
  tlBody: { paddingLeft: '14px', paddingTop: '16px', paddingBottom: '4px' },
  vt: { position: 'relative', paddingLeft: '24px', borderLeft: '2px solid #E5E5EA', textAlign: 'left' },
  vStep: { position: 'relative', paddingBottom: '14px', paddingLeft: '16px' },
  vDot: { position: 'absolute', left: '-33px', top: '1px', width: '22px', height: '22px', borderRadius: '50%', border: '2px solid #E0E0E0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '700', color: '#C8C8C8' },
  vDotDone: { background: '#436850', borderColor: '#436850', color: '#fff' },
  vDotActive: { background: '#fff', borderColor: '#436850', color: '#436850', boxShadow: '0 0 0 3px rgba(67,104,80,0.15)' },
  vLabel: { fontSize: '13px', fontWeight: '400', color: '#BBBBBB', lineHeight: '1.3' },
  vLabelDone: { color: '#6D8C78', fontWeight: '600' },
  vLabelActive: { color: '#2F3E32', fontWeight: '700', fontSize: '14px' },
  vSub: { fontSize: '11px', color: '#86868B', fontStyle: 'italic', marginTop: '2px' },
  statusBox: { backgroundColor: '#F7F9F8', padding: '30px 25px', borderRadius: '20px', marginBottom: '30px', textAlign: 'left' },
  statusHeaderRow: { marginBottom: '10px' },
  statusLabel: { fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700', color: '#86868B' },
  statusMainText: { fontFamily: '"TanMemories", serif', fontStyle: 'italic', fontSize: '32px', color: '#436850', marginBottom: '4px', lineHeight: '1.1' },
  statusMainTextEn: { fontFamily: '"TanMemories", serif', fontSize: '26px', fontStyle: 'italic', color: '#6D8C78', marginBottom: '0px', lineHeight: '1.1' },
  message: { fontSize: '15px', lineHeight: '1.6', color: '#424245', marginBottom: '10px' },
  messageEn: { fontSize: '14px', lineHeight: '1.6', color: '#7E7E82', marginBottom: '20px' },
  updateBadge: { fontSize: '12px', color: '#6E6E73', backgroundColor: '#FFFFFF', padding: '8px 12px', borderRadius: '50px', width: 'fit-content', boxShadow: '0 2px 5px rgba(0,0,0,0.03)' },
  deliveryContainer: { marginBottom: '40px' },
  deliveryContent: { textAlign: 'center' },
  deliveryLabel: { display: 'block', fontSize: '16px', fontWeight: '700', color: '#1D1D1F', marginBottom: '4px' },
  deliveryLabelEn: { display: 'block', fontSize: '14px', fontWeight: '500', color: '#86868B', marginBottom: '8px' },
  deliveryDate: { fontFamily: '"TanMemories", serif', fontStyle: 'italic', fontSize: '32px', color: '#2F3E32', margin: 0 },
  actionSection: { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' },
  buttonAction: { backgroundColor: '#2F3E32', color: '#FFFFFF', textDecoration: 'none', padding: '16px', borderRadius: '14px', fontSize: '15px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  buttonSite: { backgroundColor: '#FFFFFF', color: '#2F3E32', textDecoration: 'none', padding: '16px', borderRadius: '14px', fontSize: '15px', fontWeight: '600', border: '2px solid #2F3E32', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  footer: { borderTop: '1px solid #F5F5F7', paddingTop: '30px' },
  socialRow: { display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' },
  socialIcon: { width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#F5F5F7', display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none' },
  locationLink: { display: 'inline-block', fontSize: '12px', fontWeight: '600', color: '#1D1D1F', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', textDecoration: 'none' },
  copyright: { fontSize: '11px', color: '#86868B' },
  errorTitlePT: { fontFamily: '"TanMemories", serif', fontSize: '34px', color: '#2F3E32', margin: '0 0 5px 0' },
  errorTitleEN: { fontFamily: '"TanMemories", serif', fontSize: '26px', color: '#86868B', fontStyle: 'italic' },
  textBody: { fontSize: '16px', margin: 0 },
  textBodyEn: { fontSize: '14px', color: '#86868B', marginTop: '5px' },
  divider: { height: '1px', backgroundColor: '#E5E5EA', margin: '20px auto' },
};
