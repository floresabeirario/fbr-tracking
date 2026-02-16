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

  return (
    <div style={{ 
      padding: '40px 20px', 
      fontFamily: 'Arial', 
      maxWidth: '600px', 
      margin: '0 auto', 
      lineHeight: '1.6' 
    }}>
      
      {/* Mensagem principal */}
      <h2 style={{ marginBottom: '20px', fontSize: '24px', textAlign: 'center' }}>
        {encomenda.mensagem}
      </h2>

      {/* Data de entrega estimada */}
      <p style={{ textAlign: 'center', fontSize: '16px', marginBottom: '40px' }}>
        <strong>Data de entrega estimada do quadro / Estimated delivery date:</strong><br />
        {encomenda.data_entrega}
      </p>

      {/* Timeline vertical */}
      <div style={{ borderLeft: '2px solid #ccc', paddingLeft: '20px', marginBottom: '50px' }}>
        {fases.map((fase, idx) => {
          const isPast = idx < currentFaseIndex;
          const isCurrent = idx === currentFaseIndex;

          return (
            <div key={fase} style={{ marginBottom: '20px', position: 'relative' }}>
              {/* Ponto da timeline */}
              <div style={{
                position: 'absolute',
                left: '-11px',
                top: '2px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: isCurrent ? '#333' : (isPast ? '#999' : '#eee'),
                border: '2px solid #ccc'
              }}></div>

              {/* Texto da fase */}
              <span style={{
                fontWeight: isCurrent ? 'bold' : 'normal',
                color: isCurrent ? '#333' : (isPast ? '#555' : '#888')
              }}>
                {fase}
              </span>
            </div>
          );
        })}
      </div>

      {/* Última atualização */}
      <p style={{ textAlign: 'center', fontSize: '14px', color: '#777' }}>
        <strong>Última atualização / Last update:</strong><br />
        {encomenda.ultima_atualizacao}
      </p>

      {/* Rodapé emocional */}
      <div style={{
        marginTop: '50px',
        paddingTop: '30px',
        borderTop: '1px solid #f0f0f0',
        textAlign: 'center',
        fontSize: '13px',
        color: '#8a8a8a',
        fontStyle: 'italic',
        lineHeight: '1.8'
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
