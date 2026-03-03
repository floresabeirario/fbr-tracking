import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [orderId, setOrderId] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (orderId.trim()) router.push(`/${orderId.trim()}`);
  };

  return (
    <div style={st.pageWrapper}>
      <Head>
        <title>Status | Flores à Beira-Rio</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{__html:`body{margin:0;padding:0;background-color:#F0F2F0;}@font-face{font-family:'TanMemories';src:url('/fonts/TAN-MEMORIES.otf') format('opentype');}@font-face{font-family:'TanMemories';src:url('/fonts/TAN-MEMORIES-Italic.otf') format('opentype');font-style:italic;}`}} />
      </Head>

      <div style={st.card}>
        <header style={st.headerBand}>
          <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" style={st.brandLink}>
            <h1 style={st.brandName}>Flores à<br />Beira-Rio</h1>
          </a>
          <p style={st.tagline}>Especialistas em preservação de flores · Flower preservation specialists</p>
        </header>

        <div style={st.body}>
          <div style={st.welcomeSection}>
            <h2 style={st.headingTitle}>A viagem das suas flores</h2>
            <h3 style={st.headingSubtitle}>Your flowers' journey</h3>
            <div style={st.textBlock}>
              <p style={st.welcomeText}>Utilize o link que recebeu para acompanhar o progresso da sua preservação, ou insira o código da encomenda abaixo.</p>
              <p style={st.welcomeTranslation}>Use the link you received to track your preservation progress, or enter your order code below.</p>
            </div>
          </div>

          <form onSubmit={handleSearch} style={st.searchForm}>
            <input type="text" placeholder="Ex: 2024001" value={orderId} onChange={(e) => setOrderId(e.target.value)} style={st.input} />
            <button type="submit" style={st.buttonSearch}>Rastrear / Track</button>
          </form>

          <div style={st.actionSection}>
            <a href="https://floresabeirario.pt" target="_blank" rel="noopener noreferrer" style={st.buttonSite}>
              <span style={{marginRight:'8px',fontSize:'18px',lineHeight:'1'}}>✿</span>
              Visitar Site / Visit Website
            </a>
          </div>
        </div>

        <footer style={st.footer}>
          <div style={st.socialRow}>
            <a href="https://www.instagram.com/floresabeirario/" target="_blank" rel="noopener noreferrer" style={st.socialIcon} aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://www.facebook.com/floresabeirario/" target="_blank" rel="noopener noreferrer" style={st.socialIcon} aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://maps.app.goo.gl/qGGdyE8mo2kdNBmm7" target="_blank" rel="noopener noreferrer" style={st.socialIcon} aria-label="Maps">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </a>
          </div>
          <a href="https://maps.app.goo.gl/qGGdyE8mo2kdNBmm7" target="_blank" rel="noopener noreferrer" style={st.locationLink}>Coimbra, Portugal</a>
          <p style={st.copyright}>© Flores à Beira-Rio</p>
        </footer>
      </div>
    </div>
  );
}

const st = {
  pageWrapper: { minHeight:'100vh', backgroundColor:'#F0F2F0', display:'flex', justifyContent:'center', alignItems:'center', padding:'20px', fontFamily:'"Urbanist", sans-serif', color:'#1D1D1F' },
  card: { backgroundColor:'#FFFFFF', width:'100%', maxWidth:'460px', boxShadow:'0 8px 30px rgba(0,0,0,0.06)', borderRadius:'24px', textAlign:'center', overflow:'hidden' },
  headerBand: { backgroundColor:'#2F3E32', padding:'32px 28px 26px', textAlign:'center' },
  brandLink: { textDecoration:'none', cursor:'pointer', color:'inherit' },
  brandName: { fontFamily:'"TanMemories", serif', fontSize:'40px', margin:'0 0 10px 0', fontWeight:'400', letterSpacing:'-0.01em', lineHeight:'1.15', color:'#E8F0E9' },
  tagline: { fontSize:'10px', letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(232,240,233,0.55)', fontWeight:'500', margin:0 },
  body: { padding:'30px 30px' },
  welcomeSection: { marginBottom:'32px' },
  headingTitle: { fontFamily:'"TanMemories", serif', fontSize:'32px', color:'#2F3E32', margin:'0 0 5px 0', fontWeight:'400', lineHeight:'1.1' },
  headingSubtitle: { fontFamily:'"TanMemories", serif', fontSize:'24px', color:'#86868B', margin:'0 0 22px 0', fontWeight:'400', fontStyle:'italic' },
  textBlock: { padding:'0 6px' },
  welcomeText: { fontSize:'15px', lineHeight:'1.6', color:'#424245', marginBottom:'8px' },
  welcomeTranslation: { fontSize:'13px', lineHeight:'1.5', color:'#86868B', fontStyle:'italic' },
  searchForm: { display:'flex', flexDirection:'column', gap:'12px', marginBottom:'20px' },
  input: { padding:'16px', borderRadius:'14px', border:'1px solid #E5E5EA', fontSize:'16px', fontFamily:'"Urbanist", sans-serif', textAlign:'center', outline:'none', backgroundColor:'#F9F9F9', color:'#1D1D1F' },
  buttonSearch: { backgroundColor:'#2F3E32', color:'#FFFFFF', border:'none', padding:'16px', borderRadius:'14px', fontSize:'15px', fontWeight:'600', cursor:'pointer', fontFamily:'"Urbanist", sans-serif' },
  actionSection: { display:'flex', justifyContent:'center', marginBottom:'10px' },
  buttonSite: { display:'flex', alignItems:'center', justifyContent:'center', width:'100%', backgroundColor:'#FFFFFF', color:'#2F3E32', textDecoration:'none', padding:'16px', borderRadius:'14px', fontSize:'15px', fontWeight:'600', border:'2px solid #2F3E32', cursor:'pointer' },
  footer: { borderTop:'1px solid #F5F5F7', paddingTop:'26px', paddingBottom:'26px' },
  socialRow: { display:'flex', justifyContent:'center', gap:'20px', marginBottom:'16px' },
  socialIcon: { width:'44px', height:'44px', borderRadius:'50%', backgroundColor:'#F5F5F7', display:'flex', justifyContent:'center', alignItems:'center', textDecoration:'none' },
  locationLink: { display:'inline-block', fontSize:'12px', fontWeight:'600', color:'#1D1D1F', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'8px', textDecoration:'none' },
  copyright: { fontSize:'11px', color:'#86868B' },
};
