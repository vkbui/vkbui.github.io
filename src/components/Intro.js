import './Intro.css';
import headshot from '../images/headshotsquare.png'; 
// import { Link } from 'react-router-dom';

function Intro() {
  return (
    <div className="Intro">
      <div id='header'>
        <button id="headshot-button"><img id="headshot" src={headshot} alt="Profile" /></button>
        <div id='desc'>
          <h1>Vuong Bui</h1>
          <h2>hey. welcome to my website. feel free to browse around.</h2>
        </div>
      </div>
      
    </div>
  );
}

export default Intro;