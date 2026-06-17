'use client';

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const API_BASE_URL = 'https://p2-maonaroda.onrender.com/api';

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
  'Vidraceiro', 'Técnico em ar-condicionado', 'Técnico em eletrônicos / eletrodomésticos',
  'Diarista', 'Faxineira', 'Limpeza pós-obra', 'Limpeza de estofados', 'Jardinagem', 'Piscineiro',
  'Cuidador de idosos', 'Pet sitter', 'Dog walker', 'Serviços de pet shop domiciliar',
  'Manicure/pedicure', 'Maquiadora', 'Designer de sobrancelhas', 'Depiladora', 'Esteticista',
  'Massagista', 'Personal stylist', 'Professor particular', 'Aulas de música', 'Aulas de inglês / idiomas',
  'Aulas de informática', 'Reforço para ENEM ou concursos', 'Treinador pessoal / personal trainer',
  'Mecânico', 'Lavador de carros a domicílio', 'Motorista particular', 'Reboque / guincho',
  'Transporte escolar', 'Motoboy / entregador', 'Contador', 'Designer gráfico', 'Web designer',
  'Fotógrafo', 'Filmagem de eventos', 'Técnico em TI / manutenção de computadores',
  'Digitador / assistente virtual', 'Garçom / copeiro', 'Barman', 'Buffet', 'Decorador de festas',
  'DJ', 'Animador infantil', 'Locação de brinquedos', 'Engenheiro civil', 'Mestre de obras',
  'Topógrafo', 'Corretor de imóveis', 'Costureira', 'Personal organizer', 'Montador de móveis',
  'Instalador de TV/Internet', 'Serviços gerais (faz-tudo)'
];

export default function CadastroPage() {
  const router = useRouter();
  const [tipoUsuario, setTipoUsuario] = useState('cliente');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    nome: '', email: '', senha: '', telefone: '',
    bairro: '', cidade: 'Maricá', categoria: '', descricao: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const dataToSend = { 
        ...formData, 
        tipo: tipoUsuario,
        categoria: tipoUsuario === 'cliente' ? undefined : formData.categoria,
        descricao: tipoUsuario === 'cliente' ? undefined : formData.descricao
      };

      await axios.post(`${API_BASE_URL}/register`, dataToSend);
      router.push('/'); 
    } catch (err) {
      console.error(err);
      const mensagem = err.response?.data?.message || 'Erro ao conectar com o servidor.';
      setError(mensagem);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
      <div className="card" style={{ width: '100%', maxWidth: '700px' }}>
        <h2 className="title" style={{ marginBottom: '20px' }}>Crie sua conta</h2>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}>
          <button 
            type="button" 
            onClick={() => setTipoUsuario('cliente')} 
            className="btn" 
            style={{ width: 'auto', padding: '10px 20px', background: tipoUsuario === 'cliente' ? 'var(--primary)' : '#e5e7eb', color: tipoUsuario === 'cliente' ? '#fff' : '#374151' }}
          >
            Sou Cliente
          </button>
          <button 
            type="button" 
            onClick={() => setTipoUsuario('prestador')} 
            className="btn" 
            style={{ width: 'auto', padding: '10px 20px', background: tipoUsuario === 'prestador' ? 'var(--primary)' : '#e5e7eb', color: tipoUsuario === 'prestador' ? '#fff' : '#374151' }}
          >
            Sou Prestador
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            <div className="form-group">
              <label className="label">Nome Completo</label>
              <input required name="nome" type="text" onChange={handleChange} className="input" />
            </div>
            <div className="form-group">
              <label className="label">Email</label>
              <input required name="email" type="email" onChange={handleChange} className="input" />
            </div>
            <div className="form-group">
              <label className="label">Senha</label>
              <input required name="senha" type="password" onChange={handleChange} className="input" />
            </div>
            <div className="form-group">
              <label className="label">Telefone / WhatsApp</label>
              <input required name="telefone" type="text" onChange={handleChange} placeholder="(21) 99999-9999" className="input" />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="label">Bairro</label>
              <select required name="bairro" onChange={handleChange} className="select">
                <option value="">Selecione seu bairro...</option>
                {bairrosDeMarica.sort().map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>

          {tipoUsuario === 'prestador' && (
            <div style={{ background: '#f9fafb', padding: '20px', borderRadius: '8px', marginTop: '20px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#1f2937', marginBottom: '15px', fontWeight: 'bold' }}>Dados Profissionais</h3>
              <div className="form-group">
                <label className="label">Categoria de Serviço</label>
                <select required name="categoria" onChange={handleChange} className="select">
                  <option value="">Selecione sua categoria...</option>
                  {categoriasDeServico.sort().map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="label">Descrição do seu trabalho</label>
                <textarea name="descricao" onChange={handleChange} rows="3" placeholder="Ex: Faço instalações residenciais..." className="input"></textarea>
              </div>
            </div>
          )}

          {error && (
            <div style={{ color: '#dc2626', background: '#fef2f2', padding: '10px', borderRadius: '8px', marginTop: '15px', border: '1px solid #fecaca' }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn" style={{ marginTop: '25px' }}>
            {loading ? 'Cadastrando...' : (tipoUsuario === 'cliente' ? 'Cadastrar como Cliente' : 'Cadastrar como Prestador')}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem', color: '#6b7280' }}>
          <p>Já tem uma conta? <Link href="/" style={{ color: '#2563eb', fontWeight: 'bold' }}>Faça Login</Link></p>
        </div>
      </div>
    </div>
  );
}