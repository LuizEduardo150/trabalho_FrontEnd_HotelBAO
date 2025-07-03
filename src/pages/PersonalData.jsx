import React from 'react'
import '/src/App.css'

import { toast } from 'react-toastify';
import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthProvider';

const PersonalData = () => {

    const {auth, realName } = useAuth();
    const navigate = useNavigate();

    const [password, setPasword] = useState('');
    const [passwordCheck, setPaswordCheck] = useState('');

    const [buttons, setButtons] = useState('main');

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


    const getContentPage = ()=> {
        switch(buttons){
            case 'main':{ return (<>
                <h1 style={{paddingBottom: '5%'}}>
                    Olá
                    <span style={{color:'#c586c0'}}> {realName}</span>
                    , o que deseja alterar em sua conta?
                </h1>
            
                <div className='personalDataButtonsSection'>

                    <button className='personalDataButtons'
                        onClick={()=>{setButtons('password')}}
                    >
                        <span>🗝️</span>
                        Alterar Senha
                    </button>

                    <button className='personalDataButtons'
                        onClick={()=>{setButtons('email')}}
                    >
                        <span>📧</span>
                        Alterar e-mail
                    </button>
                </div>
            </>);}

            case 'password':{
                return (<div className='personalDataChangePassword'>
                    <h1>
                        Alterar senha
                    </h1>
                    
                    <div>
                        Digite a senha atual:
                    </div>

                    <input style={{color:'#c586c0'}} type="password"
                        required
                    />
                    
                    <button className='personalDataButtons'
                        onClick={()=>{
                            setButtons('passwordVerifyed');
                        }}
                    >
                        Verificar
                    </button>
                
                </div>);
            }

            case 'passwordVerifyed':{
                return (
                    <form 
                        className='personalDataChangePasswordVerifyed'
                        onSubmit={(e)=>{
                            e.preventDefault();
                            if(password === passwordCheck){
                                console.log("Agora é so enviar =======");
                                

                            }
                            else{
                                console.log("Errado, deve ser igual!");
                                sendToastMessage(1, "Ambos os campos devem possuir o mesmo valor!");
                                setPasword("");
                                setPaswordCheck("");
                            }
                        }}
                    >
                        nova senha:
                        <input className='inputfontStyle'
                            type="password" value={password}
                            onChange={(e) => setPasword(e.target.value)}
                            required
                        />
                        
                        Confirme a nova senha:
                        <input className='inputfontStyle'
                            type="password" value={passwordCheck}
                            onChange={(e) => setPaswordCheck(e.target.value)}
                            required
                        />
                        
                        <button className='personalDataButtons'>
                            Enviar
                        </button>
                    
                    </form>
                )
            }



        }
    }


    function goBack(){
        switch (buttons){
            case 'main':{
                navigate('/');
            }
            default:
                setButtons('main');
        }
    }


    return (<div className='personalData'>

        <span style={{padding:'5%'}}></span>
        
        {getContentPage()}
        
        <button
                className='personalDataBackButton'
                onClick={goBack}
        >
                🔙 voltar
        </button>

  </div>)
}

export default PersonalData;