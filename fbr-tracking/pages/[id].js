import Head from 'next/head';
import { useState } from 'react';
import { getEncomendaById } from '../utils/supabase';
import { TIMELINE_STEPS } from '../utils/timeline';
import { Mast, Footer, FlorSvg, WhatsappIcon } from '../components/chrome';

const REVIEW_URL = 'https://maps.app.goo.gl/qGGdyE8mo2kdNBmm7';

// Anel de progresso do palco. r=30 → circunferência ~188.5
// (o valor está espelhado no @keyframes ringIn do CSS).
function Ring({ passo, total, concluido }) {
  const R = 30;
  const C = 2 * Math.PI * R;
  const frac = concluido ? 1 : passo / total;
  return (
    <div className="ring" aria-hidden="true">
      <svg viewBox="0 0 76 76" width="88" height="88">
        <circle cx="38" cy="38" r={R} className="ring-bg" />
        <circle cx="38" cy="38" r={R} className="ring-fg" strokeDasharray={C} strokeDashoffset={C * (1 - frac)} />
      </svg>
      <div className="ring-num">
        {concluido ? (
          <span className="ring-check">✓</span>
        ) : (
          <>
            <span className="ring-cur">{passo}</span>
            <span className="ring-tot">/{total}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default function Tracking({ encomenda }) {
  const [timelineOpen, setTimelineOpen] = useState(false);

  const whatsappNumber = "351934680300";

  // Idioma escolhido na aba Status do admin: 'pt' | 'en' | 'ambos'.
  // (fallback pelos campos fase/fase_en para links gerados antes desta versão)
  const idioma = encomenda
    ? (encomenda.idioma || (!encomenda.fase && encomenda.fase_en ? 'en' : 'pt'))
    : 'pt';
  const showPt = idioma === 'pt' || idioma === 'ambos';
  const showEn = idioma === 'en' || idioma === 'ambos';
  const isEn = idioma === 'en';
  // Texto curto no idioma do cliente ('ambos' → "PT / EN")
  const bi = (pt, en) => (idioma === 'en' ? en : idioma === 'ambos' ? `${pt} / ${en}` : pt);

  // Mensagem pré-escrita no idioma do cliente (EN-only → inglês)
  const whatsappMessage = isEn
    ? `Hello! I would like to know more about order ${encomenda ? encomenda.nome_encomenda : ''}.`
    : `Olá! Gostaria de saber mais sobre a encomenda ${encomenda ? encomenda.nome_encomenda : ''}.`;
  const whatsappErrorMsg = "Olá! Não consegui encontrar a minha encomenda no site. / Hello! I could not find my order on the website.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(encomenda ? whatsappMessage : whatsappErrorMsg)}`;

  const formatText = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => (
      <span key={index} style={{ display: 'block', minHeight: '1.2em' }}>
        {line.split(/(https?:\/\/[^\s]+)/g).map((part, i) => {
          if (part.match(/https?:\/\/[^\s]+/)) {
            return (
              <a key={i} href={part} target="_blank" rel="noopener noreferrer">{part}</a>
            );
          }
          return part;
        })}
      </span>
    ));
  };

  if (!encomenda) {
    return (
      <div className="page">
        <Head>
          <title>Encomenda não encontrada | Flores à Beira-Rio</title>
          <meta name="description" content="Acompanhe o progresso da sua preservação de flores." />
          <meta name="robots" content="noindex, nofollow" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/icon.png" type="image/png" />
        </Head>
        <div className="wrap">
          <Mast tagline="Especialistas em preservação de flores · Flower preservation specialists" />
          <main className="content">
            <div className="err">
              <h1 className="err-title">Encomenda não encontrada</h1>
              <h2 className="err-sub">Order not found</h2>
              <hr className="divider" />
              <p className="err-text">Por favor, verifique o número da encomenda.</p>
              <p className="err-text-en">Please check the order number.</p>
            </div>
            <div className="actions">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <WhatsappIcon />
                Fale connosco / Chat with us
              </a>
              <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                Visitar Site / Visit Website
              </a>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  // Descrição do link (preview no WhatsApp/iMessage) no idioma do cliente.
  const description = isEn
    ? `Follow the preservation of your flowers, step by step · ${encomenda.nome_encomenda}.`
    : idioma === 'ambos'
      ? `Acompanhe a sua preservação de flores · Track your flower preservation · ${encomenda.nome_encomenda}.`
      : `Acompanhe o progresso da sua preservação de flores · ${encomenda.nome_encomenda}.`;

  const passoAtual = encomenda.fase_numero || null;
  const totalPassos = TIMELINE_STEPS.length;
  const concluido = passoAtual === totalPassos;

  const tagline = isEn
    ? 'Flower preservation specialists'
    : idioma === 'ambos'
      ? 'Especialistas em preservação de flores · Flower preservation specialists'
      : 'Especialistas em preservação de flores';

  return (
    <div className="page">
      <Head>
        <title>{`${encomenda.nome_encomenda} | Flores à Beira-Rio`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${encomenda.nome_encomenda} | Flores à Beira-Rio`} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="Flores à Beira-Rio" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://status.floresabeirario.pt/${encomenda.id}`} />
        <meta property="og:image" content="https://status.floresabeirario.pt/icon.png" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" type="image/png" />
      </Head>

      <div className="wrap">
        <Mast tagline={tagline} />

        <main className="content">
          <section className="greet">
            {showPt && <p className="eyebrow">A viagem das suas flores</p>}
            {showEn && <p className={isEn ? 'eyebrow' : 'eyebrow-en'}>Your flowers&apos; journey</p>}
            <h1 className="client">{encomenda.nome_encomenda}</h1>
          </section>

          {/* Palco: estado actual em destaque, sobre verde-escuro */}
          <section className={`stage${encomenda.cancelada ? ' cancelled' : ''}`}>
            <FlorSvg className="stage-flor" />
            <div className="stage-top">
              {passoAtual && <Ring passo={passoAtual} total={totalPassos} concluido={concluido} />}
              <div className="stage-info">
                <span className="stage-label">{bi('Estado atual', 'Status')}</span>
                {encomenda.fase && <h2 className="stage-phase">{encomenda.fase}</h2>}
                {encomenda.fase_en && <h2 className={isEn ? 'stage-phase' : 'stage-phase-en'}>{encomenda.fase_en}</h2>}
                {passoAtual && (
                  <p className="stage-step">
                    {isEn ? `Step ${passoAtual} of ${totalPassos}` : `Passo ${passoAtual} de ${totalPassos}`}
                  </p>
                )}
              </div>
            </div>
            {passoAtual && (
              <div className="dots" aria-hidden="true">
                {TIMELINE_STEPS.map((_, i) => {
                  const numero = i + 1;
                  const isDone = numero < passoAtual || (concluido && numero === passoAtual);
                  const isActive = numero === passoAtual && !concluido;
                  return <span key={i} className={`pip${isDone ? ' done' : ''}${isActive ? ' active' : ''}`} />;
                })}
              </div>
            )}
          </section>

          {/* Timeline completa, expansível */}
          {passoAtual && (
            <div className="tl-block">
              <button type="button" className="tl-toggle" onClick={() => setTimelineOpen(!timelineOpen)} aria-expanded={timelineOpen}>
                {timelineOpen
                  ? bi('Esconder as etapas', 'Hide the stages')
                  : bi('Ver as 12 etapas', 'See all 12 stages')}
                <svg className={`chev${timelineOpen ? ' up' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className={`tl-wrap${timelineOpen ? ' open' : ''}`}>
                <div className="tl-inner">
                  <div className="tl">
                    {TIMELINE_STEPS.map((passo, i) => {
                      const numero = i + 1;
                      // Encomenda concluída (fase 12): o último passo também fica ✓,
                      // sem "Em curso" pendurado no fim da viagem.
                      const isDone = numero < passoAtual || (concluido && numero === passoAtual);
                      const isActive = numero === passoAtual && !concluido;
                      return (
                        <div key={i} className={`step${isDone ? ' done' : ''}`}>
                          <div className={`dot${isDone ? ' done' : ''}${isActive ? ' active' : ''}`}>{isDone ? '✓' : numero}</div>
                          <div className="step-text">
                            <div className={`step-label${isDone ? ' done' : ''}${isActive ? ' active' : ''}`}>{isEn ? passo.en : passo.pt}</div>
                            {idioma === 'ambos' && <div className="step-en">{passo.en}</div>}
                            {isActive && <div className="step-sub">{bi('Em curso', 'In progress')}</div>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mensagem da equipa */}
          {(encomenda.mensagem || encomenda.mensagem_en) && (
            <section className="note">
              {encomenda.mensagem && <div className="msg">{formatText(encomenda.mensagem)}</div>}
              {encomenda.mensagem_en && <div className={isEn ? 'msg' : 'msg-en'}>{formatText(encomenda.mensagem_en)}</div>}
              <div className="updated">{bi('Atualizado a', 'Updated on')}: <strong>{encomenda.ultima_atualizacao}</strong></div>
            </section>
          )}

          {/* Entrega estimada, emoldurada (o produto final é um quadro) */}
          {!encomenda.cancelada && !concluido && (
            <section className="frame">
              {showPt && <span className="frame-label">Entrega estimada da sua encomenda</span>}
              {showEn && <span className={isEn ? 'frame-label' : 'frame-label-en'}>Estimated delivery of your order</span>}
              <p className="frame-date">{encomenda.data_entrega || bi('Em breve', 'Coming soon')}</p>
            </section>
          )}

          {concluido && (
            <a href={REVIEW_URL} target="_blank" rel="noopener noreferrer" className="btn btn-review">
              <span aria-hidden="true">⭐</span>
              {bi('Deixar avaliação no Google', 'Leave us a Google review')}
            </a>
          )}

          <div className="actions">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <WhatsappIcon />
              {bi('Fale connosco', 'Chat with us')}
            </a>
            <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              {bi('Visitar Site', 'Visit Website')}
            </a>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    const encomenda = await getEncomendaById(id);
    return { props: { encomenda: encomenda ?? null } };
  } catch (err) {
    console.error('Erro ao carregar encomenda.');
    return { props: { encomenda: null } };
  }
}
