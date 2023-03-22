import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './join.css';

export const Join = () => {

    const navigate = useNavigate();
    const [ name, setName ] = useState("");

    const handleSubmit = async (e) => {
        //add authentication middleware here
        e.preventDefault();
        localStorage.setItem('name', name);
        
        navigate(`/chat`);
    }

    
    
    return(
        <div className="joinMain">
            <form className="joinInnerContainer" onSubmit={handleSubmit}>
                <h1 className="heading">Join/Create Meeting</h1>
                <div>
                    <input 
                        className="joinInput mt-20"
                        placeholder="Name" 
                        type="text" 
                        onChange={(e) => setName(e.target.value)}
                        required/>
                </div>
                <button className={'button mt-20'} type="submit">Join</button>
            </form>
        </div>
    )
}
