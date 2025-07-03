import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import "/src/App.css"


const RoomPage = () => {
    const {id} = useParams();
    
    const [room, setRoom] = useState([]);

    const loadRoom = async () => {
      fetch('http://localhost:8080/room', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      }).catch(() => {
        // erro de conexao com o servidor
        setRooms([]);
        return null;
      })
      .then(response => {
        if (response == null){ return null;}  
        return response.json()
      })
      .then(data => {
        if (data == null){ return null;}
          setRooms(data);
      })
    }

    useEffect(() => {
        console.log('Componente carregado!');
    }, []);
    

    return (
    <div className='roomPage'>
        <h1>
        Pagina do Quarto {id}
        </h1>

        elementos

        


    </div>
  )
}

export default RoomPage;