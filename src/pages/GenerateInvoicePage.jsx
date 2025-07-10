import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaMailBulk, FaPhone, FaArrowAltCircleLeft } from 'react-icons/fa';

import { getAllStaysDetailedServer, getAllStaysDetailOfUserByEmailServer } from '../queryFunctions/StaysQuery';
import { getUserByEmailServer } from '../queryFunctions/UserQuery';
import { getFormatedStringDate } from './RoomPage';
import { sendToastMessage } from '../components/ToastMensage';
import '/src/App.css';


function getDateObject(stringData){
    var vtr = stringData.split('-');    
    return new Date(vtr[0], vtr[1]-1, vtr[2])
}

function dateString(stringDate){
    return getFormatedStringDate(getDateObject(stringDate), '/');
}


const GenerateInvoicePage = () => {
    const navigate = useNavigate();
    const [staysList, setStaysList] = useState([]);
    const [email, setEmail] = useState('');
    const [menuContext, setMenuContext] = useState("main");
    const [activeIndex, setActiveIndex] = useState(null);

    // Obtencao dos dados com o backend
    async function loadData(){
        const stays = await getAllStaysDetailedServer();
        if (stays === null || stays === false)
            navigate("/admin")
        
        setStaysList(stays);
        //console.log(stays)
    }


    // Funcao para navegar entre os menus da pagina
    function goBack(){
        if(menuContext === 'main')
            navigate("/admin");
        else
            setMenuContext("main");
    }


    // Procurar estadias do usuário pelo email
    async function confirmEmailSearch(){
        if (email.length === 0){
            sendToastMessage(1, "É necessário inserir um E-mail!")
            return
        }
        
        let staysRet = await getAllStaysDetailOfUserByEmailServer(email)
        if (staysRet.length > 0){
            setMenuContext('allStays');
            setStaysList(staysRet);
        }
    }
    

    // Listar todos os usuários
    function listAllStays(){
        setMenuContext('allStays');
        // Buscar info no banco de dados
        if (staysList.length == 0){
            loadData();
        }
    }

    // emitir de acordo com a estadia selecionada
    function generateByStayIndex(index){
        //clientEmail clientName clientPhone endStay roomId roomName startStay totalCost userId
        const confirmar = confirm("Confirmar emissão para a estadia selecionada?");
        if (confirmar){
            console.log("bora emitir: " + index);
            navigate(`/UserInvoice/${JSON.stringify(staysList[index])}`);
        }
        

    }

    function stayTable(index, startDate, endDate, valor, roomName, clientName, clientEmail, clientPhone){
            return( 
                <div style={{marginBottom:'30px'}}>
                    
                    <button onClick={() => generateByStayIndex(index)} className='lowButtonProfile cofirmButton staysButtonList'
                        style={{fontSize:'xx-large', width:'100%', borderBottomLeftRadius: '0', borderBottomRightRadius: '0',
                    }} key={index}>
    
                        <div style={{display:'flex', flexDirection:'column'}}>
                            
                            <div style={{display:'flex', flexDirection:'row', width:'100%', justifyContent: 'space-between', marginBottom: '1%',
                                background:'rgba(255, 255, 255, 0.4)', padding:'0.5%', borderRadius:'10px',
                            }}>
                                <span>
                                    {dateString(startDate)} ~ {dateString(endDate)}
                                </span>
    
                                <span>{roomName}</span>
                                
                                valor: R${valor}
                            </div>
    
                            <div style={{display:'flex', flexDirection:'row', alignSelf:'flex-start', gap:'1%'}}>
                                <div> <FaUser /> {clientName} </div>
                                <div> <FaMailBulk /> {clientEmail} </div>
                                <div> <FaPhone /> {clientPhone} </div>
                            </div>
    
                        </div>
    
                    </button>
                    
                </div>
            )
            
    }

    const menuOptionsDisplay = () => { 
        switch (menuContext){
            // === Menu principal de opçoes
            case 'main':{return (<div>
                <h2 style={{marginBottom: "20px"}}>
                    Escolha entre as seguintes opçoes:
                </h2>

                <button 
                    onClick={()=>{setMenuContext("byEmail")}}
                    className='lowButtonProfile cofirmButton'
                >
                    Listar Estadias por E-mail do cliente
                </button>
                <button
                    className='lowButtonProfile cofirmButton'
                    onClick={listAllStays}
                >
                    Listar todas as estadias cadastradas
                </button>
                
            </div>)}

            // === Exibir todas as estadias cadastradas
            case 'allStays':{
                return (<>{staysList.map(
                    (stay, index)=> stayTable(
                        index, stay.startStay, stay.endStay, stay.totalCost, stay.roomName, stay.clientName, stay.clientEmail, stay.clientPhone
                    )
                )}</>)
            }

            // === 
            case 'byEmail': {
                return(<div style={{display:'flex', flexDirection:'column'}}>
                    <input className='inputfontStyle' style={{marginBottom:'20px', fontSize: 'x-large'}}
                      type="text" value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div style={{alignSelf:'center'}}>
                        <button className='lowButtonProfile cofirmButton' onClick={confirmEmailSearch}>
                            <span style={{color:'transparent'}}>..............</span>
                            Buscar
                            <span style={{color:'transparent'}}>..............</span>
                        </button>
                    </div>
                    
                </div>)
            }

            default:{
                return (<div>Nada</div>)
            }

        }
    }

    return(<div className='roomPage'>
            <h1>
                <p>
                    Emitir Nota Fiscal
                </p>
                <p>
                    <span style={{color:'#c586c0'}}>Hotel</span><span style={{color:'#7cc788'}}>BAO</span>
                </p>
            </h1>

            <div style={{background: '#86c589', display:'flex', padding: '1px', margin:"2%"}}></div>   
            
            {menuOptionsDisplay()}
            
            <div style={{paddingBottom:100}}></div>

            <button
                className='lowButtonProfile' style={{background: "rgb(110, 110, 110)", color: 'rgb(37, 37, 37)'}}
                onClick={goBack}
            >
                <FaArrowAltCircleLeft /> Voltar
            </button>
            

            




        </div>)
}

export default GenerateInvoicePage;