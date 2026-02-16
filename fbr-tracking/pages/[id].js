import { getEncomendaById } from '../utils/googleSheets';

export default function Tracking({ encomenda }) {
  if (!encomenda) {
    return <h1 style={{ padding: 40, fontFamily: 'Arial' }}>Encomenda não encontrada</h1>;
  }

  return (
    <div style={{ padding: 40, fontFamily: 'Arial' }}>
      <h1>{encomenda.nome_encomenda}</h1>
      <p><strong>Fase:</strong> {encomenda.fase}</p>
      <p><strong>Mensagem:</strong> {encomenda.mensagem}</p>
      <p><strong>Última atualização:</strong> {encomenda.ultima_atualizacao}</p>
      <p><strong>Data de entrega:</strong> {encomenda.data_entrega}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const encomenda = await getEncomendaById(id);

  return {
    props: {
      encomenda,
    },
  };
}


