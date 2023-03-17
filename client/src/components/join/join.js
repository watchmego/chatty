import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './join.css';

export const Join = () => {

    console.log('testing');
    const [ form, setForm ] = useState({test:'test'});


    const formChange = (val, id) => {
        setForm(() => ({...form, [id]: val}));
    };
    return(
        <div className="joinMain">
            <div className="joinInnerContainer">
                <h1 className="heading">Join/Create Meeting</h1>
                <div>
                    <input 
                        className="joinInput mt-20" 
                        placeholder="Room id" 
                        type="text" 
                        onChange={(val) => formChange(val, 'roomId')}
                        required/>
                    {/*add a button to generate an ID... <button onClick></button> */}
                </div>
                <div>
                    <input 
                        className="joinInput mt-20"
                        placeholder="Name" 
                        type="text" 
                        onChange={(val) => formChange(val, 'roomId')}
                        required/>
                </div>

                <Link to={'/chat'}>
                    <button className={'button mt-20'} type="submit">Join</button>
                </Link>
            </div>
        </div>
    )
}
