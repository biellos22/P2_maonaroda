'use client';

import { useState, useEffect } from 'react'; // Adicionei useEffect
import axios from 'axios';
import { useRouter } from 'next/navigation';

const bairrosDeMarica = [
  'Centro', 'Flamengo', 'Mumbuca', 'Itapeba', 'Parque Nanci', 'Ponta Grossa', 
  'São José do Imbassaí', 'Araçatiba', 'Jacaroá', 'Barra de Maricá', 'Zacarias', 
  'Restinga de Maricá', 'Retiro', 'Camburi', 'Pindobas', 'Caxito', 'Ubatiba', 
  'Pilar', 'Lagarto', 'Silvado', 'Condado de Maricá', 'Marquês de Maricá', 'Inoã', 
  'Ponta Negra', 'Itaipuaçu', 'Jardim Atlântico', 'Bambuí', 'Cordeirinho', 
  'Jardim Guaratiba', 'Caju', 'Manoel Ribeiro', 'Espraiado', 'Vale da Figueira', 'Bananal'
];

const categoriasDeServico = [
  'Eletricista', 'Encanador', 'Pintor', 'Pedreiro', 'Gesseiro', 'Marceneiro', 'Serralheiro',
  'Vidraceiro', 'Técnico em ar-condicionado', 'Técnico em eletrônicos', 'Diarista', 'Faxineira', 
  'Limpeza pós-obra', 'Jardinagem', 'Piscineiro', 'Cuidador de idosos', 'Pet sitter', 'Dog walker', 
  'Manicure/pedicure', 'Maquiadora', 'Designer de sobrancelhas', 'Depiladora', 'Esteticista', 
  'Massagista', 'Personal stylist', 'Professor particular', 'Aulas de música', 'Mecânico', 
  'Lavador de carros', 'Motorista particular', 'Reboque', 'Transporte escolar', 'Motoboy', 
  'Contador', 'Designer gráfico', 'Web designer', 'Fotógrafo', 'Técnico em TI', 'Serviços gerais'
];

export default function BuscaPage() {
  const router = useRouter();
  const [categoria, setCategoria] = useState('');
  const [bairro, setBairro] = useState('');
  const [providers, setProviders] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função separada para buscar prestadores (reutilizável)
  const fetchProviders = async (filtroBairro, filtroCategoria) => {
    setLoading(true);
    setError(null);
    setSearched(true);
    setProviders([]);

    try {
      const response = await axios.get('http://127.0.0.1:5000/api/providers', {
        params: { 
          categoria: filtroCategoria || '', 
          bairro: filtroBairro || '' 
        },
      });
      setProviders(response.data);
    } catch (err) {
      setError('Erro ao buscar. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  // Efeito Automático ao Carregar a Página
  useEffect(() => {
    // 1. Pega os dados salvos no login
    const userString = localStorage.getItem('user');
    
    if (userString) {
      const user = JSON.parse(userString);
      
      // 2. Se o usuário tem um bairro salvo, preenche o filtro e busca
      if (user.bairro) {
        setBairro(user.bairro); // Atualiza visualmente o select
        fetchProviders(user.bairro, ''); // Faz a busca automática
      }
    }
  }, []); // O [] vazio significa "rode isso apenas uma vez quando abrir a tela"

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProviders(bairro, categoria);
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Limpa os dados ao sair
    router.push('/');
  };

  return (
    <div>
      <header className="header">
        <div className="container header-content">
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb' }}>Maricá Service</h1>
          <button onClick={handleLogout} className="logout-btn">Sair</button>
        </div>
      </header>

      <main className="container">
        
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2 className="title" style={{ fontSize: '2rem', color: '#1f2937' }}>Encontre Profissionais</h2>
            <p className="subtitle">Filtre por categoria ou mude o bairro.</p>
          </div>

          <form onSubmit={handleSearch}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div className="form-group">
                <label className="label">Qual serviço?</label>
                <select className="select" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                  <option value="">Todas as Categorias</option>
                  {categoriasDeServico.sort().map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="label">Qual bairro?</label>
                <select className="select" value={bairro} onChange={(e) => setBairro(e.target.value)}>
                  <option value="">Todos os Bairros</option>
                  {bairrosDeMarica.sort().map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button type="submit" disabled={loading} className="btn" style={{ maxWidth: '300px' }}>
                {loading ? 'Buscando...' : 'Buscar Profissionais'}
              </button>
            </div>
          </form>
        </div>

        {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</p>}

        {!loading && searched && providers.length === 0 && (
          <div className="card" style={{ marginTop: '20px', textAlign: 'center', borderStyle: 'dashed' }}>
            <p style={{ color: '#6b7280' }}>
              Nenhum prestador encontrado no bairro <b>{bairro}</b>.
            </p>
          </div>
        )}

        <div className="grid-providers">
          {providers.map((provider) => (
            <div key={provider._id} className="provider-card">
              <div className="provider-header">
                <span className="provider-name">{provider.nome}</span>
                <span className="provider-badge">{provider.categoria}</span>
              </div>
              
              <div className="provider-body">
                <div className="info-row">
                  <span className="info-label">Telefone:</span>
                  <span>{provider.telefone}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Bairro:</span>
                  <span>{provider.bairro}</span>
                </div>
                
                {provider.descricao && (
                  <div className="desc-box">
                    "{provider.descricao}"
                  </div>
                )}
              </div>
              
              <a 
                href={`https://wa.me/55${provider.telefone.replace(/\D/g,'')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                Conversar no WhatsApp
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}