import { getEncomendaById } from '../utils/googleSheets';

export default function Tracking({ encomenda }) {
  if (!encomenda) {
    return (
      <h1 style={{ padding: 40, fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
        Encomenda não encontrada / Order not found
      </h1>
    );
  }

  // Fases exatas
  const fases = [
    "Entrega das flores agendada / Flower delivery scheduled",
    "Flores recebidas / Flowers received",
    "Flores na prensa / Flowers in the press",
    "A compor o design do quadro / Designing the artwork",
    "A aguardar aprovação da composição / Awaiting design approval",
    "A ser emoldurado / Being framed",
    "Quadro pronto / Artwork ready",
    "Quadro enviado / Artwork shipped",
    "Quadro recebido / Artwork received"
  ];

  const faseIndex = fases.findIndex(f => f === encomenda.fase);
  const progressPercent = faseIndex >= 0 ? ((faseIndex + 1) / fases.length) * 100 : 0;

  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      maxWidth: "650px",
      margin: "0 auto",
      padding: "40px",
      lineHeight: "1.6",
      color: "#333"
    }}>

      {/* Título principal */}
      <h1 style={{
        fontSize: "32px",
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
        Track your order with <strong>Flores à Beira-Rio</strong>
      </p>

      {/* Nome do cliente */}
      <h2 style={{
        fontSize: "28px",
        textAlign: "center",
        color: "#444",
        marginBottom: "30px"
      }}>
        {encomenda.nome_encomenda}
      </h2>

      {/* Fase atual */}
      <div style={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "30px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
      }}>
        <p style={{ fontSize: "18px", margin: "0 0 10px 0", fontWeight: "500", textAlign: "center" }}>
          Fase atual / Current stage
        </p>
        <p style={{ fontSize: "20px", fontWeight: "600", margin: "0", color: "#2c2c2c", textAlign: "center" }}>
          {encomenda.fase}
        </p>

        {/* Barra de progresso */}
        <div style={{
          position: "relative",
          backgroundColor: "#e0e0e0",
          borderRadius: "10px",
          height: "12px",
          marginTop: "20px",
          overflow: "hidden"
        }}>
          <div style={{
            width: `${progressPercent}%`,
            backgroundColor: "#888",
            height: "100%",
            transition: "width 0.5s ease-in-out"
          }}></div>

          {/* Indicadores de fases */}
          {fases.map((fase, index) => {
            const leftPercent = (index / (fases.length - 1)) * 100;
            return (
              <div key={index} style={{
                position: "absolute",
                left: `${leftPercent}%`,
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: index <= faseIndex ? "#555" : "#ccc"
              }} title={fase}></div>
            );
          })}
        </div>

        {/* Legenda das fases */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "10px",
          color: "#666",
          marginTop: "8px",
          flexWrap: "wrap"
        }}>
          {fases.map((fase, index) => (
            <span key={index} style={{ textAlign: "center", flex: "1 0 10%", minWidth: "60px" }}>
              {fase.split(" / ")[0]}<br /><span style={{ fontSize: "9px", color: "#999" }}>{fase.split(" / ")[1]}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Mensagem */}
      <div style={{ marginBottom: "30px", fontSize: "16px", lineHeight: "1.8" }}>
        {encomenda.mensagem}
      </div>

      {/* Data de entrega estimada */}
      <p style={{ fontSize: "16px", lineHeight: "1.8", marginBottom: "30px" }}>
        <strong>Data de entrega estimada do quadro / Estimated delivery date of the artwork:</strong><br />
        {encomenda.data_entrega}
      </p>

      {/* Última atualização */}
      <p style={{ fontSize: "14px", color: "#888", marginBottom: "50px" }}>
        <strong>Última atualização / Last update:</strong> {encomenda.ultima_atualizacao}
      </p>

      {/* Bloco emocional no rodapé */}
      <div style={{
        paddingTop: "30px",
        borderTop: "1px solid #f0f0f0",
        textAlign: "center",
        fontSize: "13px",
        color: "#8a8a8a",
        fontStyle: "italic",
        lineHeight: "1.8"
      }}>
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
