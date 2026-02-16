import { getEncomendaById } from '../../utils/googleSheets';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'ID não fornecido' });
  }

  try {
    const encomenda = await getEncomendaById(id);
    if (!encomenda) {
      return res.status(404).json({ error: 'Encomenda não encontrada' });
    }

    res.status(200).json(encomenda);
  } catch (err) {
    console.error('Erro interno do servidor:', err.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

