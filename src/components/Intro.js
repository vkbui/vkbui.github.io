import './Intro.css';
import './Movies.css';
import data from '../data.json';
import heart from '../images/heart.png'
import rewatch from '../images/rewatch.png'
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
      <div id='movies'>
        <p><b>/last four watched</b></p>
          <div className='movieitems'>
          {data.movies.map((movie) => (
            <div className="movieitem">
              <button id="movie-button">
                  <img id="movieposter" src={movie.poster}></img>
              </button>
              <div id="moviecontent">
                  <p>{movie.title}</p>
                  <p>{movie.date}</p>
                  <div id="movieoptions">
                      {movie.liked && (
                              <img className="movieicon" src={heart} alt="Liked" />
                      )} 
                      {movie.rewatched && (
                              <img className="movieicon" src={rewatch} alt="Rewatched" />
                      )}   
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default Intro;