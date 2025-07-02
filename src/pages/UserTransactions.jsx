import React from 'react'

import { toast } from 'react-toastify';
import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthProvider';

import '/src/App.css'

function UserTransactions() {
    const [buttons, setButtons] = useState('main');
    const {auth, realName } = useAuth();
    const navigate = useNavigate();


    const getContentPage = ()=> {
        switch(buttons){
            case 'main':{ return (<>
                <h1>
                    <p>
                        Ola ! <span style={{color:'#c586c0'}}> {realName}. </span>
                    </p>
                </h1>

                <h2 style={{fontSize: 'xx-large', paddingBottom: '4%'}}>
                    O que deseja verificar em suas transações ?
                </h2>
            
                <div className='personalDataButtonsSection'>

                    <button className='personalDataButtons'
                        onClick={()=>{setButtons('maior')}}
                    >
                        <span>🔼💵</span>
                        Maior valor das estadias
                    </button>

                    <button className='personalDataButtons'
                        onClick={()=>{setButtons('menor')}}
                    >
                        <span>🔽💵</span>
                        Menor valor das estadias
                    </button>

                    <button className='personalDataButtons'
                        onClick={()=>{setButtons('total')}}
                    >
                        <span>💵</span>
                        Valor total em estadias
                    </button>


                </div>
            </>);}

            default:{
                return(<div className='personalTransactionsList'>
                    <span style={{color:'#c586c0'}}> {realName} </span> 
                    
                    <div>
                    itens ...   
                    </div>

                </div>)
            } 
        }
    }

    const goBack = () =>{
        switch(buttons){
            case 'main':
                navigate('/');
        
            default:
                setButtons("main");    
        }


    }


    return (<div className='personalTransactions'>    
        {getContentPage()}
        <button 
            className='personalDataBackButton'
            onClick={()=>{goBack()}}
        >
            🔙 Voltar
        </button>

    </div>)
}

export default UserTransactions;