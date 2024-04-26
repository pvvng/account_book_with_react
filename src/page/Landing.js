import '../css/app.css'
import 'animate.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';

export function Landing(){
    return(
        <div className='landing-page'>
            <div className='landing-page-item animate__animated animate__jackInTheBox'>
                <FontAwesomeIcon style={{fontSize:'120px', marginRight:'10px'}} icon={faPiggyBank} />
                <h2>불편한 가계부</h2>
            </div>
        </div>
    )
}