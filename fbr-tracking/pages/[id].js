import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Tracking() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/tracking?id=${id}`)
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!data) return <p>Encomenda não encontrada</p>;

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '2rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h1>Tracking da sua encomenda 🤍</h1>
      <h2>{data.nome_encomenda}</h2>
      <p><strong>Fase:</strong> {data.fase}</p>
      <p>{data.mensagem}</p>
      <p><strong>Última atualização:</strong> {data.ultima_atualizacao}</p>
      <p><strong>Data prevista de entrega:</strong> {data.data_entrega}</p>
      <div style={{ height: '10px', background: '#eee', borderRadius: '5px', marginTop: '1rem' }}>
        <div style={{ width: `${((["entrega de flores agendada","flores recebidas","flores na prensa","a compor o design do quadro","a aguardar aprovação da composição","a ser emoldurado","quadro pronto","quadro enviado","quadro recebido"].indexOf(data.fase)+1)/9)*100}%`, background: '#A07C5B', height: '100%', borderRadius: '5px' }} />
      </div>
    </div>
  );
}
