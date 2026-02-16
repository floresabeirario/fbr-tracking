import { getEncomendaById } from '../utils/googleSheets';

export default function Tracking({ encomenda }) {
  if (!encomenda) {
    return (
      <h1 style={{ padding: 40, fontFamily: 'Arial' }}>
        Encomenda não encontrada
      </h1>
    );
  }

  return (
    <div style={{ 
      padding: 40, 
      fontFamily: 'Arial', 
      maxWidth: '600px', 
      margin: '0 auto',
      lineHeight: '1.6'
    }}>
      <h1 style={{ marginBottom: '20px' }}>
        {encomenda.nome_encomenda}
      </h1>

      <p><strong>Fase:</strong> {encomenda.fase}</p>
      <p><strong>Mensagem:</strong> {encomenda.mensagem}</p>
      <p><strong>Última atualização:</strong> {encomenda.ultima_atualizacao}</p>
      <p><strong>Data de entrega:</strong> {encomenda.data_entrega}</p>

      {/* Bloco emocional */}
      <div style={{
        marginTop: "50px",
        paddingTop: "30px",
        borderTop: "1px solid #f0f0f0",
        textAlign: "center",
        fontSize: "13px",
        color: "#8a8a8a",
        fontStyle: "italic",
        lineHeight: "1.8"
      }}>
        <p>✿</p>
        <p>
          Obrigada por confiares à <strong>Flores à Beira-Rio</strong> a preservação do teu bouquet.
        </p>
        <p>
          Cada flor está a ser cuidada com tempo, delicadeza e intenção.
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



