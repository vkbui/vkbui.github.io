import './Education.css';
import data from '../data.json'


function Education() {
  return (
    <div className="Education">
      <h3>/education</h3>
      <div>
        {data.education.map((edu) => (
            <div className="item">
                <div id="edu-header">
                    <h4 id="edu-institution">{edu.institution}</h4>
                    <div className='pos-and-date'>
                        <p id="position">{edu.degree}</p>
                        <p id="date">{edu.startdate} - {edu.enddate}</p>
                    </div>
                </div>
                {edu['relevant courses'] && <p id="edu-releventcourses">Relevant Courses - {edu['relevant courses']}</p>}
                {edu['activities/societies'] && <p id="edu-activities/societies">Activities/Societies - {edu['activities/societies']}</p>}
            </div>
        ))}
      </div>
    </div>
  );
}

export default Education;