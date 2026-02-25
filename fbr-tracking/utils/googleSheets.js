import { GoogleSpreadsheet } from 'google-spreadsheet';

const doc = new GoogleSpreadsheet('1XgUuKrf_hI_WHY5CReKAafoW7aby1lEWV2wAxnlesQI');

let isAuth = false;

async function accessSheet() {
  if (!isAuth) {
    try {
      if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
        throw new Error('A variável GOOGLE_SERVICE_ACCOUNT_JSON não foi encontrada.');
      }

      const creds = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);

      // --- BLOCO DE CORREÇÃO DA CHAVE ---
      // 1. Garante que a chave existe
      if (!creds.private_key) throw new Error('O JSON não tem o campo "private_key".');

      // 2. Limpeza Profunda:
      // Remove aspas extras se existirem e converte os \n literais em quebras de linha reais
      const cleanPrivateKey = creds.private_key
        .replace(/\\n/g, '\n');

      // 3. DEBUG (Isto vai aparecer nos logs da Vercel se falhar)
      // Se a chave estiver correta, deve começar por "-----BEGIN" e ter >1500 caracteres
      console.log('DEBUG AUTH - Email:', creds.client_email);
      console.log('DEBUG AUTH - Key Start:', cleanPrivateKey.substring(0, 25) + '...');
      console.log('DEBUG AUTH - Key Length:', cleanPrivateKey.length); 

      await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: cleanPrivateKey,
      });

      isAuth = true;
    } catch (err) {
      console.error('ERRO CRÍTICO NA AUTENTICAÇÃO:', err.message);
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
      fase: encomenda.fase,
      mensagem: encomenda.mensagem,
      ultima_atualizacao: encomenda.ultima_atualizacao,
      data_entrega: encomenda.data_entrega
    };
  } catch (err) {
    console.error('Erro no getEncomendaById:', err);
    throw err; 
  }
}
