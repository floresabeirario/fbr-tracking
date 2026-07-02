import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Mast, Footer, FlorSvg } from '../components/chrome';

export default function Home() {
  const router = useRouter();
  const [orderId, setOrderId] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (orderId.trim()) router.push(`/${orderId.trim()}`);
  };

  return (
    <div className="page">
      <Head>
        <title>Estado da Encomenda | Flores à Beira-Rio</title>
        <meta name="description" content="Acompanhe o progresso da sua preservação de flores. Track the progress of your flower preservation order." />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" type="image/png" />
      </Head>

      <div className="wrap">
        <FlorSvg className="page-flor" stroke="#E8C3C8" />
        <Mast tagline="Especialistas em preservação de flores · Flower preservation specialists" />

        <main className="content">
          <div>
            <h1 className="home-title">A viagem das suas flores</h1>
            <h2 className="home-sub">Your flowers&apos; journey</h2>
            <p className="home-text">Utilize o link que recebeu para acompanhar o progresso da sua preservação, ou insira o código da encomenda abaixo.</p>
            <p className="home-text-en">Use the link you received to track your preservation progress, or enter your order code below.</p>
          </div>

          <form onSubmit={handleSearch} className="search">
            <input
              type="text"
              placeholder="Código da encomenda / Order code"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="search-input"
              autoComplete="off"
              spellCheck={false}
            />
            <button type="submit" className="btn btn-primary">Rastrear / Track</button>
          </form>

          <div className="actions">
            <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Visitar Site / Visit Website
            </a>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
