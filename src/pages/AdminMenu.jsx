import React from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/App.css';

const AdminMenu = () => {
  const navigate = useNavigate();

  function requestDeleteBD(){
      const confirmar = confirm("Tem certeza que deseja apagar todo o banco de dados?");
      if (confirmar)
        alert('Banco de dados deve ser apagado!');
      // TODO ....
  }

  
  const actions = [
    { label: 'Cadastro de Usuários', onClick: () => navigate('/ManageUser') },
    { label: 'Cadastro de Quartos', onClick: () => navigate('/rooms') },
    { label: 'Lançamento de Estadias', onClick: () => alert('Lançamento de Estadias') },
    { label: 'Listar Estadias cadastradas', onClick: () => alert('Listar Estadias') },
    { label: 'Emitir nota Fiscal', onClick: () => alert('Emitir Nota Fiscal') },
    { label: 'Relatório - Maior valor da estadia do cliente', onClick: () => alert('Relatório Maior Valor') },
    { label: 'Relatório - Menor valor da estadia do cliente', onClick: () => alert('Relatório Menor Valor') },
    { label: 'Relatório - Totalizar as estadias do cliente', onClick: () => alert('Relatório Totalizador') },
    { label: 'Limpar banco de dados', onClick: () => requestDeleteBD()}
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        Painel Administrativo <br />
        <span style={{color:'#c586c0'}}>Hotel</span><span style={{color:'#7cc788'}}>BAO</span>
      </h1>

      <div style={styles.cardGrid}>
        {actions.map((action, index) => (
          <button key={index} style={styles.cardButton} onClick={action.onClick}>
            {action.label}
          </button>
        ))}
      </div>

      <button style={styles.backButton} onClick={() => navigate('/')}>
        🔙 Voltar para o site
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '25px',
    maxWidth: '1000px',
    margin: '0 auto 40px',
  },
  cardButton: {
    backgroundColor: '#c586c0',
    border: 'none',
    borderRadius: '15px',
    padding: '20px',
    fontSize: '1.2rem',
    color: '#fff',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
    transition: 'transform 0.2s',
  },
  backButton: {
    backgroundColor: '#7cc788',
    border: '1px solid #888',
    borderRadius: '10px',
    padding: '15px 25px',
    fontSize: '1rem',
    color: '#081c00',
    cursor: 'pointer',
    maxWidth: '300px',
    justifySelf: 'center',
    margin: '0 auto',
    display: 'block',
  },
};

export default AdminMenu;
