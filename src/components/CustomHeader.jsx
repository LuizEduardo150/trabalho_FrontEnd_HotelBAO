import { useEffect, useState, useContext } from 'react';
import './Header.css';

import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthProvider';

function Header() {
  
  
  //useAuth.isAuthenticated
  const { auth, realName, logout } = useAuth();
  const realNameV = realName;

  // itens da página
  const [hidden, setHidden] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [showTableOptions, setShowTableOptions] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  
  // outros
  const location = useLocation();


  function showOptionsButtons(){
    if (showTableOptions){
      setShowTableOptions(false);
    }else{
      setShowTableOptions(true);
    }

  }

  function getButtons(auth) {
    switch (auth) {
      case 'guest':
        return (
          <div>
            <button onClick={goLogin} style={{background:'#7cc788'}}>Login</button>            
            <button  onClick={goRegister} style={{background:'#c586c0', color:'#081c00'}}>Cadastre-se</button>
          </div>
        );
      case 'client':
        return (
          <div>
            <span className='userName'>{realNameV}</span>
            <button className='userButtonCuston' onClick={showOptionsButtons}>
              <img className='imgUser' src="./src/assets/pictureIcon.png" alt="Avatar"/>
            </button>
          </div>
        );
      case 'admin':
        return (
          <div>
            <span className='admLogo'>Admin</span>
            <span className='userName'>{realNameV}</span>
            <button className='userButtonCuston' onClick={showOptionsButtons}>
              <img className='imgUser' src="./src/assets/pictureIcon.png" alt="Avatar"/>
            </button>
          </div>
        );
      default:
        return null;
    }
  }

  const goLogin = () => {
    navigate('/login');
  };

  const goRegister = () => {
    navigate('/register')
  }

  const logoutFunction = ()=> {
    if (showTableOptions)
        setShowTableOptions(false);    
    logout();
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && !hovering) {
        setHidden(true);
        if (showTableOptions){
          setShowTableOptions(false);
        }

      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, hovering]);

  return (
    <div
      className={`header ${hidden ? 'hidden' : ''}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
    
      <div className='headerContent'>
      
        <button className='iconButton' onClick={()=>{
            if (location.pathname !== '/')
              navigate("/")
        }}>
          <img className='logo' src="/src/assets/hblogo.png" alt="Logo" />
        </button>
        <div className="buttons"> {getButtons(auth)} </div>
      
      </div>

      <div className='afterLine'></div>
      
      {
        showTableOptions ?
          <div className='tableButtons'>
              {
                auth === 'admin' ? 
                  <button className='admButton' onClick={()=>{navigate('/admin')}}>Administrativo</button>
                  : 
                  null
              }
              
              <button className='otherButtons' onClick={()=>{navigate('/personaldata')}}>
                📝 Dados pessoais
              </button>

              <button className='otherButtons' onClick={()=>{navigate('transactions')}}>
                🗒️Relatórios<span style={{color:'transparent'}}>........</span>
              </button>
              
              <span style={{padding:'10px'}}></span>
              
              <button onClick={logoutFunction} className='disconectButton'>Desconectar</button>
          </div>
        : null
      }

    </div>
  );

}

export default Header;
