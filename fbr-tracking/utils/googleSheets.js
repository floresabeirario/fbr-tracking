import { google } from 'googleapis';

export async function getEncomendaById(id) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    // NOME EXATO DA TUA ABA: Folha1
    // Usamos A:Z para garantir que ele lê todas as colunas sem restrição
    const range = 'Folha1!A:Z'; 

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) return null;

    // BUSCA ROBUSTA:
    // 1. Converte ID para texto
    // 2. Remove espaços (trim)
    // 3. Ignora maiúsculas/minúsculas (toLowerCase)
    const row = rows.find((r) => 
      r[0] && r[0].toString().trim().toLowerCase() === id.toString().trim().toLowerCase()
    );

    if (!row) return null;

    // MAPEAMENTO SEGURO (Baseado no teu print: A=0, B=1, C=2, D=3, E=4, F=5, G=6, H=7)
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
    console.error('Erro na ligação:', error.message);
    return null;
  }
}
