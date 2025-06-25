import {React, useState} from 'react'
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


    const handleSubmit = (e) => {
        e.preventDefault(); // evita recarregar a página
        console.log('Usuário:', usuario);
        console.log('Senha:', senha);
        
        // API comunicacao .... TODO!
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
                    //value={usuario}
                    //onChange={(e) => setUsuario(e.target.value)}
                    
                />
                
                <span style={{paddingTop:'2.5%'}}/>

                <p>
                    Nome de usuário:
                </p>
                <input className='inputfontStyle'
                    type="text" 
                    //value={usuario}
                    //onChange={(e) => setUsuario(e.target.value)}
                    required
                />

                <span style={{paddingTop:'2.5%'}}/>

                <p>
                    E-mail:
                </p>
                <input className='inputfontStyle'
                        type="text" 
                        //value={usuario}
                        //onChange={(e) => setUsuario(e.target.value)}
                        required
                />
                
                <span style={{paddingTop:'2.5%'}}/>

                <p>
                    Senha:
                </p>
                <input className='inputfontStyle'
                        type="text" 
                        //value={usuario}
                        //onChange={(e) => setUsuario(e.target.value)}
                        required
                />

                <span style={{paddingTop:'2.5%'}}/>

                <p>
                    Telefone:
                </p>
                <input className='inputfontStyle'
                        type="text" 
                        //value={usuario}
                        //onChange={(e) => setUsuario(e.target.value)}
                        required
                />

                <span style={{paddingTop:'2.5%'}}/>

                <p>
                    Endereço:
                </p>
                <input className='inputfontStyle'
                        type="text" 
                        //value={usuario}
                        //onChange={(e) => setUsuario(e.target.value)}
                        required
                />

                <span style={{paddingTop:'2.5%'}}/>

                <p>
                    Número:
                </p>
                <input className='inputfontStyle'
                        type="number" 
                        //value={usuario}
                        //onChange={(e) => setUsuario(e.target.value)}
                        required
                />

                <span style={{paddingTop:'2.5%'}}/>

                <p>
                    Cidade:
                </p>
                <input className='inputfontStyle'
                        type="text" 
                        //value={usuario}
                        //onChange={(e) => setUsuario(e.target.value)}
                        required
                />

                <span style={{paddingTop:'4%'}}/>

                <button 
                    style={{
                        padding: '5px 50px 5px 50px', background: '#7cc788', color: 'rgb(0, 83, 0)',
                        fontSize: '2rem'
                    }}
                    type='submit'
                    onClick={()=> {}}
                
                >
                    Concluir cadastro
                </button>

                

            </form>
        
        </div>
    )
}

export default RegisterUser