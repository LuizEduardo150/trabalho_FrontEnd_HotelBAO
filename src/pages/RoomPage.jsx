import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { FaBed } from 'react-icons/fa';
import "react-datepicker/dist/react-datepicker.css";
import { getStarsIcon } from '../components/RoomTable';

import { getRoomByIdServer } from '../queryFunctions/RoomQuery';
import { useAuth } from '../AuthProvider';
import "/src/App.css"


const RoomPage = () => {
    const {id} = useParams();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const { auth, realName, logout } = useAuth();
    
    const [buzzDates, setBuzyDates] = useState([]);
    const [partialBuzzyDates, setPartialBuzyDates] = useState([]);
    const [amtOfDaysStr, setAmtOfDaysStr] = useState('0');

    const [roomName, setRoomName] = useState('');


    async function obterDatasReservadas(){
        const roomData = await getRoomByIdServer(id);
        //console.log("verify:", roomData);

        setBuzyDates( [
          new Date(2025, 6, 13),
          new Date(2025, 6, 15),
          //new Date(2025, 5, 27),
          new Date(2025, 6, 20),
          new Date(2025, 6, 25),
        ])

        setPartialBuzyDates( [
          new Date(2025, 6, 13),
          new Date(2025, 6, 15),
          //new Date(2025, 5, 27),
          new Date(2025, 6, 20),
          new Date(2025, 6, 25),
        ])
      
      buzzDates.sort((a, b) => a - b); // ordenar vetor de datas ocupadas ordem crescente
    }

    // Load da página
    useEffect(() => {
      obterDatasReservadas();
    }, [])


    useEffect(()=>{
      if (startDate === null || endDate === null)
        return
      
      obterDatasReservadas();

      // Quantidate de dias de reservas
      var amtOfDays = ((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      setAmtOfDaysStr(`${amtOfDays}`);
      
      // __ Condicoes de passe livre
      if (startDate < buzzDates[0] && endDate < buzzDates[0]) // Selecionou periodo antes mesmo das ocupadas
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
          // verificar se considera conflito ou não
          setStartDate(null)
          setEndDate(null);
          setAmtOfDaysStr('0');
          break
        }
      }      

    }, [endDate, startDate])


    // Formatar Data selecioanda para string
    function getFormatedStringDate(date, sep='-'){
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
      
      return `${yy}${sep}${mm}${sep}${dd}`;
    }


    function setDateFunction(d){
      setDate(d);
    }


    return (
    <div className='roomPage'>
        <h1>
        Pagina do Quarto {id}
        </h1>
        
        <div className='roomExibitionPage'>
          
          <div className='roomPhotoContainer'>
            <img src="/src/assets/pictureIcon.png"/>
          </div>

          <div style={{background:'rgba(255, 255, 255, 0.2)', borderRadius:'10px', 
            paddingTop: '1%', marginTop: '2%', marginBottom: '2%', border: '2px solid rgba(200, 250, 200, 0.6)'
          }}>
            
            <div style={{display:'flex', flexDirection:'row'}}>
              <span style={{marginRight: '3%', marginLeft:'2%'}}>nome do quarto</span>
              {getStarsIcon(1)}
              <FaBed style={{marginLeft: '2%'}}/>
              <span style={{marginLeft: '1%'}}> Número </span>
            </div>
          
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
                  if (partialBuzzyDates.find(d => d.toDateString() === dataStr)) {
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
              </div>

            </div>
            
            {auth !== 'guest' ?
              <div>
                {true ? null 
                  :
                  (
                    <div>
                      <button className='lowButtonProfile cofirmButton'>Confirmar</button>
                      <button className='lowButtonProfile cancelButton'>Cancelar</button>
                    </div>
                  )
                }
              </div>
          
            
            
            :
              <div>
                Registra ai nengue
              </div>
            
            }
              
            
          
          </div>

        </div>
        
    </div>
  )
}

export default RoomPage;