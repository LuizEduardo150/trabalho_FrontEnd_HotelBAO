import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { getAllStaysDetailWTOTUserInfoServer } from '../queryFunctions/StaysQuery';
import { getUserByIdServer } from '../queryFunctions/UserQuery';
import "/src/App.css";


const InvoiceStay = () => {
    const {obj} = useParams();
    const [clientName, setClientName] = useState('');
    const [roomName, setroomName] = useState('');
    const [roomCost, setRooCost] = useState('');
    const [totalCot, setTotalCost] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [address, setAdress] = useState('');
    const [addressNum, setAdressNum] = useState('');
    const [city, setCity] = useState('');
    

    // Funcao para carregar os dados no backend
    async function loadUserData(id){
        var user = await getUserByIdServer(id);
        console.log(user);
        setAdress(user.address);
        setAdressNum(user.addressNumber);
        setCity(user.district);
    }

    // Função de carregamento da página
    useEffect(() => {
        let isMail = false;

        try{
            // recebeu informação detalhada da estadia
            //clientEmail clientName clientPhone endStay roomId roomName endStay totalCost userId
            const objparse = JSON.parse(obj);
            setClientName(objparse.clientName);
            setroomName(objparse.roomName);
            setStart(objparse.endStay)
            setEnd(objparse.endStay)
            setTotalCost(objparse.totalCost)
            loadUserData(objparse.userId);
        }catch{
            // recebeu apenas o email do usuario
            isMail = true;
        }
        
        if (isMail)
            console.log(obj);

        

        //getAllStaysDetailWTOTUserInfoServer()

    }, []);



    return (
        <div className='roomPage' style={{fontSize: 'xx-large'}}>
            <div style={styles.container}>
                
                <img src="/src/assets/htl.png" style={styles.bgImage} />
                
                <h1>
                    <span style={{color:'#c586c0'}}>Hotel</span>
                    <span style={{color:'#7cc788', fontStyle: 'italic'}}>BAO</span>
                </h1>
                
                <div style={{background:'white',  alignSelf: 'center', width: '80%',
                    border: '2px solid transparent', margin: '20px'
                }}></div>

                
                <div style={{display: 'flex', flexDirection: 'column', marginLeft:'10%', gap:'30px', color: 'rgb(100, 150, 100)'}}>
                    <div>
                        Cliente: {clientName}
                    </div>
                    
                    <div>
                        Endereço: {address} - {addressNum}
                    </div>
                    
                    <div>
                        Cidade: {city}
                    </div>
                </div>
               
                <div style={{background:'white',  alignSelf: 'center', width: '80%',
                    border: '2px solid transparent', margin: '20px'
                }}></div>
                
                <span style={{alignSelf:'center'}}>Estadia</span>
                
                <div style={{background:'white',  alignSelf: 'center', width: '80%',
                    border: '2px solid transparent', margin: '20px'
                }}></div>

                <div style={{display: 'flex', flexDirection: 'column', marginLeft:'10%', gap:'30px', color: 'rgb(100, 150, 100)'}}>
                    <div>
                        Quarto: {roomName}
                    </div>
                    
                    <div>
                        Diária: {roomCost}
                    </div>

                    <div>
                        Inicio: {start} Fim: {end}
                    </div>
                    
                    <div style={{background: 'rgb(100, 150, 100)', borderRadius:"10px", width:'50%', color:'#fffe'}}>
                        Preco Total: R$ {totalCot}
                    </div>
                </div>
        

            </div>  
        </div>
    )
}


const styles = {  
    
    container:{
        display: 'flex',
        flexDirection: 'column',
        padding:20,
        height: '100%',
        width:'100%',
        background:'rgb(187, 235, 194)',
        borderRadius: '20px',
    },

    bgImage: {
        
        objectFit: 'cover',
        width: '100%',
        height: '300px',
        objectPosition: '0% 70%',
        opacity: 0.9,
        borderRadius:'20px',
    },

};

export default InvoiceStay;