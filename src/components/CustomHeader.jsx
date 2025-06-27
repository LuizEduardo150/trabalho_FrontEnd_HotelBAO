import { useEffect, useState, useContext } from 'react';
import './Header.css';

import { useNavigate } from 'react-router-dom';

import { AuthProvider } from '../AuthProvider';

function Header() {
  // variáveis de contexto (global)
  const global = useContext(AuthProvider)
  const [auth, setAuth] = global.authstatus
  const [userNameV, setUserNameV] = global.userNameVar
  const [realNameV, setRealNameV] = global.userRealNameVar

  const [hidden, setHidden] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  
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
            <button className='userButtonCuston'>
              <img className='imgUser' src="./src/assets/pictureIcon.png" alt="Avatar"/>
            </button>
          </div>
        );
      case 'admin':
        return (
          <div>
            <span className='admLogo'>Admin</span>
            <span className='userName'>{realNameV}</span>
            <button className='userButtonCuston'>
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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && !hovering) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, hovering]);

  return (
    <header
      className={`header ${hidden ? 'hidden' : ''}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
    <img className='logo' src="/src/assets/hblogo.png" alt="Logo" />
    <div className="buttons"> {getButtons(auth)} </div>
    </header>
  );
}

export default Header;
