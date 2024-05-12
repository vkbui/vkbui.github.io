import './Projects.css';
import data from '../data.json'
import github from '../images/github.png'; 
import link from '../images/link.png'; 


function Projects() {
  return (
    <div className="Projects">
      <h3>/projects</h3>
      <div>
        {data.projects.map((project) => (
            <div className="item">
                <div id="proj-header">
                    <div id="proj-title">
                        <h4 id='title'>{project.projecttitle}</h4>
                        {project.link && <a id="link" href={project.link} target="_blank" rel="noopener noreferrer">
                            <img src={link} alt={project.projecttitle} className="link-icon" />
                        </a>}
                        {project.github && <a id="github" href={project.github} target="_blank" rel="noopener noreferrer">
                            <img src={github} alt={project.projecttitle} className="link-icon" />
                        </a>}
                    </div>
                    <div className='pos-and-date'>
                        <p id='position'>{project.position}</p>
                        <p id='date'>{project.startdate} - {project.enddate}</p>
                    </div>
                </div>
                <div id="proj-desc">
                    {project.description.map((bullet) => (
                    <p className="proj-desc-item">
                        <p>- {bullet}</p>
                    </p>
                    ))}
            </div>
        </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;