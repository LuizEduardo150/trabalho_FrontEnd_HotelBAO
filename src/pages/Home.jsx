import { useEffect, useState } from 'react';

import '/src/App.css';
import RoomTable from '/src/components/RoomTable';
import  Header  from '/src/components/CustomHeader';
import FilterComponent from '/src/components/FilterComponent';


function Home() {
  const [mostrarSubtitulo, setMostrarSubtitulo] = useState(false);

  useEffect(() => {
    // subtítulo com atraso de carregamento
    const timer = setTimeout(() => {
      setMostrarSubtitulo(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // subtitulo com atraso de scrolling
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
  
  
  return (<div>
      
      <Header />
      
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

          <span style={{paddingBottom:'4%'}}></span>

          <div className='roomsGrid'>
              <RoomTable  name="quarto sei la das quantas muiti fordaasd asd" price="100"
                onClickfunct={() => console.log("olha funfou ??") } capacidade="4"
              />

              <RoomTable  name="Quarto tal"/>
              <RoomTable  name="Quarto tal"/>
              <RoomTable  name="Quarto tal"/>
              <RoomTable  name="Quarto tal"/>
              <RoomTable  name="Quarto tal"/>
              <RoomTable  name="Quarto tal"/>
              <RoomTable  name="Quarto tal"/>
              <RoomTable  name="Quarto tal"/>
          
          </div>

      
      
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
