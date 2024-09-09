import './About.css';
import data from '../data.json'

function About() {
  return (
    <div className="About">
      <div id='about me'>
        <h3>/about</h3>
        <h4>about me</h4>
        {data.profile.aboutme.map((about) => (
          <p>- {about}</p>
        ))}
      </div>
      <br></br>
      <div id='skills'>
        <h4>programming languages</h4>
        <p>{data.profile.languages}</p>
        <br></br>
        <h4>frameworks/libraries</h4>
        <p>{data.profile['frameworks/libraries']}</p>
        <br></br>
        <h4>other</h4>
        <p>{data.profile['other']}</p>
        <br></br>
        <h4>certifications</h4>
        <p>{data.profile.certifications}</p>
      </div>
    </div>
  );
}

export default About;