import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import RoomTable from '/src/components/RoomTable';
import FilterComponent from '/src/components/FilterComponent';
import ErrorComponent from '/src/components/ErrorComponent';

import '/src/App.css';

function Home() {
  const [mostrarSubtitulo, setMostrarSubtitulo] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [error_c, serErrorC] = useState(null);
  const navigate = useNavigate();

  // subtítulo com atraso de carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarSubtitulo(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);


  // subtitulo com atraso de scrolling
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 400) {
        setMostrarSubtitulo(false);
      } else {
        setMostrarSubtitulo(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  //Refresh
  const handleRefresh = () => {
    setRefresh(prev => !prev);
  };


  // Fazer requisição com BackEnd
  useEffect(()=> {
    const loadRooms = async () => {
      fetch('http://localhost:8080/room', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      }).catch(() => {
        // erro de conexao com o servidor
        serErrorC(true);
        return null;
      })
      .then(response => {
        if (response == null)
           return null;
        
        serErrorC(false);
        return response.json()
      })
      .then(data => {
        if (data == null){ return null;}
          setRooms(data);
      })
    }
    
    
    loadRooms();
  }, [refresh]);


  // Construir cards dos quartos
  const roomsTable = useMemo(() => {
    if(error_c === null){
      return <div>Carregando...</div>
    }
    else if(!error_c && rooms.length == 0){
      return <div>Ainda não há cadastro de quartos no sistema</div>
    }
    else if (rooms.length === 0){
      return <ErrorComponent />
    }else{
      return rooms.map((room) => {
        return ( <RoomTable key={room.id}
          name={room.name}
          price={room.price}
          capacidade={room.numberOfBeds}
          score = {room.score}
          onClickfunct={() => navigate(`room/${room.id}`)}
        />)
      });
    }    
  }, [refresh, rooms, error_c]);


  return (<div>
      
      <main className='gradientContainer'>
          <img src="/src/assets/htl.png" style={styles.bgImage} />
          
            <span style={styles.title}>
              <h1>
                <span style={{color:'#c586c0'}}>Hotel</span>
                <span style={{color:'#7cc788', fontStyle: 'italic'}}>BAO</span>
              </h1>
              
              <h2 className={`subtitAnim ${mostrarSubtitulo ? 'visivel' : ''}`}>~ Sua melhor estadia está aqui.</h2>
            </span>       
      </main>

      
      <div className='homeDisplayItens'>
          <FilterComponent/>
          <span style={{paddingBottom:'2%'}}></span>
          <div className='roomsGrid'> { roomsTable } </div>      
          <span style={{paddingBottom:'20px'}}></span>
          <button onClick={handleRefresh} style={{zIndex:'100', padding:'5px', color:"black", background:'rgba(20, 255, 150, 0.5)'}}>
             Atualizar
          </button>
      </div>
      
          

  </div>);
}


const styles = {  
  bgImage: {
    width: '100%',
    height: 'auto',
    opacity: 0.5,
    display: 'block'
  },

  title:{
    position: 'absolute',
    top: '45%',
    left: '40%',
    display: 'flex',
    flexDirection: 'column',
  }

};

export default Home;
