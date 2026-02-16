import { getEncomendaById } from '../utils/googleSheets';

const fases = [
  "Entrega das flores agendada / Flower delivery scheduled",
  "Flores recebidas / Flowers received",
  "Flores na prensa / Flowers in the press",
  "A compor o design do quadro / Designing the artwork",
  "A aguardar aprovação da composição / Awaiting design approval",
  "A ser emoldurado / Being framed",
  "Quadro pronto / Artwork ready",
  "Quadro enviado / Artwork shipped",
  "Quadro recebido / Artwork received",
];

export default function Tracking({ encomenda }) {
  if (!encomenda) {
    return (
      <h1 style={{ padding: 40, fontFamily: 'Arial' }}>
        Encomenda não encontrada / Order not found
      </h1>
    );
  }

  const currentFaseIndex = fases.indexOf(encomenda.fase);

  const passadas = fases.slice(Math.max(0, currentFaseIndex - 1), currentFaseIndex);
  const atual = fases[currentFaseIndex];
  const proximas = fases.slice(currentFaseIndex + 1, currentFaseIndex + 2);

  return (
    <div style={{
      padding: 40,
      fontFamily: 'Arial',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: 1.6
    }}>
      
      {/* Mensagem principal */}
      <h2 style={{ marginBottom: 30, fontSize: 22, textAlign: 'center' }}>
        {encomenda.mensagem}
      </h2>

      {/* Data de entrega estimada */}
      <p style={{ textAlign: 'center', fontSize: 16, marginBottom: 40 }}>
        <strong>Data de entrega estimada do quadro / Estimated delivery date:</strong><br />
        {encomenda.data_entrega}
      </p>

      {/* Barra horizontal simplificada */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 50
      }}>
        {/* Passadas */}
        {passadas.length > 0 && passadas.map((fase, idx) => (
          <span key={idx} style={{ color: '#999', fontSize: 14 }}>
            {fase}
          </span>
        ))}

        {/* Atual */}
        <span style={{ fontWeight: 'bold', color: '#333', fontSize: 16 }}>
          {atual}
        </span>

        {/* Próximas */}
        {proximas.length > 0 && proximas.map((fase, idx) => (
          <span key={idx} style={{ color: '#ccc', fontSize: 14 }}>
            {fase}
          </span>
        ))}
      </div>

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
