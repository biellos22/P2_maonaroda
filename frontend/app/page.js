'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', senha: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/login', formData);
      
      // Salva os dados (incluindo o bairro) no navegador para usar na busca
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      router.push('/busca');
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
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h1 className="title">Maricá Service</h1>
        <p className="subtitle">Acesse sua conta</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Email</label>
            <input 
              className="input"
              required 
              name="email" 
              type="email" 
              onChange={handleChange} 
              placeholder="seu@email.com"
            />
          </div>
          <div className="form-group">
            <label className="label">Senha</label>
            <input 
              className="input"
              required 
              name="senha" 
              type="password" 
              onChange={handleChange} 
              placeholder="********"
            />
          </div>

          {error && (
            <div style={{ color: '#dc2626', background: '#fef2f2', padding: '10px', borderRadius: '8px', marginBottom: '15px', fontSize: '0.9rem', border: '1px solid #fecaca' }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn">
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem', color: '#6b7280', borderTop: '1px solid #e5e7eb', paddingTop: '15px' }}>
          <p>Não tem conta?</p>
          <Link href="/cadastro" style={{ color: '#2563eb', fontWeight: 'bold' }}>
            Cadastre-se Gratuitamente
          </Link>
        </div>
      </div>
    </div>
  );
}