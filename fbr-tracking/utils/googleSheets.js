import { GoogleSpreadsheet } from 'google-spreadsheet';

const doc = new GoogleSpreadsheet('1XgUuKrf_hI_WHY5CReKAafoW7aby1lEWV2wAxnlesQI');

let isAuth = false;

async function accessSheet() {
  if (!isAuth) {
    try {
      await doc.useServiceAccountAuth(JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON));
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
    const encomenda = rows.find(r => r.id?.trim() === id?.trim());
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


