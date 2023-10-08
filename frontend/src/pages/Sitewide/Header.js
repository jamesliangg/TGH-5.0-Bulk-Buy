import React from 'react'
// import TechyBlinders from './../Images/Intentful3.png'
// import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

// import {setAuth} from '../../redux/authReducer'

export default function Header() {

    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')

    // const dispatch = useDispatch()
    const navigate = useNavigate();

    const onClickCart = (e) =>{
        // checkout page
        navigate("/checkout")
    }
    
    const onClickProfile = (e) =>{
        navigate("/dashboard")
    }

    const onClickAbout = (e) =>{
        navigate("/dashboard")
    }

    const onClickFeatures = (e) =>{
        navigate("/");
        document.getElementById('feature').scrollIntoView();
    }

    return (
        <div className='flex page'>
            <div className = "nav left">
                {/* <img className = "tenpercent" src={TechyBlinders} alt="Intentful" onClick={onClickImg}></img> */}
                {/* <div className = "link" href="#feature"  onClick={onClickFeatures} role="button">Features</div>
                <div className="link" onClick={onClickAbout} role="button">About the Team</div> */}
            </div>
            <div className = "nav">
                {/* <div className = "butto newbtn" onClick={onClickLogin}>Log in</div> */}
                {/* <div className = "butto newbtni" onClick={onClickLogin}>Register</div> */}
            </div>
        </div>
    )
}