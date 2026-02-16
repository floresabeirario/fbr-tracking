// utils/googleSheets.js
import { GoogleSpreadsheet } from 'google-spreadsheet';
import creds from '../service-account.json';  // JSON da Service Account

const SPREADSHEET_ID = '1XgUuKrf_hI_WHY5CReKAafoW7aby1lEWV2wAxnlesQI';

export async function getRows() {
  try {
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    return rows.filter(r => r.id); // ignora linhas vazias
  } catch (error) {
    console.error('Erro a ler o Sheet:', error);
    throw new Error('Não foi possível ler o Google Sheet.');
  }
}

export async function getEncomendaById(id) {
  const rows = await getRows();
  return rows.find(r => r.id === id);
}


