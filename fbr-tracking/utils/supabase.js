// ============================================================
// fbr-tracking — leitor do Supabase (site status.floresabeirario.pt)
//
// FONTE ÚNICA: toda a lógica estado→fase pública, labels e mensagens
// default vive AGORA na RPC `get_public_order_status` (migração 092 no
// repo fbr-admin). Este ficheiro deixou de ter mapas duplicados — só
// chama a RPC e formata as datas / escolhe o idioma para renderizar.
//
// Isto elimina a antiga armadilha de manter dois mapas em sincronia
// (aqui e em src/lib/public-status.ts do admin). Ver docs/ECOSYSTEM.md.
//
// ⚠️ ROLLOUT: só fazer deploy deste ficheiro DEPOIS da migração 092
// estar aplicada no Supabase. Enquanto a RPC não existir, a chamada
// falha (o site mostra o seu erro normal em vez de dados errados).
//
// Contrato de saída de getEncomendaById(id) (inalterado):
//   { id, nome_encomenda, idioma, cancelada,
//     fase, fase_en, fase_numero,
//     mensagem, mensagem_en,
//     ultima_atualizacao, data_entrega }
// ============================================================

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// ── Helpers de formatação (presentation-only; não são lógica de fase) ──

// "2026-05-04" → "maio de 2026" (PT) / "May 2026" (EN)
// Mês + ano apenas (a entrega real não é dia-exacto).
function formatEstimatedDelivery(dateIso, lang) {
  if (!dateIso) return '';
  const parts = String(dateIso).split('-');
  if (parts.length < 2) return '';
  const year = Number(parts[0]);
  const month = Number(parts[1]);
  if (!year || !month) return '';
  // Dia 15 para evitar saltos de timezone na borda do mês.
  const d = new Date(year, month - 1, 15);
  const locale = lang === 'pt' ? 'pt-PT' : 'en-GB';
  return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(d);
}

// "2026-05-04T08:30:00Z" → "04/05/2026" (pt-PT) — sem horas (cliente não vê hora)
function formatUpdatedAt(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(d);
}

// ── API principal ────────────────────────────────────────────

async function getEncomendaById(id) {
  // A RPC resolve tudo: fase, labels, mensagens (override por encomenda
  // → default global → default hardcoded) e nome a exibir. Corre com a
  // anon key e a policy `orders_public_status_read` (só encomendas
  // pagas e não arquivadas). Devolve null se não existir/for invisível.
  const { data, error } = await supabase.rpc('get_public_order_status', { p_order_id: id });

  if (error) {
    console.error('Erro na RPC get_public_order_status:', error.message);
    throw error;
  }
  if (!data) return null;

  // Idioma escolhido pela Maria na aba Status ('pt' | 'en' | 'ambos').
  const lang = data.language || 'pt';
  const showPt = lang === 'pt' || lang === 'ambos';
  const showEn = lang === 'en' || lang === 'ambos';

  // fase_numero: só para fases 1-12 (pré-timeline 0 e cancelada não têm passo).
  const phase = data.public_phase;
  const fase_numero = typeof phase === 'number' && phase >= 1 && phase <= 12 ? phase : null;

  // Data prevista: sem dia (mês + ano apenas).
  const dataEntregaPt = showPt ? formatEstimatedDelivery(data.estimated_delivery_date, 'pt') : '';
  const dataEntregaEn = showEn ? formatEstimatedDelivery(data.estimated_delivery_date, 'en') : '';
  const data_entrega = showPt && showEn && dataEntregaPt && dataEntregaEn
    ? `${dataEntregaPt} / ${dataEntregaEn}`
    : (dataEntregaPt || dataEntregaEn || '');

  return {
    id: data.order_id,
    nome_encomenda: data.display_name,
    idioma: lang,
    cancelada: data.is_cancelled === true,
    fase: showPt ? data.label_pt : null,
    fase_en: showEn ? data.label_en : null,
    fase_numero,
    mensagem: showPt ? data.message_pt : null,
    mensagem_en: showEn ? data.message_en : null,
    ultima_atualizacao: formatUpdatedAt(data.updated_at),
    data_entrega,
  };
}

module.exports = { getEncomendaById };
