import { GoogleSpreadsheet } from 'google-spreadsheet';

// O ID da tua folha
const doc = new GoogleSpreadsheet('1XgUuKrf_hI_WHY5CReKAafoW7aby1lEWV2wAxnlesQI');

let isAuth = false;

async function accessSheet() {
  if (!isAuth) {
    try {
      // 1. Lemos a tua variável original (o JSON completo)
      if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
        throw new Error('A variável GOOGLE_SERVICE_ACCOUNT_JSON está em falta.');
      }

      const creds = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);

      // 2. A CORREÇÃO MÁGICA:
      // Vamos buscar a private_key ao JSON e corrigir as quebras de linha manualmente.
      const cleanPrivateKey = creds.private_key.replace(/\\n/g, '\n');

      // 3. Autenticamos usando o email do JSON e a chave corrigida
      await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: cleanPrivateKey,
      });

      isAuth = true;
    } catch (err) {
      console.error('Erro de autenticação:', err.message);
      throw new Error('Falha na autenticação com Google Sheets');
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
      fase: encomenda.fase,
      mensagem: encomenda.mensagem,
      ultima_atualizacao: encomenda.ultima_atualizacao,
      data_entrega: encomenda.data_entrega
    };
  } catch (err) {
    console.error('Erro ao acessar o Google Sheets:', err);
    throw err;
  }
}
