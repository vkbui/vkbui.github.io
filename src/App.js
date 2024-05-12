import './App.css';
import Nav from './components/Nav';
import About from './components/About';
import Contact from './components/Contact';
import Intro from './components/Intro.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Footer from './components/Footer';

function App() {
  return (
    <div className='App'>
      <div id='content'>
        <BrowserRouter>
          <Nav></Nav>
          
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/about" element={<About />} />
            <Route path="/education" element={<Education />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
        
      </div>
    </div>
    
    
  );
}

export default App;
