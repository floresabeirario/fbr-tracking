import { GoogleSpreadsheet } from 'google-spreadsheet';

const SPREADSHEET_ID = '1XgUuKrf_hI_WHY5CReKAafoW7aby1lEWV2wAxnlesQI';

export async function getEncomendaById(id) {
  try {
    const creds = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    const encomenda = rows.find(r => r.id === id);
    return encomenda || null;

  } catch (error) {
    console.error('Erro ao ler Google Sheets:', error);
    return null;
  }
}
