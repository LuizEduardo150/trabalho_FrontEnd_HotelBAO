import{  React, useState, useMemo, use} from 'react';
import { useNavigate } from 'react-router-dom';

import  { getAllUsersServer, deleteUserServer, getUserByRealNameServer,
          getUserByUserNameServer, getUserByEmailServer, getUserByIdServer
        } from '../queryFunctions/UserQuery';
import '/src/App.css';

const ManageUser = () => {
  const navigate = useNavigate();
  const [menuContext, setMenuContext] = useState('main');
  const [usersList, setUsersList] = useState([]);
  const [update, forceUpdate] = useState(false);

  const [message, setMessage] = useState('');

  const [input, setInput] = useState('');
  const [inputType, setInputType] = useState('text');


  // Funcao que gerencia o botao de VOLTAR
  function goBack(){
    switch (menuContext){
      case 'main':{
        navigate('/admin');
        break;
      }

      case 'change':{
        setMenuContext('main');
        break;
      }
    
      case 'listUsers':{
        setMenuContext('change');
        break;
      }
      
      default:{
        setMenuContext('change');
      }

    }
  }

  async function getAllUsers(){
    setMenuContext('listUsers'); // alterr contexto de exibição do menú
    let ret = await getAllUsersServer(); // obter dados com o servidor
    setUsersList(ret.content); // atualizar state
  }

  function goEditUserData(id){
    navigate(`/editUserData/${id}`)
  }

  // função excutadas por botoes
  function getUserBy(by){
    setMenuContext(by);
    setInput(''); // limpar possível consulta anterior
    switch (by){
      case 'realname':{
        setMessage("nome real do usuário");
        setInputType("text");
        break;
      }
      case 'username':{
        setMessage("nome de usuário (usado para login)");
        setInputType("text");
        break;
      }
      case 'email':{
        setMessage("e-mail");
        setInputType("text");
        break;
      }
      case 'id':{
        setMessage('id do usuário');
        setInputType("number");
        break;
      }
      default:{
        setMenuContext('main');
      }
    }
  }

  // Funcao que mapeia proximo passo após confirmação da pesquisa: by[nome, email, etc..]
  async function confirmarPesquisa (){
    if (input.length == 0)
      return null

    var ret = null;

    switch (menuContext){
      case 'realname':{
        setMessage("nome real do usuário");
        setInputType("text");
        ret = await getUserByRealNameServer(input);
        break;
      }
      case 'username':{
        setMessage("nome de usuário (usado para login)");
        setInputType("text");
        ret = await getUserByUserNameServer(input);
        break;
      }
      case 'email':{
        setMessage("e-mail");
        setInputType("text");
        ret = await getUserByEmailServer(input);
        break;
      }
      case 'id':{
        setMessage('id do usuário');
        setInputType("number");
        ret = await getUserByIdServer(input);
        break;
      }
      default:{
        setMenuContext('main');
      }
    }

    if(ret !== null && ret !== false){
      var item = {
        address: ret.address,
        addressNumber: ret.addressNumber,
        district: ret.district,
        email: ret.email,
        password: ret.password,
        phone: ret.phone,
        realName: ret.realName,
        username: ret.username
      }
      navigate(`/editUserData/${JSON.stringify(item)}`)
    }
    else{
      setInput('');
    }


  }

  async function deleteUser(id, index){
    const confirmar = confirm("Tem certeza que deseja apagar esse usuário do sistema?");
      if (confirmar){
        var ret = await deleteUserServer(id);
        
        if(ret){
          alert('Usuário apagado!');
          usersList[index] = null;
          forceUpdate(!update);
        } 
      }   
  }


  // Componente de exibicao de todos os usuários cadastrados
  const usersListComponent = useMemo(() => {
    return(<div style={{display:'flex', flexDirection:'column', gap:10}}>{
        usersList.map((user, index) => ( user === null ? null :
          <div className='editItemSelect'>
            <button 
                  style={{background:'rgba(255, 255, 255, 0.35)', marginRight:'1%', cursor: 'pointer'}}
                  onClick={()=>goEditUserData(user.id)}
            >
              ✏️
            </button>

            <button
                  style={{background:'rgba(255, 0, 0, 0.2)', marginRight:'1%', cursor: 'pointer'}}
                  onClick={()=>deleteUser(user.id, index)} 
            >
              🗑️
            </button>
            
            <div style={user.auth === 'client'? styles.userCard : styles.admCard} >
                {user.auth}
            </div>
            
            <div style={{display:'flex', flexDirection:'row'}}>
            
              <div>
                ID:{'('}{user.id}{')'}
              </div>

              <div>
                User Name: {user.userName}
              </div>
              
              <div>
                Nome: {user.realName}  
              </div>
              
              <div>
                Email: {user.email}
              </div>
            
            </div>

          </div>
        ))  
    }</div>)
  }, [usersList, update]);


  const menuOptions = useMemo(()=>{ switch(menuContext){
      // MENU PRINCIPAL ==========================================================================
      case 'main': {return(
        <div style={styles.cardGrid}>
          <button style={styles.cardButton} onClick={() => navigate('/RegisterUser')}>
            ➕ Inserir Usuário
          </button>

          <button style={styles.cardButton} onClick={() => {setMenuContext('change')}}>
            ✏️ Usuários Cadastrados
          </button>
      </div>
      )}
      
      // MENU ALTERECAO ==========================================================================
      case 'change':{return(
        <div style={styles.cardGrid}>
          <button style={styles.cardButton} onClick={()=> getAllUsers()}> Listar todos usuários cadastrados </button>
          <button style={styles.cardButton} onClick={() => getUserBy("realname")}> Buscar por nome real </button>
          <button style={styles.cardButton} onClick={() => getUserBy("username")}> Buscar por nome de usuário </button>
          <button style={styles.cardButton} onClick={() => getUserBy("email")}> Buscar por e-mail </button>
          <button style={styles.cardButton} onClick={() => getUserBy("id")}> Buscar por ID de cadastro </button>
        </div>
      )}
      
      // LISTA DE USUÁRIOS CADASTRADOS ==========================================================================
      case 'listUsers':{
        return(
          <div>
              {usersListComponent}
          </div>
        )
      }

      // BUSCA POR NOME REAL OU NOME DE USUÁRIO OU POR EMAIL ou ID ====================
      default:{return(
        <div style={{fontSize:'xx-large'}}>
          Digite o {message}:
          <input className='inputfontStyle'
            type={inputType}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div style={{paddingTop:'1%', paddingBottom:"1%"}}>
            <button className='cofirmButton lowButtonProfile' onClick={confirmarPesquisa}>Confirmar</button>
            <button className='cancelButton lowButtonProfile' onClick={() => goBack()}>Cancelar</button>
          </div>
        </div>
      )}


  }}, [menuContext, usersList, input]);

  return (
    <div style={styles.container}>
      
      <h1 style={styles.title}>
        Gerenciar Usuários <br />
        <span style={{color:'#c586c0'}}>Hotel</span><span style={{color:'#7cc788'}}>BAO</span>
      </h1>

      {menuOptions}

      <button style={styles.backButton} onClick={() => goBack()}>
        🔙 Voltar
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
  userCard:{
    alignSelf: 'center',
    padding: '5px',
    fontSize: 'x-large',
    borderRadius: '10px',
    background: 'grey'
  },
  admCard:{
    alignSelf: 'center',
    padding: '5px',
    fontSize: 'x-large',
    borderRadius: '10px',
    background: 'rgb(168, 22, 107)'
  }
};

export default ManageUser;
