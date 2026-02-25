import { google } from 'googleapis';

export async function getEncomendaById(id) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    // NOME EXATO DA ABA CONFORME O SEU PRINT: Folha1
    const range = 'Folha1!A:H'; 

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      console.log("Folha vazia ou não encontrada.");
      return null;
    }

    // Procura o ID na Coluna A. 
    // O .trim() remove espaços que possam existir por acidente no Excel.
    const row = rows.find((r) => 
      r[0] && r[0].toString().trim() === id.toString().trim()
    );

    if (!row) {
      console.log(`ID ${id} não encontrado na Folha1.`);
      return null;
    }

    // Retorna os dados para o ficheiro [id].js
    return {
      id: row[0] || '',
      nome_encomenda: row[1] || '',
      fase: row[2] || '',
      fase_en: row[3] || '',
      mensagem: row[4] || '',
      mensagem_en: row[5] || '',
      ultima_atualizacao: row[6] || '',
      data_entrega: row[7] || '',
    };
  } catch (error) {
    console.error('Erro na ligação ao Google Sheets:', error.message);
    return null;
  }
}
