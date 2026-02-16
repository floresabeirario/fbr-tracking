import { GoogleSpreadsheet } from 'google-spreadsheet';

// ID do teu Google Sheet
const SPREADSHEET_ID = '1XgUuKrf_hI_WHY5CReKAafoW7aby1lEWV2wAxnlesQI';

// Função para buscar a encomenda pelo ID
export async function getEncomendaById(id) {
  try {
    // Pega as credenciais da variável de ambiente
    const creds = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();

    // Pega a primeira aba do sheet
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    // Procura a linha com o ID correspondente
    const encomenda = rows.find(r => r.id === id);

    if (!encomenda) return null;

    return {
      id: encomenda.id,
      nome_encomenda: encomenda.nome_encomenda,
      fase: encomenda.fase,
      m


