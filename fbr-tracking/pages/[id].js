import Head from 'next/head';
import { useState } from 'react';
import { getEncomendaById } from '../utils/supabase';
import { TIMELINE_STEPS } from '../utils/timeline';
import { Hero, Footer, WhatsappIcon } from '../components/chrome';

const REVIEW_URL = 'https://maps.app.goo.gl/qGGdyE8mo2kdNBmm7';

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
        <div className="card">
          <Hero tagline="Especialistas em preservação de flores · Flower preservation specialists" />
          <div className="body">
            <div className="err">
              <h2 className="err-title">Encomenda não encontrada</h2>
              <h3 className="err-sub">Order not found</h3>
              <div className="divider"></div>
              <p className="err-text">Por favor, verifique o número da encomenda.</p>
              <p className="err-text-en">Please check the order number.</p>
            </div>
            <div className="actions">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <WhatsappIcon />
                Fale connosco / Chat with us
              </a>
              <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <span aria-hidden="true">✿</span> Visitar Site / Visit Website
              </a>
            </div>
          </div>
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
  const percentagem = passoAtual ? Math.round(((passoAtual - 1) / (totalPassos - 1)) * 100) : 0;

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

      <div className="card">
        <Hero tagline={tagline} />

        <div className="body">
          <div className="intro-wrap">
            {showPt && <p className="intro">Acompanhe a sua preservação</p>}
            {showEn && <p className={isEn ? 'intro' : 'intro-en'}>Track your preservation journey</p>}
          </div>

          <h2 className="client-name">{encomenda.nome_encomenda}</h2>

          {passoAtual && (
            <div className="progress-wrap">
              <button type="button" className="progress-card" onClick={() => setTimelineOpen(!timelineOpen)} aria-expanded={timelineOpen}>
                <div className="progress-text">
                  <div className="progress-title">{isEn ? 'Progress' : 'Progresso'}</div>
                  <div className="progress-sub">{isEn ? `Step ${passoAtual} of ${totalPassos}` : `Passo ${passoAtual} de ${totalPassos}`}</div>
                </div>
                <div className="bar"><div className="bar-fill" style={{ width: `${concluido ? 100 : percentagem}%` }}></div></div>
                <svg className={`chev${timelineOpen ? ' up' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
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

          <div className={`status${encomenda.cancelada ? ' cancelled' : ''}`}>
            <span className="status-label">{bi('Estado Atual', 'Status')}</span>
            {encomenda.fase && <div className="phase">{encomenda.fase}</div>}
            {encomenda.fase_en && <div className={isEn ? 'phase' : 'phase-en'}>{encomenda.fase_en}</div>}
            {encomenda.mensagem && <div className="msg">{formatText(encomenda.mensagem)}</div>}
            {encomenda.mensagem_en && <div className={isEn ? 'msg' : 'msg-en'}>{formatText(encomenda.mensagem_en)}</div>}
            <div className="updated">{bi('Atualizado a', 'Updated on')}: <strong>{encomenda.ultima_atualizacao}</strong></div>
          </div>

          {!encomenda.cancelada && !concluido && (
            <div className="delivery">
              <span className="orn" aria-hidden="true">✿</span>
              {showPt && <span className="delivery-label">Entrega estimada da sua encomenda</span>}
              {showEn && <span className={isEn ? 'delivery-label' : 'delivery-label-en'}>Estimated delivery of your order</span>}
              <p className="delivery-date">{encomenda.data_entrega || bi('Em breve', 'Coming soon')}</p>
            </div>
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
              <span aria-hidden="true">✿</span>
              {bi('Visitar Site', 'Visit Website')}
            </a>
          </div>
        </div>

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
