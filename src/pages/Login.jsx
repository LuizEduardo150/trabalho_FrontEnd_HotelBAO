import { React, useState, useContext} from 'react'
import '/src/App.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthProvider } from '../AuthProvider';

const Login = () => {
  // variáveis de contexto (global)
  const global = useContext(AuthProvider)
  const [auth, setAuth] = global.authstatus
  const [userNameV, setUserNameV] = global.userNameVar
  const [realNameV, setRealNameV] = global.userRealNameVar

  //variáveis de controle da página
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  // mensagem enviada para TOAST (notificacao)
  const sendToastMessage = (code, message, time=3000) => {
    if (code === 1){
      toast.error(message, {
        autoClose: time,
        style:{
           backgroundColor: '#222',
            color: '#fff',
            fontWeight: 'bold'
        }
      });

    }else if (code === 0){

      toast.success(message, {
        autoClose: time,
        style:{
            backgroundColor: '#222',
            color: '#fff',
            fontWeight: 'bold'
        }
      
      });

    }
  };

  // envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // evita recarregar a página
    fetch('http://localhost:8080/client/login', {
      method: 'POST',
      
      headers: {'Content-Type': 'application/json'},
      
      body: JSON.stringify({
        userName: usuario,
        password: senha
      })
    }).catch(() => {
      // erro de conexao com o servidor
      sendToastMessage(1, "Desculpe. Estamos enfrentando problemas internos!\nVolte mais tarde", 10000);
      return null;
    })
    .then(response => {
      if (response == null){ return null;}

      if (!response.ok) {
        if (response.status === 404){
          throw new Error("Erro de rota");
        } else if (response.status === 401){
          sendToastMessage(1, "Credenciais inválidas!");
          setUsuario("");
          setSenha("");
          throw new Error("usuário não encontrado");
        }
        else{
          sendToastMessage(1, "Erro na requisição");
          setUsuario("");
          setSenha("");
          throw new Error(`Erro na requisição: ${response.status}`);
        }
      }
      
      return response.json()
    })
    .then(data => {
      if (data == null){ return null;}

      sendToastMessage(0, 'loguin bem sucedido');
      setAuth(data.userRole);
      setRealNameV(data.realName)
      setUserNameV(data.userName)
      navigate('/')
    })
    .catch(error => console.error(error));

  };

    return (
    <div className='loguinTable'>
        <h1>
            <span style={{color:'#c586c0'}}>Hotel</span>
            <span style={{color:'#7cc788', fontStyle: 'italic'}}>BAO</span> 
        </h1>

        <div className='containerlogin'>
            <h2 className='subtit' style={{padding:50, fontSize: '3rem', fontWeight: 100}}>
                Faça login para fazer reservas e aproveitar nossos serviços.
            </h2>

            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
            }}
            >
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'start'
                  }}
                >
                    <label>
                      USUÁRIO:
                    </label>
                    <input className='inputfontStyle'
                      type="text" value={usuario}
                      onChange={(e) => setUsuario(e.target.value)}
                      required
                    />
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'start'
                  }}
                >
                    <label>
                      SENHA:
                    </label>
                    <input className='inputfontStyle'
                      type="password" value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      required
                    />
                </div>

                <div style={{padding: '40px 0px 0px 0px', display:'flex', flexDirection: 'column'}}>
                  <button type="submit" style={{padding: '5px 50px 5px 50px', background: '#7cc788', color: 'rgb(0, 83, 0)'}}>
                    Entrar
                  </button>
                  <button type='button' className='textButtonCuston' style={{paddingTop:'20px'}}
                    onClick={() => navigate('/register')}
                  >
                    Não tem uma conta ainda? Registre - se aqui
                  </button>

                </div>

            </form>

        </div>

    </div>





  )
}


export default Login