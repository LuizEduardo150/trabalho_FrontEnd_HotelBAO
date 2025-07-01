import {React, useState} from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import '/src/App.css'


const RegisterUser = () => {
    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [adress, setAdress] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');
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
    

    // Envio do formulário 
    const handleSubmit = (e) => {        
        e.preventDefault(); // evita recarregar a página
        
        fetch('http://localhost:8080/client/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            
            body: JSON.stringify({
                userName: userName,
                password: password,
                email: email,
                phone: phone,
                realName: name,
                address: adress,
                addressNumber: number,
                district: city,
            })
        })
        .catch(() => { // erro de conexao com o servidor
            sendToastMessage(1, "Desculpe. Estamos enfrentando problemas internos! Volte mais tarde.", 10000);
            return null;
        })
        .then(response => {
            if (response == null){ return null;}
            
            if(response.status === 200){
                sendToastMessage(0, "Conta registrada com sucesso. Faça seu login para fazer reservas.");
                navigate('/');
            }
            else if(response.status === 400){
                sendToastMessage(1, "Escolha outro nome de usuário!", 10000);
                setUserName("");
            }
            else if(response.status === 500){
                sendToastMessage(1, "OPS!. Ocorreu um problema interno!", 10000);
            }

            console.log(response)
        })
    };



    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '2rem'
        }}>
        
            <h1 style={{color: '#7cc788'}}>
                HotelBAO Cadastro
            </h1>

            <form onSubmit={handleSubmit} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    background: 'rgba(197, 134, 192, 0.3)',
                    borderRadius: '20px',
                    padding: '20px'
                }}
            >
                <p>Nome completo:</p>
                <input className='inputfontStyle'
                    required
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                
                <span style={{paddingTop:'2.5%'}}/>

                <p>
                    Nome de usuário:
                </p>
                <input className='inputfontStyle'
                    type="text" 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />

                <span style={{paddingTop:'2.5%'}}/>

                <p>
                    E-mail:
                </p>
                <input className='inputfontStyle'
                        type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                />
                
                <span style={{paddingTop:'2.5%'}}/>

                <p>
                    Senha:
                </p>
                <input className='inputfontStyle'
                        type="text" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                />

                <span style={{paddingTop:'2.5%'}}/>

                <p>
                    Telefone:
                </p>
                <input className='inputfontStyle'
                        type="text" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                />

                <span style={{paddingTop:'2.5%'}}/>

                <p>
                    Endereço:
                </p>
                <input className='inputfontStyle'
                        type="text" 
                        value={adress}
                        onChange={(e) => setAdress(e.target.value)}
                        required
                />

                <span style={{paddingTop:'2.5%'}}/>

                <p>
                    Número:
                </p>
                <input className='inputfontStyle'
                        type="number" 
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        required
                />

                <span style={{paddingTop:'2.5%'}}/>

                <p>
                    Cidade:
                </p>
                <input className='inputfontStyle'
                        type="text" 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                />

                <span style={{paddingTop:'4%'}}/>

                <button 
                    style={{
                        padding: '5px 50px 5px 50px', background: '#7cc788', color: 'rgb(0, 83, 0)',
                        fontSize: '2rem'
                    }}
                    type='submit'
                >
                    Concluir cadastro
                </button>

                

            </form>
        
        </div>
    )
}

export default RegisterUser