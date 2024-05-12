import './Contact.css';
import data from '../data.json'
import github from '../images/github.png'; 
import linkedin from '../images/linkedin.png';
import email from '../images/email.svg';



function Contact() {
  return (
    <div className="Contact">
      <div id='contact_info'>
        <h3>/contact</h3>
        <div id='contact_links'>
            <div className='icon_link'>
                <img src={email} className="link-icon" alt='email_icon'/>
                <a href={`mailto:${data.contact.email}`}>email</a>
            </div>
            <div className='icon_link'>
                <img src={linkedin} className="link-icon" alt='linkedin_icon'/>
                <a href={data.contact.linkedin}>linkedin</a>            
            </div>
            <div className='icon_link'>
                <img src={github} className="link-icon" alt='github_icon'/>
                <a href={data.contact.github}>github</a>
            </div>
        </div>
      </div>
      
    </div>
  );
}

export default Contact;