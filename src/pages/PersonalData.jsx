import React from 'react'
import '/src/App.css'

import { toast } from 'react-toastify';
import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import { getLessExpensiveStayUserServer, getMostExpensiveStayUserServer } from '../queryFunctions/StaysQuery';

const PersonalData = () => {

    const {auth, realName, userName } = useAuth();
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


    async function getStayBy(met){
        if (met === "up"){
            var retstay = await getMostExpensiveStayUserServer(userName);
            alert(`Sua estadia de maior valor foi do quarto: ${retstay.roomName}. Do dia ${retstay.startStay} ao ${retstay.endStay}. Paragando R${retstay.totalStayCost}`);
        }else{
            var retstay = await getLessExpensiveStayUserServer(userName);
            alert(`Sua estadia de menor valor foi do quarto: ${retstay.roomName}. Do dia ${retstay.startStay} ao ${retstay.endStay}. Paragando R${retstay.totalStayCost}`);
        }

    }


    const getContentPage = ()=> {
        switch(buttons){
            case 'main':{ return (<>
                <h1 style={{paddingBottom: '5%'}}>
                    Olá
                    <span style={{color:'#c586c0'}}> {realName} !</span>
                </h1>
                
                <div className='personalDataButtonsSection'>
                    <button className='personalDataButtons'
                        onClick={() => navigate('/AllUserStays')}
                    >
                        <span>📜</span>
                        Listar todas minhas estadias
                    </button>

                    <button className='personalDataButtons'
                        onClick={() => getStayBy("up")}
                    >
                        <span>⬆️</span>
                        Verificar estadia de maior valor
                    </button>

                    <button className='personalDataButtons'
                        onClick={() => getStayBy("down")}
                    >
                        <span>⬇️</span>
                        Verificar estadia de menor valor
                    </button>

                    <button className='personalDataButtons'
                        onClick={()=>{setButtons('password')}}
                    >
                        <span>🗝️</span>
                        Alterar Senha
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