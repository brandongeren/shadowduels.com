import React from 'react';

import onlineIcon from '../icons/onlineIcon.png';
import closeIcon from '../icons/closeIcon.png';

import './InfoBar.css';

// the <a> element causes a full page refresh when it redirects
// this is a poor practice and should be avoided
// additionally, our chats should be components of a page rather than pages themselves
const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <h3>{room}</h3>
    </div>
  </div>
);

export default InfoBar;