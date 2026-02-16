import { GoogleSpreadsheet } from 'google-spreadsheet';

const doc = new GoogleSpreadsheet('1XgUuKrf_hI_WHY5CReKAafoW7aby1lEWV2wAxnlesQI');

// Função para autenticar e carregar informações da planilha
async function accessSheet() {
  try {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
      throw new Error("Variável de ambiente GOOGLE_SERVICE_ACCOUNT_JSON não definida!");
    }

    const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);

    await doc.useServiceAccountAuth(serviceAccount);
    await doc.loadInfo(); // carrega informações do Sheet
  } catch (err) {
    console.error("Erro ao autenticar no Google Sheets:", err.message);
    throw err; // relança o erro para aparecer no log da Vercel
  }
}

// Função para buscar encomenda pelo ID
export async function getEncomendaById(id) {
  try {
    if (!id) {
      throw new Error("ID da encomenda não fornecido!");
    }

    await accessSheet();
    const sheet = doc.sheetsByIndex[0]; // primeira aba
    const rows = await sheet.getRows();

    const encomenda = rows.find(r => r.id.trim() === id.trim());

    if (!encomenda) {
      console.warn(`Encomenda com ID ${id} não encontrada!`);
      return null;
    }

    return {
      id: encomenda.id,
      nome_encomenda: encomenda.nome_encomenda,
      fase: encomenda.fase,
      mensagem: encomenda.mensagem,
      ultima_atualizacao: encomenda.ultima_atualizacao,
      data_entrega: encomenda.data_entrega,
    };
  } catch (err) {
    console.error("Erro ao buscar encomenda:", err.message);
    throw err;
  }
}
