import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import InfoBar from '../infoBar';
import Input from '../Input';
import Messages from '../Messages';
import TextContainer from '../TextContainer';

import './chat.css';

let socket;

const Chat = ({location}) => {
    const [ name, setName ] = useState('');
    const [ room, setRoom ] = useState('');
    const [users, setUsers] = useState('');
    const [ message, setMessage ] = useState('');
    const [ messages, setMessages ] = useState([]);
    const ENDPOINT = 'localhost:5000';

    //As similar to ComponentDidMount or ComponentWillMount
    useEffect( () => {
        //const data = queryString.parse(location.search)
        const { name, room } = queryString.parse(location.search)
        //console.log('Location', location.search); // ?name=F&room=2
        //console.log('Data', data); // {name: "F", room: "2"}

        socket = io(ENDPOINT);

        setRoom(room);
        setName(name);
        

        //console.log('socket', socket);
        socket.emit('join', { name, room }, error => {
            if (error) { alert(error) }
        });


        return () => {
            socket.emit('disconnect');
            socket.off();
        }

        //Effct will only activate if the values in the list change.
    }, [ENDPOINT, location.search ]);

    useEffect(()=> {
        socket.on('message', message =>  {
            setMessages([...messages, message])
        });

        socket.on('roomData', ({ users }) => {
            setUsers(users);
        });
    

    }, [messages]);

    const sendMessage = (evt) => {
        evt.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, ()=> setMessage(''));
        };
    };

    return(
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={ messages } name={name} />
                <Input 
                    message={ message }
                    setMessage={ setMessage }
                    sendMessage={ sendMessage }
                />
            </div>
            <TextContainer users={users} />
        </div>
    );
};

export default Chat;