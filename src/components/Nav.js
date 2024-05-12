import './Nav.css';
import { Link } from 'react-router-dom';


function Nav() {
    return (
        <nav>
          <div id='leftlinks'>
            <Link to="/"><strong>/vuong</strong></Link>
          </div>
            
          <div id='rightlinks'>
            <Link to="/about">/about</Link>
            <Link to="/education">/education</Link>
            <Link to="/experience">/experience</Link>
            <Link to="/projects">/projects</Link>
            <Link to="/contact">/contact</Link>
          </div>
          
        </nav>
      );
}

export default Nav;