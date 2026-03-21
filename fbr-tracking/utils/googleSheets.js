import { GoogleSpreadsheet } from 'google-spreadsheet';

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
if (!SPREADSHEET_ID) throw new Error('A variável GOOGLE_SPREADSHEET_ID não foi encontrada.');
const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

let isAuth = false;

async function accessSheet() {
  if (!isAuth) {
    try {
      if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
        throw new Error('A variável GOOGLE_SERVICE_ACCOUNT_JSON não foi encontrada.');
      }

      const creds = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);

      if (!creds.client_email || !creds.private_key) {
        throw new Error('O JSON não tem os campos "client_email" ou "private_key".');
      }

      const cleanPrivateKey = creds.private_key.replace(/\\n/g, '\n');

      await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: cleanPrivateKey,
      });

      isAuth = true;
    } catch (err) {
      console.error('Erro na autenticação com Google Sheets.');
      throw new Error('Falha na autenticação com Google Sheets: ' + err.message);
    }
  }
  await doc.loadInfo();
}

export async function getEncomendaById(id) {
  try {
    await accessSheet();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    const searchId = id ? id.toString().trim() : '';
    const encomenda = rows.find(r => r.id && r.id.toString().trim() === searchId);

    if (!encomenda) return null;

    return {
      id: encomenda.id,
      nome_encomenda: encomenda.nome_encomenda,
      fase: encomenda.fase || null,
      fase_en: encomenda.fase_en || null,
      fase_numero: encomenda.fase_numero ? parseInt(encomenda.fase_numero, 10) : null,
      mensagem: encomenda.mensagem || null,
      mensagem_en: encomenda.mensagem_en || null,
      ultima_atualizacao: encomenda.ultima_atualizacao,
      data_entrega: encomenda.data_entrega
    };
  } catch (err) {
    console.error('Erro no getEncomendaById:', err);
    throw err;
  }
}
