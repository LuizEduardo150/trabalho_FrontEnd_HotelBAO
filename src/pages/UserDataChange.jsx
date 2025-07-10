import {React, useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUserByIdServer, updateUserByIdServer } from '../queryFunctions/UserQuery';
import "/src/App.css";


const UserDataChange = () => {
  const {obj} = useParams();
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [realName, setRealName] = useState('');
  const [adress, setAdress] = useState('');
  const [adressNumber, setAdressNumber] = useState('');
  const [district, setDistrict] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [id, setId] = useState('');
  
  const [changes, setChanges] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState('');
  const [inputType, setInputType] = useState('text');
  const [menuContext, setMenuContext] = useState('');

  // Obter dados com o backend
  async function getData(obj){
    var ret = await getUserByIdServer(obj);
    console.log("Vamos veer o q obvie")
    console.log(ret);
    setAdress(ret.address);
    setAdressNumber(ret.addressNumber);
    setDistrict(ret.district);
    setEmail(ret.email);
    setPhone(ret.phone);
    setRealName(ret.realName);
    setUserName(ret.username);
  }


  // Função de carregamento da página
  useEffect(() => {
    if(obj.length === 1 || !isNaN(obj) && !isNaN(parseFloat(obj))){
      setId(obj);
      getData(obj);
    }
    else{
      console.log("Caiu aq, da uma olahda" + obj);
      var ret = JSON.parse(obj)
      setAdress(ret.address);
      setAdressNumber(ret.addressNumber);
      setDistrict(ret.district);
      setEmail(ret.email);
      setPhone(ret.phone);
      setRealName(ret.realName);
      setUserName(ret.username);
    }
  }, []);
  

  function edit(item){
    setMenuContext(`${item}`);
    setShowInput(true);

    switch (item){
      case 'phone':{
        setInputType('number');
        break;
      }
      case 'addressn':{
        setInputType('number');
        break;
      }
      default: {
        setInputType('text');
        break;
      }
    }
  }

  function acceptInputChange(){    
    switch(menuContext){
      case 'username':{
        setUserName(input);
        break;
      }
      case 'name':{
        setRealName(input);
        break;
      }
      case 'email':{
        setEmail(input);
        break;
      }
      case 'address':{
        setAdress(input);
        break;
      }
      case 'addressn':{
        setAdressNumber(input);
        break;
      }
      case 'city':{
        setDistrict(input);
        break;
      }
      case 'phone':{
        setPhone(input);
        break;
      }
    }

    setShowInput(false);
    setInput('');
    setChanges(true);
  }


  function discardInputChange(){
    setInput('');
    setMenuContext('');
    setShowInput(false); 
  }

  function updateUserDataConfirmed(){
    updateUserByIdServer(id, userName, email, phone, realName, adress, adressNumber, district);
    navigate('/ManageUser');
  }

  function updateUserDataAborted(){
    navigate('/ManageUser');
  }



  return ( <div className='roomPage'>

    <h1 >
      Dados pessoais:
    </h1>

    <div className='containerWithCenterItens'>

      <div style={{width:'50%'}}>
        <p>
          <button onClick={()=> edit('username')}>✏️</button>
          Nome de usuário: <span>{userName} </span>
        </p>

        <p>
          <button onClick={()=> edit('name')}>✏️</button>
          Nome: <span> {realName} </span> 
        </p>

        <p>
          <button onClick={()=> edit('email')}>✏️</button>
          Email: <span> {email} </span> 
        </p>

        <p>
          <button onClick={()=> edit('address')}>✏️</button>
          Endereço: <span> {adress} </span> 
        </p>

        <p>
          <button onClick={()=> edit('addressn')}>✏️</button>
          Número: <span> {adressNumber} </span> 
        </p>

        <p>
          <button onClick={()=> edit('city')}>✏️</button>
          Cidade: <span> {district} </span> 
        </p>

        <p>
          <button onClick={()=> edit('phone')}>✏️</button>
          Contato: <span> {phone} </span> 
        </p>
      </div>

      <div style={{width:'50%', display:'flex', flexDirection:'column'}}> 
        {showInput && <>
        <span>Informe o novo valor:</span>
        <input 
          type={inputType}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
          
        <div>
          <button onClick={acceptInputChange} style={{background:'lightgreen', marginRight:10}}>✔️</button>
          <button onClick={discardInputChange} style={{background:'rgb(182, 62, 62)'}}>✖️</button>
        </div>
        </>}
      
      </div>
    
    
    </div>
    
    <div style={{paddingTop:"1%", width:'100%'}}>
      {changes ? 
        (<>
          <button 
            className='lowButtonProfile' style={{background:'rgb(66, 182, 62)', color:'#fffe'}}
            onClick={updateUserDataConfirmed}
          >
            Salvar alteraçoes
          </button>
          <button
            onClick={updateUserDataAborted}
            className='lowButtonProfile' style={{background:'rgb(182, 62, 62)', color:'#ccce'}}
          >
            Cancelar alterações
          </button>
        </>)
        :
        (null)
      }
    </div>
    



  
  </div>)
}

export default UserDataChange;