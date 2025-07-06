import React, { useState, useMemo } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { FaStar, FaBed } from 'react-icons/fa';
import {sendToastMessage} from '/src/components/ToastMensage';
import { getAllRooms, deleteRoomsServer, insertRoomServer, updateRoomByIdServer } from '../queryFunctions/RoomQuery';

import '/src/App.css';

const ManageRooms = () => {

  const [menu, setMenu] = useState('main');
  const [nameR, setName] = useState('');
  const [score, setScore] = useState(0);
  const [beds, setBeds] = useState(0);
  const [price, setPrice] = useState('');
  const [rooms, setRooms] = useState([]);
  const [inserMode, setInsertMode] = useState(false);
  const [update, forceUpdate] = useState(false);
  const [id, setId] = useState('');

  const navigate = useNavigate();

  const handleInsert = () => {
    setMenu('insert');
    setInsertMode(true);
  };

  const handleEdit = async () => {
    setMenu('change');
    const ret = await getAllRooms();
    
    if(ret === null){
      sendToastMessage(1, "OPS! Ocorreu um erro interno. Tente novamente mais tarde.");
    }else{
      setRooms(ret);
    }
  };

  function goBack(){
      switch (menu){
        case 'main':{
          navigate('/admin');
          break
        }
          
        case 'insert':{
          if(!inserMode){
            setMenu('change');
          }else{
            setMenu("main");  
          }
          break
        }
        
        case 'change':{
          setMenu("main");
          break
        }

        default:{
          navigate('/');
        }
      }  
  }

  // função para mapear os botôes de cada quarto para remocao
  async function deleteRoom(index){
    if(rooms[index] !== null){
      var ret = await deleteRoomsServer(rooms[index].id);
      if(ret){
        rooms[index] = null;
        forceUpdate(prev => !prev);
      }
    }
  }

  // função para mapear os botôes de cada quarto
  function editRoom(index){
    console.log("Vamos editar o quarto de id: "+ index)
    console.log(rooms[index])
    setMenu('insert');
    setInsertMode(false);
    setName(rooms[index].name);
    setPrice(rooms[index].price);
    setBeds(rooms[index].numberOfBeds);
    setScore(rooms[index].score);
    setId(rooms[index].id);
    
  }

  async function editRoomServer(){
    var ret = await updateRoomByIdServer(id, nameR, price, beds, score);
    if(ret){
      setMenu("main");
    }
  }

  async function insertRoom(){
    var ret = await insertRoomServer(nameR, price, beds, score);
    if(ret)
      setMenu("main");
  }

  const getPageContent = useMemo(()=>{
      switch (menu){
        case 'main':{
          return (<>
            <div style={styles.cardGrid}>
              <button style={styles.cardButton} onClick={handleInsert}>
                ➕ Inserir Quarto
              </button>

              <button style={styles.cardButton} onClick={handleEdit}>
                ✏️ Alterar Quarto
              </button>
            </div>
          </>)
        }

        case 'insert':{
          return (
            <form onSubmit={(e)=>{
              e.preventDefault();
              if (inserMode){
                insertRoom();
              }else{
                editRoomServer();
              }
                
            }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontSize: 'xx-large',
                gap: '20px'
              }}
            >
              <div>
                Nome do quarto:
                <input className='inputfontStyle' style={{width:'50%'}}
                          type="text" value={nameR}
                          onChange={(e) => setName(e.target.value)}
                          required
                />
              </div>
              
              <div style={{ gap: '10%' }}>
                Nota:
                {Array.from({ length: 5 }, (_, i) => {
                  const nota = i + 1;
                  return (<button type="button" key={nota}
                      onClick={() => setScore(nota)}
                      style={{
                        margin: '0px 1%',
                        background: 'transparent',
                        color: score >= nota ? 'yellow' : 'black',
                      }}
                    >
                      <FaStar />
                  </button>);
                })}
              </div>
              
              <div>
                Quantidade de pessoas suportadas:
                <input className='inputfontStyle' style={{width:'8%'}}
                        type="number" value={beds}
                        onChange={(e) => setBeds(e.target.value)}
                        required
                />
              </div>

              <div>
                Preço:
                <input className='inputfontStyle' style={{width:'20%'}}
                        type="number" value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                />
              </div>


              <button>Enviar</button>
            
            </form>
          )
        }

        case 'change':{
          return (<div style={{display:'flex', flexDirection:'column', gap:10}}>{
            rooms.map((room, i) => ( room === null ? null :
              <div key={room.id} className='editItemSelect'>
              
                <button 
                  style={{background:'rgba(255, 255, 255, 0.35)'}}
                  onClick={()=>editRoom(i)}
                >
                  ✏️
                </button>
              
                <span style={{color:'transparent'}}>..</span>
              
                <button
                  style={{background:'rgba(255, 0, 0, 0.2)'}}
                  onClick={()=>deleteRoom(i)}
                >
                  🗑️
                </button>
              
                {`(cod. ${room.id})`}<span style={{color:'transparent'}}>...</span>
              
                {room.name}{' '}
              
                R${room.price}
              
                <span style={{color:'transparent'}}>...</span>
              
                <FaBed/>
                {room.numberOfBeds}
              
                <span style={{color:'transparent'}}>...</span>
              
                <span style={{color:'yellow'}}>
                  {Array.from({ length: room.score}, (_, i) => <FaStar />)}
                </span>
              
              </div>
            ))
          }</div>)
        }
          

      }
  }, [menu, nameR, score, beds, price, rooms, update]);


  return (
    <div style={styles.container}>
      
      <h1 style={styles.title}>
        Gerenciar Quartos <br />
        <span style={{color:'#c586c0'}}>Hotel</span><span style={{color:'#7cc788'}}>BAO</span>
      </h1>
      
      {getPageContent}
      
      <div style={{paddingTop:'5%'}}></div>
      
      <button style={styles.backButton} onClick={() => goBack()}>
        🔙 Voltar para o Painel
      </button>

    </div>
  );
};

const styles = {
  container: {
    padding: '10% 20px',
    textAlign: 'center',
    color: 'white',
    minHeight: '100vh',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '50px',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    maxWidth: '900px',
    margin: '0 auto',
    marginBottom: '40px',
  },
  cardButton: {
    backgroundColor: '#c586c0',
    border: 'none',
    borderRadius: '15px',
    padding: '30px 20px',
    fontSize: '1.5rem',
    color: '#fff',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
    transition: 'transform 0.2s',
  },
  backButton: {
    backgroundColor: '#444',
    color: '#ddd',
    padding: '12px 24px',
    border: '1px solid #777',
    borderRadius: '10px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};

export default ManageRooms;
