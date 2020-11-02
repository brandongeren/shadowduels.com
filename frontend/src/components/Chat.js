import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';

import InfoBar from './InfoBar';
import Input from './Input';
import Messages from './Messages';

let socket;

const ENDPOINT = 'localhost:5000';

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // location.search gives us the part of the url from the ? onwards
    // queryString.parse turns that into an object 
    const {name, room} = queryString.parse(window.location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', {name, room}, (error) => {
      // obviously we want better error handling than this
      if (error) {
        alert(error);
      }
    });

    // this is what happens when we unmount
    // this disconnects the socket
    return () => {
      socket.emit('disconnect');

      socket.off();
    }
  }, [ENDPOINT, window.location.search]); // this array specifies when useEffect will be called (if one of these variables updates)
  
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    // stop the page from refreshing when we press the button or press enter
    event.preventDefault();

    if (message) {
      // the callback here ensures that we clear the message so that we can easily type a new one
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
    </div>
  )
}

export default Chat;