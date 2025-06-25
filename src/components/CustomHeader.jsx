import { useEffect, useState } from 'react';
import './Header.css';

import { useNavigate } from 'react-router-dom';

function Header() {
  const [hidden, setHidden] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

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
      <div className="buttons">
        <button onClick={goLogin} style={{background:'#7cc788'}}>Login</button>
        <button  onClick={goRegister} style={{background:'#c586c0', color:'#081c00'}}>Cadastre-se</button>
      </div>
    </header>
  );
}

export default Header;
