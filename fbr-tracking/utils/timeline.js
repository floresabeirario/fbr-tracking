// ============================================================
// fbr-tracking — passos da timeline pública
//
// ⚠️ Tem de existir EXACTAMENTE 1 entrada por fase 1..12:
// o índice i corresponde à fase i+1 (ver STATUS_TO_PUBLIC_PHASE
// em utils/supabase.js, espelhado em src/lib/public-status.ts
// no repo admin). Se uma fase nova nascer no admin, acrescentar
// aqui o passo correspondente.
//
// Labels curtos de propósito (cabem numa linha da timeline);
// o "Estado atual" por extenso vem de PUBLIC_PHASE_LABEL_*.
//
// Vive num ficheiro próprio (sem import do Supabase) porque é
// usado no render do browser — importar utils/supabase.js no
// cliente rebentava com as env vars em falta.
// ============================================================

const TIMELINE_STEPS = [
  { pt: 'Entrega das flores agendada', en: 'Flower delivery scheduled' },   // fase 1
  { pt: 'Flores recebidas',            en: 'Flowers received' },            // fase 2
  { pt: 'Flores na prensa',            en: 'Pressing in progress' },        // fase 3
  { pt: 'Reconstrução botânica',       en: 'Botanical reconstruction' },    // fase 4
  { pt: 'A compor o design do quadro', en: 'Composing the design' },        // fase 5
  { pt: 'A aguardar aprovação',        en: 'Awaiting your approval' },      // fase 6
  { pt: 'A finalizar o quadro',        en: 'Finalising the artwork' },      // fase 7
  { pt: 'A ser emoldurado',            en: 'Being framed' },                // fase 8
  { pt: 'A ser fotografado',           en: 'Being photographed' },          // fase 9
  { pt: 'Quadro pronto',               en: 'Frame ready' },                 // fase 10
  { pt: 'Quadro enviado',              en: 'Frame dispatched' },            // fase 11
  { pt: 'Concluído',                   en: 'Completed' },                   // fase 12
];

module.exports = { TIMELINE_STEPS };
