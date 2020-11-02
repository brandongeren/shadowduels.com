import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css';

const Join = () => {
  // define variables, setters, and initial values for the hooks
  // e.g. variable: name, setter: setName, initial value: useState
  const [name, setName] = useState('');

  // room could be a duel, or a chatroom available on the site
  // for example, we could have rooms for discussing various yugioh formats...
  /// ... , a room for discussing development of this project so that we can help new devs, etc
  const [room, setRoom] = useState(''); 

  // we use event.target.value to grab the value that the user types into the input field
  // then we use the setter to update the value for the corresponding variable

  // this prototype version passes the name and room in the url
  // we use Link to grab the values of room and name and insert them into the url
  // in the future, we should probably keep these variables in a state, using Redux or something similar
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)}/>
        </div>
        <Link onClick={event => (!name || !room ? event.preventDefault() : null)} to={`/chat?name=${name}&room=${room}`}>
          <button className="button mt-20" type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  )
}

export default Join;