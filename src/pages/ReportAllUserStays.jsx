import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaMailBulk, FaPhone, FaArrowAltCircleLeft } from 'react-icons/fa';

import { getAllStaysDetailedServer, getAllStaysDetailOfUserByUserName, getAllStaysDetailOfUserByEmailServer } from '../queryFunctions/StaysQuery';
import { getUserByEmailServer } from '../queryFunctions/UserQuery';
import { getFormatedStringDate } from './RoomPage';
import { sendToastMessage } from '../components/ToastMensage';
import { useAuth } from '../AuthProvider';
import '/src/App.css';


function getDateObject(stringData){
    var vtr = stringData.split('-');    
    return new Date(vtr[0], vtr[1]-1, vtr[2])
}

function dateString(stringDate){
    return getFormatedStringDate(getDateObject(stringDate), '/');
}


const ReportAllUserStays = () => {
    
    const navigate = useNavigate();
    const [staysList, setStaysList] = useState([]);
    const [email, setEmail] = useState('');
    const [menuContext, setMenuContext] = useState("main");
    const [totalStays, setTotalStays] = useState(0);

    const { auth, userName} = useAuth();


    // Funcao para navegar entre os menus da pagina
    function goBack(){
        if (auth == 'admin'){
            if(menuContext === 'main')
                navigate("/admin");
            else
                setMenuContext("main");
        }else{
            if(menuContext === 'main')
                navigate("/");
            else
                setMenuContext("main");
        }        
    }


    // Procurar estadias do usuário pelo email
    async function confirmEmailSearch(){
        if (email.length === 0){
            sendToastMessage(1, "É necessário inserir um E-mail!")
            return
        }
        
        let staysRet = await getAllStaysDetailOfUserByEmailServer(email);
        
        if (staysRet.length > 0){
            const total = staysRet.reduce((tot, stay)=>{return tot + stay.totalStayCost}, 0);
            setTotalStays(total);
            setMenuContext('allStays');
            setStaysList(staysRet);
        }
    }


    useEffect(() => {
        if (auth === 'client'){
            loadDataByUserName(userName);
        }
    }, [])
    

    async function loadDataByUserName(username) {
        let staysRet = await getAllStaysDetailOfUserByUserName(username);
        
        const total = staysRet.reduce((tot, stay)=>{return tot + stay.totalStayCost}, 0);
        
        setTotalStays(total);
        setStaysList(staysRet);
    }

    const menuOptionsDisplay = () => {
        switch (menuContext){
            // === Menu principal de opçoes
            case 'main':{return (<div>

                {auth === 'admin' ? 
                <button 
                    onClick={()=>{setMenuContext("byEmail")}}
                    className='lowButtonProfile cofirmButton'
                >
                    Listar Estadias por E-mail do cliente
                </button>
                :
                <div style={{display:'flex', flexDirection: 'column', fontSize:'xx-large'}}> 
                    {staysList.map((stay) => <div>
                        <div style={{background: 'rgba(255, 255, 255, 0.1)', borderRadius:20, padding:5, marginBottom:'20px'}}>
                            <div>
                                <span>🟣 {stay.roomName} </span>
                                <span> Estadia do quarto: R${stay.roomCost} </span>
                            </div>
                            <div>
                                <span>📅 {dateString(stay.startStay)}</span>
                                <span> ➡️ {dateString(stay.endStay)}</span>
                            </div>
                            <div>
                                <span>💵 R${stay.totalStayCost}</span>
                            </div>
                        </div>
                    
                    </div>)
                    }
                    <div>
                        Total: R${totalStays}
                    </div>
                
                </div>
            }

            </div>)}

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
                return (<div></div>)
            }

        }
    }

    return(<div className='roomPage'>
            <h1>
                <p>
                    Relatório - Todas Estadias
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

export default ReportAllUserStays;