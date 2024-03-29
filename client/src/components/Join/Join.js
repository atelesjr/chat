import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './join.css';

const Join = () => {
    const [ name, setName ] = useState('');
    const [ room, setRoom ] = useState('');

    return(
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join </h1>
                <div>
                    <input 
                        placeholder="Name" 
                        className="joinInput" 
                        type="text" 
                        onChange={ (evt) => setName(evt.target.value) }
                    />
                </div>
                <div>
                    <input 
                        placeholder="Room" 
                        className="joinInput mt-20" 
                        type="text" 
                        onChange={ (evt) => setRoom(evt.target.value) } 
                    />
                </div>
                <Link 
                    to={`/chat?name=${name}&room=${room}`}
                    onClick={evt => ( !name || !room ) ? evt.preventDefault() : null }
                
                >
                    <button className="button mt-20" type="Submit">Sign In</button>
                </Link>
            </div>
        </div>
    );
};

export default Join;