import './Footer.css';
import data from '../data.json'
import github from '../images/github.png'; 
import linkedin from '../images/linkedin.png';
import email from '../images/email.svg';

function Footer() {
    return (
        <div className='Footer'>
            <div className='icon_link'>
                <a href={`mailto:${data.contact.email}`}><img src={email} className="link-icon" alt='email_icon'/></a>
            </div>
            <div className='icon_link'>
                <a href={data.contact.linkedin}><img src={linkedin} className="link-icon" alt='linkedin_icon'/></a>            
            </div>
            <div className='icon_link'>
                <a href={data.contact.github}><img src={github} className="link-icon" alt='github_icon'/></a>
            </div>
        </div>
    );
}

export default Footer;