import { getEncomendaById } from '../utils/googleSheets';

export default function Tracking({ encomenda }) {
  if (!encomenda) {
    return (
      <h1 style={{ padding: 40, fontFamily: 'Arial' }}>
        Encomenda não encontrada / Order not found
      </h1>
    );
  }

  return (
    <div style={{
      padding: 40,
      fontFamily: 'Arial',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: 1.6
    }}>
      
      {/* Cabeçalho: nome da encomenda */}
      <h1 style={{ marginBottom: 30, textAlign: 'center' }}>
        {encomenda.nome_encomenda}
      </h1>

      {/* Caixa da fase */}
      <div style={{
        padding: 20,
        backgroundColor: '#f7f7f7',
        borderRadius: 8,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 30
      }}>
        {encomenda.fase}
      </div>

      {/* Mensagem */}
      <p style={{ fontSize: 16, textAlign: 'center', marginBottom: 30 }}>
        {encomenda.mensagem}
      </p>

      {/* Data de entrega estimada do quadro */}
      <p style={{ textAlign: 'center', fontSize: 16, marginBottom: 50 }}>
        <strong>Data de entrega estimada do quadro / Estimated delivery date:</strong><br />
        {encomenda.data_entrega}
      </p>

      {/* Última atualização */}
      <p style={{ textAlign: 'center', fontSize: 14, color: '#777', marginBottom: 50 }}>
        <strong>Última atualização / Last update:</strong><br />
        {encomenda.ultima_atualizacao}
      </p>

      {/* Rodapé emocional */}
      <div style={{
        paddingTop: 30,
        borderTop: '1px solid #f0f0f0',
        textAlign: 'center',
        fontSize: 13,
        color: '#8a8a8a',
        fontStyle: 'italic',
        lineHeight: 1.8
      }}>
        <p>✿</p>
        <p>
          Obrigada por confiar na <strong>Flores à Beira-Rio</strong> para a preservação do seu bouquet.
        </p>
        <p>
          Thank you for trusting <strong>Flores à Beira-Rio</strong> with the preservation of your bouquet.
        </p>
        <br />
        <p>
          Cada flor está a ser cuidada com tempo, delicadeza e intenção.
        </p>
        <p>
          Each flower is being cared for with time, delicacy and intention.
        </p>
      </div>

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
