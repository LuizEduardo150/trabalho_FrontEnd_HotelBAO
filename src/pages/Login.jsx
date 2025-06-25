import { React, useState } from 'react'
import '/src/App.css'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const goRegister = () => {
    navigate('/register')
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // evita recarregar a página
    console.log('Usuário:', usuario);
    console.log('Senha:', senha);
    
    

    fetch('http://localhost:8080/client', {
      method: 'POST',
      
      headers: {'Content-Type': 'application/json'},
      
      body: JSON.stringify({
            userName: "Luiz ed",
            password: "123",
            email: "luiz@gmail.com",
            phone: "31313131",
            realName: "Luiz Eduardo",
            address: "tenente helin",
            addressNumber: "290",
            district: "Santa cruz",
            userType: "client"
  })
  })
  .then(response => response.json())
  .then(data => console.log('User created:', data))
  .catch(error => console.error('Error creating user:', error));



    // API comunicacao .... TODO!
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
                    onClick={goRegister}
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