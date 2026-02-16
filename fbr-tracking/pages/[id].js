import { getEncomendaById } from '../utils/googleSheets';

export default function Tracking({ encomenda }) {
  if (!encomenda) {
    return (
      <div style={{ padding: 40, fontFamily: 'Arial', textAlign: 'center' }}>
        <h1>Encomenda não encontrada / Order not found</h1>
      </div>
    );
  }

  return (
    <div style={{
      padding: 40,
      fontFamily: 'Arial',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: 1.6,
    }}>

      {/* Introdução neutra */}
      <p style={{ marginBottom: 30, textAlign: 'center', fontSize: 16 }}>
        Estamos a acompanhar cuidadosamente cada etapa do seu quadro, do bouquet à obra final. /<br />
        We are carefully tracking each step of your artwork, from bouquet to final piece.
      </p>

      {/* Nome da encomenda */}
      <h2 style={{ marginBottom: 20, textAlign: 'center', fontWeight: 'normal' }}>
        {encomenda.nome_encomenda}
      </h2>

      {/* Fase atual destacada */}
      <div style={{
        backgroundColor: '#f7f7f7',
        padding: 20,
        borderRadius: 10,
        textAlign: 'center',
        marginBottom: 20,
      }}>
        <h3 style={{ margin: 0, color: '#b45f9b' }}>
          {encomenda.fase}
        </h3>
      </div>

      {/* Mensagem explicativa da fase */}
      <p style={{ fontSize: 16, textAlign: 'center', marginBottom: 20 }}>
        {encomenda.mensagem}
      </p>

      {/* Data de entrega estimada */}
      <p style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
        Data de entrega estimada do quadro / Estimated delivery date: <br />
        {encomenda.data_entrega}
      </p>

      {/* Última atualização */}
      <p style={{ fontSize: 12, color: '#888', textAlign: 'center', marginBottom: 40 }}>
        Última atualização / Last update: {encomenda.ultima_atualizacao}
      </p>

      {/* Rodapé emocional */}
      <div style={{ textAlign: 'center', fontSize: 14, color: '#555' }}>
        <p>✿</p>
        <p>
          Obrigada por confiar na <strong>Flores à Beira-Rio</strong> para a preservação do seu bouquet.<br />
          Thank you for trusting <strong>Flores à Beira-Rio</strong> with the preservation of your bouquet.
        </p>
        <p>
          Cada flor está a ser cuidada com tempo, delicadeza e intenção.<br />
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
