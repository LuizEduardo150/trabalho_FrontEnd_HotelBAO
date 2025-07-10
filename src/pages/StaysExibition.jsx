import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaMailBulk, FaPhone } from 'react-icons/fa';
import DatePicker from 'react-datepicker';

import { getAllStaysDetailedServer, getAllStaysOfARoomByRoomIdServer, updateStayEndStartDateById,
            deleteStayByIdServer
       }
from '../queryFunctions/StaysQuery';
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


const StaysExibition = () => {
    const [staysList, setStaysList] = useState([]);
    const [buzzDates, setBuzzDates] = useState([]);
    const [startDateCalendar, setStartDateCalendar] = useState(null);
    const [endDateCalendar, setEndDateCalendar] = useState(null);
    const [changingDate, setChangindDate] = useState(false);

    const navigate = useNavigate();

    const [activeIndex, setActiveIndex] = useState(null);
    
    //Funcao de carregamento da página
    useEffect(()=> {
        loadData();
    }, [])

    // Obtencao dos dados com o backend
    async function loadData(){
        const stays = await getAllStaysDetailedServer();
        console.log(stays)
        if (stays === null || stays === false)
            navigate("/admin")
        
        setStaysList(stays);
        //console.log(stays)
    }
    
    // Contorlar aparição dos Botoes de alterar e Remover de uma estadia listada
    function displayTable(index){
        setChangindDate(false);
        setStartDateCalendar(null);
        setEndDateCalendar(null);

        if (activeIndex === index)
            setActiveIndex(null);
        else
            setActiveIndex(index);
    }


    // Botão Delete estadia
    function deleteStay(index){
        //clientEmail clientName clientPhone endStay roomId roomName startStay totalCost userId
        const confirmar = confirm("Tem certeza que deseja apagar o registro da estadia?");
        if (confirmar){
            deleteStayByIdServer(staysList[index].id);
            alert('Pedido re remoção da estadia enviado!');
        }
    }


    async function editStay(rommData){
        const staysListRet = await getAllStaysOfARoomByRoomIdServer(rommData.roomId); // obter reservas do quarto
        const vect = [];

        var startStayDate = getDateObject(rommData.startStay);
        var endStayDate = getDateObject(rommData.endStay);

        for (const stay of staysListRet){
            var init = getDateObject(stay.startStay);
            var end = getDateObject(stay.endStay);
            
            if (init.getDate() !== startStayDate.getDate() && init.getDate() !== endStayDate.getDate()){ // ignorar a data da estadia atual
                var current = new Date(init);
                while (current <= end){ // setando os intervalos
                    vect.push(new Date(current));
                    current.setDate(current.getDate() + 1);
                }
            }            
        }

        setBuzzDates(vect);        
    }


    // Confirmar decisão de mudança
    function confirmDecision(index){
        console.log("Muda pro " + index)
        if(startDateCalendar === null && endDateCalendar === null){
            sendToastMessage(1, "Deve ser inserido um valor de começo e término da estadia!")
        }

        if (startDateCalendar === null && endDateCalendar === null)
            return
        
        var init = getDateObject(staysList[index].startStay);
        var end = getDateObject(staysList[index].endStay);
        if (startDateCalendar.getDate() === init.getDate() && endDateCalendar.getDate() === end.getDate())
            sendToastMessage(0, "Não houveram alterações.");
        else    
            updateStayEndStartDateById(staysList[index].id, startDateCalendar, endDateCalendar)

        setStartDateCalendar(null);
        setEndDateCalendar(null);
        setChangindDate(false);
    }


    function stayTable(index, startDate, endDate, valor, roomName, clientName, clientEmail, clientPhone){
        return( 
            <div style={{marginBottom:'30px'}}>
                {activeIndex === index && changingDate ? 
                
                    <DatePicker
                        inline
                        selectsRange
                        startDate={startDateCalendar}
                        endDate={endDateCalendar}
                        onChange={(dates) => {
                            const [start, end] = dates;
                            setStartDateCalendar(start);
                            setEndDateCalendar(end);
                        }}
                        excludeDates={buzzDates}
                        minDate={new Date()} // hoje pra frente
                        dayClassName={(date) => {
                            const dataStr = date.toDateString();
                            if (buzzDates.find(d => d.toDateString() === dataStr)) {
                                return "parcial";
                            }
                            return "";
                        }}
                    />
                    :
                    null
                }



                <button onClick={() => displayTable(index)} className='lowButtonProfile cofirmButton staysButtonList'
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
                
                <div>
                    { activeIndex === index ? 
                        <div style={{display:'flex', flexDirection:'row', fontSize: 'x-large', background:'rgb(65, 100, 87)',
                            border: '10px solid transparent', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px',
                        }}>
                            <button onClick={()=>deleteStay(index)} className='lowButtonProfile cancelButton'> Remover </button>
                            
                            {!changingDate ? 
                                <button 
                                    onClick={()=>{
                                        setChangindDate(true);
                                        editStay(staysList[index])}
                                    }
                                    className='lowButtonProfile'
                                >
                                    Alterar data
                                </button>
                                :
                                <div style={{display:'flex', flexDirection:'row'}}>
                                    <button onClick={()=> setChangindDate(false)} className='lowButtonProfile'>Cancelar </button>
                                     <button onClick={() => confirmDecision(index)} className='lowButtonProfile cofirmButton'>Aplicar</button>
                                </div>
                            }

                        </div>
                        :
                        null
                    }
                
                    
                    
                </div>

            </div>
        )
        
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
        
        <div style={{paddingBottom:100}}></div>
        

        




    </div>)
}

export default StaysExibition;