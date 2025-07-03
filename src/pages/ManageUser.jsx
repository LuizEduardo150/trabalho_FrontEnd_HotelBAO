import React from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/App.css';

const ManageUser = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        Gerenciar Usuários <br />
        <span style={{color:'#c586c0'}}>Hotel</span><span style={{color:'#7cc788'}}>BAO</span>
      </h1>

      <div style={styles.cardGrid}>
        <button style={styles.cardButton} onClick={() => navigate('/admin/RegisterUser')}>
          ➕ Inserir Usuário
        </button>

        <button style={styles.cardButton} onClick={() => alert("Função de alteração de usuário ainda não implementada.")}>
          ✏️ Alterar Usuário
        </button>

        <button style={styles.cardButton} onClick={() => alert("Função de exclusão de usuário ainda não implementada.")}>
          🗑️ Deletar Usuário
        </button>
      </div>

      <button style={styles.backButton} onClick={() => navigate('/admin')}>
        🔙 Voltar para o Painel
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '10% 20px',
    textAlign: 'center',
    color: 'white',
    minHeight: '100vh',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '50px',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    maxWidth: '900px',
    margin: '0 auto',
    marginBottom: '40px',
  },
  cardButton: {
    backgroundColor: '#c586c0',
    border: 'none',
    borderRadius: '15px',
    padding: '30px 20px',
    fontSize: '1.5rem',
    color: '#fff',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
    transition: 'transform 0.2s',
  },
  backButton: {
    backgroundColor: '#444',
    color: '#ddd',
    padding: '12px 24px',
    border: '1px solid #777',
    borderRadius: '10px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};

export default ManageUser;
