import { GoogleSpreadsheet } from 'google-spreadsheet';

// O ID da tua folha
const doc = new GoogleSpreadsheet('1XgUuKrf_hI_WHY5CReKAafoW7aby1lEWV2wAxnlesQI');

let isAuth = false;

async function accessSheet() {
  if (!isAuth) {
    try {
      // 1. Vamos buscar a chave privada dentro do teu JSON
      const credsJSON = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
      
      // 2. A CORREÇÃO CRÍTICA:
      // Pegamos na chave que veio do JSON e corrigimos as quebras de linha manualmente.
      // Sem isto, o JWT falha sempre na Vercel.
      const privateKey = credsJSON.private_key 
        ? credsJSON.private_key.replace(/\\n/g, '\n')
        : undefined;

      // 3. Autenticamos usando o email da variável e a chave corrigida
      await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_CLIENT_EMAIL, // Usamos a tua variável de email
        private_key: privateKey,
      });

      isAuth = true;
    } catch (err) {
      console.error('Erro de autenticação com a conta de serviço:', err);
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
    
    // Pequena proteção para evitar erros se o ID for undefined
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
    throw new Error('Erro ao acessar dados do Google Sheets');
  }
}
