const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);

const doc = new GoogleSpreadsheet('[ID_DO_SEU_SHEET]');

async function getEncomendaById(id) {
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0]; // primeira folha
  const rows = await sheet.getRows();

  const row = rows.find(r => r.id === id);
  if (!row) return null;

  return {
    id: row.id,
    nome_encomenda: row.nome_encomenda,
    fase: row.fase,
    mensagem: row.mensagem,
    ultima_atualizacao: row.ultima_atualizacao,
    data_entrega: row.data_entrega
  };
}

module.exports = { getEncomendaById };
