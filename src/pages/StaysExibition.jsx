import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAllStaysDetailedServer } from '../queryFunctions/StaysQuery';
import '/src/App.css';
import { FaUser, FaMailBulk, FaPhone } from 'react-icons/fa';
import { getFormatedStringDate } from './RoomPage';

function getDateObject(stringData){
    var vtr = stringData.split('-');    
    return new Date(vtr[0], vtr[1]-1, vtr[2])
}

function dateString(stringDate){
    return getFormatedStringDate(getDateObject(stringDate), '/');
}


const StaysExibition = () => {
    const [staysList, setStaysList] = useState([])
    const navigate = useNavigate();

    //Funcao de carregamento da página
    useEffect(()=> {
        loadData();
    }, [])

    // Obtencao dos dados com o backend
    async function loadData(){
        const stays = await getAllStaysDetailedServer();
        if (stays === null || stays === false)
            navigate("/admin")
        
        setStaysList(stays);
    }
    

    function stayTable(index, startDate, endDate, valor, roomName, clientName, clientEmail, clientPhone){
        return <button className='lowButtonProfile cofirmButton' style={{marginBottom:'10px', fontSize:'xx-large'}} key={index}>
            <div style={{display:'flex', flexDirection:'column'}}>
                
                <div style={{display:'flex', flexDirection:'row', justifyContent: 'space-between'}}>
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
    }

    return (<div className='roomPage'>
        <h1>
            <p>
                Registro de estadias
            </p>
            <p>
                <span style={{color:'#c586c0'}}>Hotel</span><span style={{color:'#7cc788'}}>BAO</span>
            </p>
        </h1>

        <div style={{background: '#86c589', display:'flex', padding: '1px', margin:"2%"}}></div>   
        
        {staysList.map((stay, index)=> stayTable(index, stay.startStay, stay.endStay, stay.totalCost, stay.roomName, stay.clientName, stay.clientEmail, stay.clientPhone))}
        
        
        

        




    </div>)
}

export default StaysExibition;