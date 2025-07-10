import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { FaBed } from 'react-icons/fa';
import "react-datepicker/dist/react-datepicker.css";
import { getStarsIcon } from '../components/RoomTable';

import { getUserIdByUserNameServer } from '../queryFunctions/UserQuery';
import { getRoomByIdServer} from '../queryFunctions/RoomQuery';
import { useAuth } from '../AuthProvider';
import { insertNewStayServer, getAllStaysOfARoomByRoomIdServer } from '../queryFunctions/StaysQuery';
import "/src/App.css"
import { sendToastMessage } from '../components/ToastMensage';

function getDateObject(stringData){
    var vtr = stringData.split('-');    
    return new Date(vtr[0], vtr[1]-1, vtr[2])
}

// Formatar Data selecioanda para string
export function getFormatedStringDate(date, sep='-', format='visual'){
    if (date === null)
      return '--/--/--'

    var [_, mm, dd, yy] = date.toDateString().split(' ');
    if (mm === 'Jan'){
      mm = '1';
    }
    else if (mm === 'Feb'){
      mm = '2';
    }
    else if (mm === 'Mar'){
      mm = '3';
    }
    else if (mm === 'Apr'){
      mm = '4';
    }
    else if (mm === 'May'){
      mm = '5';
    }
    else if (mm === 'Jun'){
      mm = '6';
    }
    else if (mm === 'Jul'){
      mm = '7';
    }
    else if (mm === 'Aug'){
      mm = '8';
    }
    else if (mm === 'Sep'){
      mm = '9';
    }
    else if (mm === 'Oct'){
      mm = '10';
    }
    else if (mm === 'Nov'){
      mm = '11';
    }
    else if (mm === 'Dec'){
      mm = '12';
    }

    if(format === 'visual'){
      return `${dd}${sep}${mm}${sep}${yy}`;
    }
    else{
      return `${yy}${sep}${mm}${sep}${dd}`;
    }
}


const RoomPage = () => {
    const {id} = useParams();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const { auth, userName } = useAuth();
    
    const [buzzDates, setBuzyDates] = useState([]);
    const [amtOfDaysStr, setAmtOfDaysStr] = useState('0');

    const [roomName, setRoomName] = useState('');
    const [roomNumberOfBeds, setRoomNumberOfBeds] = useState('');
    const [roomPrice, setRoomPrice] = useState('');
    const [roomScore, setScore] = useState('');
    const [totalPrice, setTotalPrice] = useState('');

    const navigate = useNavigate();

    async function obterDatasReservadas(){
        const roomData = await getRoomByIdServer(id);
        const staysList = await getAllStaysOfARoomByRoomIdServer(roomData.id);
        
        const vect = [];

        for (const stay of staysList){
          var init = getDateObject(stay.startStay);
          var end = getDateObject(stay.endStay);
          
          var current = new Date(init);
          while (current <= end){ // preencher o intervalo das datas
            vect.push(new Date(current));
            current.setDate(current.getDate() + 1);
          }
        }

        setBuzyDates(vect);
        setRoomName(roomData.name);
        setRoomNumberOfBeds(roomData.numberOfBeds);
        setRoomPrice(roomData.price);
        setScore(roomData.score);
        
      buzzDates.sort((a, b) => a - b); // ordenar vetor de datas ocupadas ordem crescente
    }

    // Load da página
    useEffect(() => {
      obterDatasReservadas();
    }, [])


    useEffect(()=>{
      if (startDate === null || endDate === null){
        setAmtOfDaysStr('0');
        setTotalPrice('0');
        return
      }
        
      
      obterDatasReservadas();

      // Quantidate de dias de reservas
      var amtOfDays = ((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      setTotalPrice((amtOfDays * roomPrice).toFixed(2))
      setAmtOfDaysStr(`${amtOfDays}`);
      
      // __ Condicoes de passe livre
      if(buzzDates.length === 0)
        return
      else if (startDate < buzzDates[0] && endDate < buzzDates[0]) // Selecionou periodo antes mesmo das ocupadas
        return
      else if (startDate > buzzDates.at(-1)) //  selecionou uma data longe das datas ocupadas
        return
      
      // __ Perido de escolha deve ser checado.
      // (limitar limite inferior entre as datas ocupadas, as que devem ser verificadas)
      var initIndexBuzy = 0;
      var current = new Date(startDate);

      for (var i in buzzDates){
        if(buzzDates[i] > startDate){
          initIndexBuzy = i;
          break;
        }
      }

      // checar por conflito
      for (let i=0; i<amtOfDays; i++){
        if (current < buzzDates[initIndexBuzy]){
          current.setDate(current.getDate()+1)  
        }
        else{
          setStartDate(null)
          setEndDate(null);
          setAmtOfDaysStr('0');
          setTotalPrice('0');
          break
        }
      }

    }, [endDate, startDate])


    // Função de envio dos dados ao backend
    async function sendStay(){
      const idUser = await getUserIdByUserNameServer(userName);
      
      if (idUser === null){
        sendToastMessage(0, "Erro ao carregar informações pessoais, tente novamente mais tarde.");
        return
      }
      const ret = await insertNewStayServer(idUser.id, id, startDate, endDate);
      if (ret)
        navigate('/');
    }


    return (
    <div className='roomPage'>
        <h1>
        {roomName}
        </h1>
        
        <div className='roomExibitionPage'>
          
          <div className='roomPhotoContainer'>
            <img src="/src/assets/pictureIcon.png"/>
          </div>

          <div style={{
            display: 'flex', flexDirection:'row', justifyContent: 'space-between',
            background:'rgba(255, 255, 255, 0.2)', borderRadius:'10px',
            alignItems: 'center',
             marginTop: '2%', marginBottom: '2%', border: '2px solid rgba(200, 250, 200, 0.6)',
          }}>
            <span style={{marginTop:'1%', marginLeft: '2%'}}>{getStarsIcon(roomScore)}</span>
            
            <div style={{display: 'flex', flexDirection:"row"}}>
              <FaBed/> <span style={{color:'transparent'}}>..</span>
              <span style={{marginLeft: '1%'}}> {roomNumberOfBeds} </span>
            </div>

            <span style={{marginRight: '2%'}}> Diária: R$ {roomPrice} </span>
          </div>
          
          <div style={{paddingLeft:'2%'}}>
            <div style={{marginBottom:'20px'}}>
              Escolha o periodo de sua estadia dentre as datas disponíveis
            </div>
            
            <div style={{display:'flex', flexDirection:'row'}}>
              <DatePicker
                inline
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={(dates) => {
                  const [start, end] = dates;
                  setStartDate(start);
                  setEndDate(end);
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
              <div style={{marginLeft: '2%'}}>
                <div>
                  Começo: {getFormatedStringDate(startDate, '/')}
                </div>
                <div>
                  Término : {getFormatedStringDate(endDate, '/')}
                </div>
                <div>
                  {amtOfDaysStr} dias.
                </div>
                <div>
                  🛒 R$ {totalPrice}
                </div>
              </div>

            </div>
            
            {auth !== 'guest' ?
              <div>
                {!(startDate!==null && endDate!==null) ? <div style={{fontSize:'x-large',  paddingTop:'2%', paddingBottom:'2%'}}>Selecione a data de início e fim.</div>
                  :
                  (
                    <div style={{marginTop: '2%', marginBottom:'2%'}}>
                      <button className='lowButtonProfile cofirmButton' onClick={sendStay}>Confirmar</button>

                      <button className='lowButtonProfile cancelButton' onClick={()=>{
                        setStartDate(null);
                        setEndDate(null);
                        setAmtOfDaysStr('0');
                        setTotalPrice('0');
                      }}>
                        Cancelar
                      </button>
                    </div>
                  )
                }
              </div>
          
            :
              <div style={{color: 'pink', fontSize:'x-large', paddingTop:'2%', paddingBottom:'2%'}}>
                Cadastre-se para fazer estadias!
              </div>
            
            }
              
            
          
          </div>

        </div>
        
    </div>
  )
}

export default RoomPage;