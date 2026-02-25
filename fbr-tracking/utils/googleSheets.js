import { google } from 'googleapis';

export async function getEncomendaById(id) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const range = 'Folha 1!A:H'; // Aumentámos o intervalo até à coluna H

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range,
    });

    const rows = response.data.values;
    if (!rows) return null;

    // Procurar a linha pelo ID (Coluna A)
    const row = rows.find((r) => r[0] === id);

    if (!row) return null;

    // MAPEAMENTO DAS COLUNAS (A ordem aqui é fundamental)
    return {
      id: row[0] || '',
      nome_encomenda: row[1] || '',
      fase: row[2] || '',
      fase_en: row[3] || '',           // Nova coluna
      mensagem: row[4] || '',
      mensagem_en: row[5] || '',        // Nova coluna
      ultima_atualizacao: row[6] || '',
      data_entrega: row[7] || '',
    };
  } catch (error) {
    console.error('Erro ao buscar dados do Google Sheets:', error);
    return null;
  }
}
