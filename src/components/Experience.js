import './Experience.css';
import data from '../data.json'

function Experience() {
  return (
    <div className="Experience">
        <h3>/experience</h3>
        <div>
            {data.experience.map((exp) => (
            <div className="item">
                <div id="exp-header">
                    {exp.company && <h4 id="exp-company">{exp.company}</h4>}
                    <div className='pos-and-date'>
                        <p id="position">{exp.position}</p>
                        <p id="date">{exp.startdate} - {exp.enddate}</p>
                    </div>
                    
                </div>
                <div id="exp-desc">
                    {exp.description.map((bullet) => (
                    <p className="exp-desc-item">
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

export default Experience;