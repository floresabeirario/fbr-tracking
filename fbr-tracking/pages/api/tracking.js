// pages/api/tracking.js
import { getEncomendaById } from '../../utils/googleSheets';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'ID não fornecido' });
  }

  try {
    // Log temporário para confirmar que a variável de ambiente está definida
    console.log('GOOGLE_SERVICE_ACCOUNT_JSON length:', process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.length);

    const encomenda = await getEncomendaById(id);

    if (!encomenda) {
      return res.status(404).json({ error: 'Encomenda não encontrada' });
    }

    res.status(200).json(encomenda);
  } catch (err) {
    console.error('Erro ao acessar Google Sheets:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

