import { GoogleSpreadsheet } from 'google-spreadsheet';

const doc = new GoogleSpreadsheet('1XgUuKrf_hI_WHY5CReKAafoW7aby1lEWV2wAxnlesQI');

async function accessSheet() {
  await doc.useServiceAccountAuth(JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON));
  await doc.loadInfo(); // carrega informações do Sheet
}

export async function getEncomendaById(id) {
  await accessSheet();
  const sheet = doc.sheetsByIndex[0]; // primeira aba
  const rows = await sheet.getRows();

  const encomenda = rows.find(r => r.id.trim() === id.trim());
  if (!encomenda) return null;

  return {
    id: encomenda.id,
    nome_encomenda: encomenda.nome_encomenda,
    fase: encomenda.fase,
    mensagem: encomenda.mensagem,
    ultima_atualizacao: encomenda.ultima_atualizacao,
    data_entrega: encomenda.data_entrega
  };
}




