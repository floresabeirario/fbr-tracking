import { getEncomendaById } from '../utils/googleSheets';

export default function Tracking({ encomenda }) {
  if (!encomenda) {
    return (
      <h1 style={{ padding: 40, fontFamily: 'Poppins, sans-serif', textAlign: 'center' }}>
        Encomenda não encontrada / Order not found
      </h1>
    );
  }

  return (
    <div style={{
      fontFamily: "Poppins, sans-serif",
      maxWidth: "650px",
      margin: "0 auto",
      padding: "40px",
      lineHeight: "1.6",
      color: "#333"
    }}>

      {/* Título principal */}
      <h1 style={{
        fontFamily: "The Seasons, serif",
        fontSize: "36px",
        textAlign: "center",
        marginBottom: "10px",
        color: "#2c2c2c"
      }}>
        Acompanhamento da sua encomenda
      </h1>
      <p style={{
        textAlign: "center",
        fontSize: "16px",
        color: "#555",
        marginBottom: "40px"
      }}>
        Track your order with <strong>Flores à Beira-Rio</strong> 💛
      </p>

      {/* Nome do cliente */}
      <h2 style={{
        fontFamily: "The Seasons, serif",
        fontSize: "28px",
        textAlign: "center",
        color: "#444",
        marginBottom: "30px"
      }}>
        {encomenda.nome_encomenda}
      </h2>

      {/* Fase atual */}
      <div style={{
        backgroundColor: "#fceef4",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "30px",
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
      }}>
        <p style={{ fontSize: "18px", margin: "0 0 10px 0" }}>
          ✨ <strong>Fase atual / Current stage:</strong>
        </p>
        <p style={{ fontSize: "20px", fontWeight: "600", margin: "0", color: "#d6336c" }}>
          {encomenda.fase}
        </p>
      </div>

      {/* Mensagem detalhada */}
      <div style={{ marginBottom: "30px" }}>
        <p style={{ fontSize: "16px", lineHeight: "1.8" }}>
          <strong>Mensagem / Message:</strong><br />
          {encomenda.mensagem}
        </p>
        <p style={{ fontSize: "14px", color: "#888" }}>
          <strong>Última atualização / Last update:</strong> {encomenda.ultima_atualizacao}
        </p>
        <p style={{ fontSize: "14px", color: "#888" }}>
          <strong>Data de entrega / Delivery date:</strong> {encomenda.data_entrega}
        </p>
      </div>

      {/* Bloco emocional fofo */}
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
        <p>🌸</p>
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
