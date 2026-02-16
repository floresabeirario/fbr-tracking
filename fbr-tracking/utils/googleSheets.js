// utils/googleSheets.js
import { GoogleSpreadsheet } from 'google-spreadsheet';
import creds from '../service-account.json';  // certifica-te que o ficheiro está na pasta raiz do projeto

// Substitui pelo ID do teu Google Sheet
const SPREADSHEET_ID = '1XgUuKrf_hI_WHY5CReKAafoW7aby1lEWV2wAxnlesQI';

export async function getRows() {
  try {
    // inicializa o Sheet
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

    // autentica com o ficheiro JSON
    await doc.useServiceAccountAuth(creds);

    // carrega as informações do Sheet
    await doc.loadInfo();

    // pega a primeira aba
    const sheet = doc.sheetsByIndex[0];

    // lê todas as linhas
    const rows = await sheet.getRows();

    // retorna apenas as linhas que têm ID (ignora linhas vazias)
    return rows.filter(r => r.id);
  } catch (error) {
    console.error('Erro a ler o Sheet:', error);
    throw new Error('Não foi possível ler o Google Sheet.');
  }
}

// função auxiliar para buscar uma encomenda por ID
export async function getEncomendaById(id) {
  const rows = await getRows();
  return rows.find(r => r.id === id);
}
